import React, { useState } from "react"
import s from "./Profile.module.css"
import { useSelector, useDispatch } from "react-redux"
import CircularProgressIndicator from "../CircularProgressIndicator/CircularProgressIndicator"
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Paper,
} from "@mui/material"
import {
  useGetCurrentUserDetailsQuery,
  useGetPostsByUserIdQuery,
  useGetUserByUserIdQuery,
} from "../../api/connectionsSlice"
import { useParams } from "react-router-dom"
import { UserPost } from "../Posts/UserPosts/UserPosts"

export default function Profile() {
  const { user_id } = useParams()
  const [state, setState] = useState(1)

  const { data, isLoading, error } = useGetUserByUserIdQuery(
    parseInt(user_id, 10)
  )

  const {
    data: userData,
    userLoading,
    userError,
  } = useGetCurrentUserDetailsQuery()

  return isLoading || userLoading ? (
    <CircularProgressIndicator />
  ) : data && userData ? (
    <section
      style={{
        backgroundColor: "rgb(230, 213, 210)",
        minHeight: "85vh",
        padding: "1rem",
      }}
    >
      <Container sx={{ paddingTop: "1rem" }}>
        <div className={s.row}>
          <div className={s.col}>
            <Card sx={{ height: "100%" }}>
              <CardContent
                className="text-center"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: "100%",
                }}
              >
                <CardMedia
                  image={
                    data.data.user_image ??
                    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  }
                  alt="avatar"
                  className={s.rounded_circle}
                  style={{
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    border: "2px solid#CCCCCC",
                  }}
                  component="img"
                />
                <Typography className={s.bio_text}>
                  {data.data.user_bio}
                </Typography>

                <div>
                  {parseInt(userData.data.usr_id, 10) ===
                  parseInt(user_id, 10) ? (
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#f0401f",
                        borderColor: "#f0401f",
                        color: "white",
                        padding: "12px 25px",
                        margin: "4px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "15px",
                        borderRadius: "4px",
                        marginLeft: "1rem",
                      }}
                    >
                      Edit Profile
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={s.col}>
            <Card className={s.details_card}>
              <CardContent sx={{ height: "100%" }}>
                <Container className={s.container} sx={{ display: "flex" }}>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Full Name</Typography>
                    </div>
                    <div>
                      <Typography
                        noWrap
                      >{`${data.data.first_name} ${data.data.last_name}`}</Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Batch</Typography>
                    </div>
                    <div>
                      <Typography noWrap>{data.data.batch}</Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Email</Typography>
                    </div>
                    <div>
                      <Typography noWrap>{data.data.email_address}</Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Mobile</Typography>
                    </div>
                    <div>
                      <Typography noWrap>{data.data.mobile_number}</Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Job Profile</Typography>
                    </div>
                    <div>
                      <Typography noWrap>{data.data.user_job}</Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Company</Typography>
                    </div>
                    <div>
                      <Typography noWrap>{data.data.user_company}</Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Location</Typography>
                    </div>
                    <div>
                      <Typography noWrap>{data.data.user_location}</Typography>
                    </div>
                  </div>
                </Container>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
      <Container>
        <Card className="py-3 px-3">
          <Button
            variant="contained"
            className={s.button}
            onClick={() => setState(1)}
          >
            View Posts
          </Button>
          {/* {parseInt(userData.data.usr_id, 10) === parseInt(user_id, 10) ? (
            <Button
              variant="contained"
              className={`${s.button} ${s.connection_button}`}
              onClick={() => setState(2)}
            >
              Connections
            </Button>
          ) : null} */}
        </Card>
        {state === 1 ? <GeneralPosts user_id={user_id} /> : null}
      </Container>
    </section>
  ) : (
    <p>{`${error} OR ${userError}: Try logging in again`}</p>
  )
}

const GeneralPosts = ({ user_id }) => {
  const { data, isLoading, error } = useGetPostsByUserIdQuery(user_id)
  return isLoading ? (
    <CircularProgressIndicator />
  ) : (
    <>
      {data.data.map((post) => (
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <UserPost data={post} />
        </Paper>
      ))}
    </>
  )
}
