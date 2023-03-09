import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Box,
  TextField,
  Container,
  Typography,
  Paper,
} from "@mui/material"
import s from "./CreatePost.module.css"
import { useCreatePostMutation } from "../../../api/connectionsSlice"
import { useNavigate } from "react-router-dom"

const CreateGeneralPost = () => {
  const [content, setContent] = useState("")
  const [createPost, { loading, error }] = useCreatePostMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createPost({ content: content })
    console.log(JSON.stringify(error))
    if (!error) {
      navigate("/home")
    }
  }

  return (
    <div>
      <Container>
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
            Create post
          </Typography>
        </Paper>
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.textfield}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Enter text"
              multiline
              rows={20}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <Button type="submit" variant="contained" className={s.button}>
            Create post
          </Button>
        </form>
        {error ? (
          <div>
            {error.status} {JSON.stringify(error.data)}
          </div>
        ) : null}
      </Container>
    </div>
  )
}

export default CreateGeneralPost
