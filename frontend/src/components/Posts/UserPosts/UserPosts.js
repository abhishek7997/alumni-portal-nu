import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchPosts,
  deleteGeneralPost,
} from "../../../features/userPosts/userPostsActions"
import { Box, Paper, Container, Typography } from "@mui/material"
import s from "./UserPosts.module.css"
import CircularProgressIndicator from "../../CircularProgressIndicator/CircularProgressIndicator"
import { IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import LaunchIcon from "@mui/icons-material/Launch"
import { Link, useNavigate } from "react-router-dom"
import { useGetCurrentUserDetailsQuery } from "../../../api/connectionsSlice"

const UserPosts = () => {
  let { loading, userPosts, error, success } = useSelector(
    (state) => state.userPosts
  )

  const { data, isLoading, error: currError } = useGetCurrentUserDetailsQuery()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <Container maxWidth="lg">
      {loading || isLoading ? (
        <CircularProgressIndicator />
      ) : error ? (
        <p>Error occured: {`${error} OR ${currError}`}</p>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              margin: "1.2rem auto",
              paddingTop: "1.2rem",
              paddingBottom: "1.2rem",
            }}
          >
            <Typography component="div" className={s.title_text} variant="h3">
              User posts
            </Typography>
          </Paper>
          {userPosts &&
            userPosts.map((item) => {
              return (
                <Paper
                  key={parseInt(item.post_id)}
                  elevation={3}
                  sx={{
                    width: "100%",
                    marginTop: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <UserPost
                    usr_id={parseInt(data.data.usr_id)}
                    data={item}
                  ></UserPost>
                </Paper>
              )
            })}
        </Box>
      )}
      <CreatePostButton />
    </Container>
  )
}

export const UserPost = ({ usr_id, data }) => {
  /*
    {
        "full_name": "M Abhishek",
        "post_id": "2",
        "gp_user_id": "3",
        "content": "General post created by M.Abhishek",
        "media": null,
        "created_at": "2022-11-28T19:47:52.187Z"
    }
    */
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const clickDelete = (post_id) => {
    const pid = parseInt(post_id, 10)
    dispatch(deleteGeneralPost(pid))
  }

  const clickEdit = (post_id, content) => {
    const pid = parseInt(post_id, 10)
    navigate("/edit/generalpost", { state: { post_id: pid, content: content } })
  }

  const created_at = new Date(data.created_at).toDateString()
  return (
    <div className={s.post_container}>
      <div className={s.post_name}>
        <div className={s.user_container}>
          <Link to={`/profile/user/${data.gp_user_id}`} className={s.link}>
            <img src={data.user_image} className={s.user_image} />
          </Link>
          <Link to={`/profile/user/${data.gp_user_id}`} className={s.link}>
            <Typography variant="h5" className={s.user_name}>
              {`${data.first_name} ${data.last_name}`}
            </Typography>
          </Link>
        </div>
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
              <Typography variant="body2">Created at : {created_at}</Typography>
            </div>
          </div>
          <div className={s.right}>
            {usr_id === parseInt(data.gp_user_id, 10) ? (
              <IconButton
                className={s.button}
                aria-label="menu"
                onClick={() => clickEdit(data.post_id, data.content)}
              >
                <EditIcon className={s.left_icon} />
              </IconButton>
            ) : null}
            {usr_id === parseInt(data.gp_user_id, 10) ? (
              <IconButton
                className={s.button}
                aria-label="menu"
                onClick={() => clickDelete(data.post_id)}
              >
                <DeleteIcon className={s.left_icon} />
              </IconButton>
            ) : null}
            <Link reloadDocument to={`/post/generalpost/${data.post_id}`}>
              <IconButton className={s.button} aria-label="menu">
                <LaunchIcon className={s.left_icon} />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const CreatePostButton = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/create/generalpost")
  }

  return (
    <div className={s.create_post_button}>
      <IconButton size="large" onClick={handleClick} variant="contained">
        <AddIcon />
      </IconButton>
    </div>
  )
}

export default UserPosts
