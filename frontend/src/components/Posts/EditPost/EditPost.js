import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Box, TextField, Container } from "@mui/material"
import s from "./EditPost.module.css"
import { useCreatePostMutation } from "../../../api/connectionsSlice"
import { useNavigate, useLocation } from "react-router-dom"
import { updateGeneralPost } from "../../../features/userPosts/userPostsActions"

const EditGeneralPost = () => {
  const { state } = useLocation()
  const [content, setContent] = useState(state.content)
  const post_id = state.post_id
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateGeneralPost({ post_id: post_id, content: content }))
    navigate("/home")
  }

  return (
    <div>
      <Container>
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.textfield}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Enter text"
              defaultValue={content}
              multiline
              rows={20}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <Button type="submit" variant="contained" className={s.button}>
            Update post
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default EditGeneralPost
