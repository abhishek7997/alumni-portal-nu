import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteGeneralPost } from "../../../features/userPosts/userPostsActions"
import {
  Box,
  Paper,
  Container,
  Typography,
  TextField,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material"
import s from "./GeneralPost.module.css"
import CircularProgressIndicator from "../../CircularProgressIndicator/CircularProgressIndicator"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddCommentIcon from "@mui/icons-material/AddComment"
import { useNavigate, useParams } from "react-router-dom"
import {
  useGetCurrentUserDetailsQuery,
  useGetPostByPostIdQuery,
} from "../../../api/connectionsSlice"
import {
  addPostComment,
  fetchPostComments,
} from "../../../features/postComments/postCommentsActions"

const GeneralPost = () => {
  const { post_id } = useParams()
  const { data, isLoading, error } = useGetPostByPostIdQuery(post_id)
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetCurrentUserDetailsQuery()

  return (
    <Container maxWidth="lg">
      {isLoading || userLoading ? (
        <CircularProgressIndicator />
      ) : error || userError ? (
        <p>Error occured: {`${error} OR ${userError}`}</p>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Paper
            key={parseInt(post_id)}
            elevation={3}
            sx={{
              width: "100%",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <UserPost
              usr_id={parseInt(userData.data.usr_id)}
              data={data.data}
            ></UserPost>
          </Paper>
        </Box>
      )}
      <PostComments post_id={parseInt(post_id, 10)} />
    </Container>
  )
}

export const UserPost = ({ usr_id, data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [commentBoxVisibility, setCommentBoxVisibility] = useState(false)
  const [comment, setComment] = useState("")

  const handleSubmit = () => {
    if (comment && comment !== "") {
      dispatch(addPostComment({ post_id: data.post_id, content: comment }))
      setCommentBoxVisibility(false)
    }
  }

  const clickDelete = (post_id) => {
    const pid = parseInt(post_id, 10)
    dispatch(deleteGeneralPost(pid))
  }

  const clickEdit = (post_id, content) => {
    const pid = parseInt(post_id, 10)
    navigate("/edit/generalpost", { state: { post_id: pid, content: content } })
  }

  const changeCommentBoxVisibility = () => {
    setCommentBoxVisibility(!commentBoxVisibility)
  }

  const created_at = new Date(data.created_at).toDateString()

  return (
    <>
      <div className={s.post_container}>
        <div className={s.post_name}>
          <div>
            <Typography variant="h5">{`${data.first_name} ${data.last_name}`}</Typography>
          </div>
          {/* <div className={s.user_container}>
            <img src={data.user_image} className={s.user_image} />
            <Typography
              variant="h5"
              className={s.user_name}
            >{`${data.first_name} ${data.last_name}`}</Typography>
          </div> */}
        </div>
        <div>
          <div className={s.post_content}>
            <div>
              <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
                {data.content}
              </Typography>
            </div>
          </div>
          <div className={`${s.post_date} ${s.parent}`}>
            <div className={s.left}>
              <div>
                <Typography variant="body2">
                  Created at : {created_at}
                </Typography>
              </div>
            </div>
            <div className={s.right}>
              {usr_id === parseInt(data.gp_user_id, 10) ? (
                <IconButton
                  className={s.button}
                  aria-label="edit_content"
                  onClick={() => clickEdit(data.post_id, data.content)}
                >
                  <EditIcon className={s.left_icon} />
                </IconButton>
              ) : null}
              {usr_id === parseInt(data.gp_user_id, 10) ? (
                <IconButton
                  className={s.button}
                  aria-label="delete_content"
                  onClick={() => clickDelete(data.post_id)}
                >
                  <DeleteIcon className={s.left_icon} />
                </IconButton>
              ) : null}
              {
                <IconButton>
                  <AddCommentIcon
                    className={s.button}
                    aria-label="add_comment"
                    onClick={changeCommentBoxVisibility}
                  />
                </IconButton>
              }
            </div>
          </div>
        </div>
        {commentBoxVisibility ? (
          <Card className={s.comment_window}>
            <CardContent>
              <TextField
                rows={4}
                multiline
                label="Comment"
                defaultValue={comment}
                onChange={(e) => setComment(e.target.value)}
                className={s.comment_textfield}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                className={s.add_comment_button}
                onClick={handleSubmit}
              >
                Add Comment
              </Button>
            </CardActions>
          </Card>
        ) : null}
      </div>
    </>
  )
}

const PostComments = (post_id) => {
  const dispatch = useDispatch()
  const { loading, error, postComments } = useSelector(
    (state) => state.postComments
  )

  useEffect(() => {
    dispatch(fetchPostComments(post_id))
  }, [dispatch])

  return (
    <>
      {loading ? (
        <CircularProgressIndicator />
      ) : error ? (
        <p>Error occured: {`${error}`}</p>
      ) : (
        <div>
          {postComments.map((comment) => {
            return (
              <Paper
                key={comment.post_comment_id}
                elevation={3}
                sx={{
                  width: "100%",
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <div className={s.post_container}>
                    <div className={s.post_user}>
                      <div>
                        <Typography variant="body2">{`${comment.User.first_name} ${comment.User.last_name}`}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className={s.post_container}>
                    <div className={s.post_name}>
                      <div>{comment.content}</div>
                    </div>
                  </div>
                  <div className={s.post_comment_content}>
                    <div>
                      <Typography variant="body2">
                        {new Date(comment.created_at).toDateString()}
                      </Typography>
                    </div>
                  </div>
                </div>
              </Paper>
            )
          })}
        </div>
      )}
    </>
  )
}

export default GeneralPost
