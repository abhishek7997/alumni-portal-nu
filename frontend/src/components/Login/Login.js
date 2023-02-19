import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { TextField, withStyles } from "@material-ui/core"
import Stack from "@mui/material/Stack"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginUser } from "../../features/user/userActions"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getLoggedInUserDetails } from "../../features/profile/profileActions"
import {
  Paper,
  Container,
  Typography,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material"
import s from "./Login.module.css"

const styles = (theme) => ({
  field: {
    margin: "10px 0",
  },
  countryList: {
    ...theme.typography.body1,
  },
})

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: "100%",
    },
  },
}))

const validationSchema = yup.object().shape({
  email_address: yup
    .string()
    .required("email_address is required")
    .email("email_address is invalid"),
  password: yup.string().required("Password is required"),
})

function Register() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      dispatch(getLoggedInUserDetails())
      navigate("/profile")
    }
  }, [navigate, userInfo, success])

  const classes = useStyles()

  const [passwordState, setPasswordState] = React.useState({
    password: "",
    showPassword: false,
  })

  const handleClickShowPassword = () => {
    setPasswordState({
      ...passwordState,
      showPassword: !passwordState.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const onSubmit = (data) => {
    data.email_address = data.email_address.toLowerCase()
    console.log(JSON.stringify(data, null, 2))
    dispatch(loginUser(data))
  }

  return (
    <Container maxWidth="lg" style={{ height: "90vh" }}>
      <div className={s.center_div}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            margin: "1.2rem auto",
            paddingTop: "1.2rem",
            paddingBottom: "1.2rem",
          }}
        >
          <Typography component="div" variant="h3">
            Login
          </Typography>
          <form
            className={s.survey_form}
            // className={classes.root}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack
              direction="column"
              alignItems="flex-start"
              spacing={2}
              style={{ width: "100%" }}
            >
              <TextField
                label="Email Address"
                variant="outlined"
                {...register("email_address")}
                error={errors.email_address ? true : false}
                className={s.text_field}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email_address?.message}
              </Typography>
              <TextField
                label="Password"
                type={passwordState.showPassword ? "text" : "password"}
                variant="outlined"
                {...register("password")}
                error={errors.password ? true : false}
                className={s.text_field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {passwordState.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => {
                  console.log(errors)
                }}
                name="login_button"
                className={s.login_button}
              >
                Login
              </Button>
              <Typography>{errors?.content}</Typography>
              <Typography>{error && `${error}`}</Typography>
            </Stack>
          </form>
        </Paper>
      </div>
    </Container>
  )
}

export default withStyles(styles)(Register)
