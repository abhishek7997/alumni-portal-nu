import React from "react"
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
} from "@mui/material"

export default function Profile() {
  const dispatch = useDispatch()
  const { loading, error, profileInfo } = useSelector((state) => state.profile)

  return loading ? (
    <CircularProgressIndicator />
  ) : profileInfo ? (
    <section
      style={{ backgroundColor: "rgb(230, 213, 210)", minHeight: "85vh" }}
    >
      <Container className="py-5">
        <div className={s.row}>
          <div className={s.col}>
            <Card className="mb-4">
              <CardContent className="text-center">
                <CardMedia
                  image={
                    profileInfo.user_image ??
                    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  }
                  alt="avatar"
                  className={s.rounded_circle}
                  style={{ width: "150px" }}
                  component="img"
                />
                <p>{profileInfo.user_job}</p>
                <p className="text-muted-company mb-4">
                  {profileInfo.user_company}
                </p>

                <div>
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
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#f0401f",
                      color: "#f0401f",
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
                    More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={s.col}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <Container className={s.container}>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Full Name</Typography>
                    </div>
                    <div>
                      <Typography
                        noWrap
                      >{`${profileInfo.first_name} ${profileInfo.last_name}`}</Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Batch</Typography>
                    </div>
                    <div>
                      <Typography noWrap>{profileInfo.batch}</Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Email</Typography>
                    </div>
                    <div>
                      <Typography noWrap>
                        {profileInfo.email_address}
                      </Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Mobile</Typography>
                    </div>
                    <div>
                      <Typography noWrap>
                        {profileInfo.mobile_number}
                      </Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Job Profile</Typography>
                    </div>
                    <div>
                      <Typography noWrap>{profileInfo.user_job}</Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Company</Typography>
                    </div>
                    <div>
                      <Typography noWrap>{profileInfo.user_company}</Typography>
                    </div>
                  </div>
                  <div className={s.list_item}>
                    <div>
                      <Typography noWrap>Location</Typography>
                    </div>
                    <div>
                      <Typography noWrap>
                        {profileInfo.user_location}
                      </Typography>
                    </div>
                  </div>
                </Container>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  ) : (
    <p>ProfileInfo not loaded, please log in</p>
  )
}
