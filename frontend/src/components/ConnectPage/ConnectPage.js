import { React, useState } from "react"
import {
  Grid,
  TextField,
  Container,
  Card,
  Typography,
  Button,
} from "@mui/material"
import { useGetOthersQuery } from "../../api/connectionsSlice"
import CircularProgressIndicator from "../CircularProgressIndicator/CircularProgressIndicator"
import s from "./ConnectPage.module.css"
import { Link } from "react-router-dom"

function ConnectPage() {
  const [inputText, setInputText] = useState("")
  const inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }

  const { data, error, isLoading } = useGetOthersQuery()

  return isLoading ? (
    <CircularProgressIndicator />
  ) : error ? (
    <p>Error occured: {JSON.stringify(error)}</p>
  ) : (
    <Container
      maxWidth="xl"
      sx={{
        width: "100%",
        marginTop: "2rem",
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      component="div"
    >
      <h1>Alumni Connect</h1>
      <div className={s.search}>
        <TextField
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
          name="connect_search"
          sx={{ backgroundColor: "white" }}
        />
      </div>
      <Grid
        className={s.peoples_list}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <UsersList data={data.data} input={inputText} />
      </Grid>
    </Container>
  )
}

function UsersList({ data, input }) {
  const filteredData = data.filter((el) => {
    if (input === "") return el

    const full_name = `${el.first_name} ${el.last_name}`

    return (
      full_name.toLowerCase().includes(input) ||
      el.GeneralUser.batch.toString().includes(input)
    )
  })

  return (
    <>
      {filteredData.map((item) => (
        <Grid item key={parseInt(item.usr_id)}>
          <ConnectCard
            user_id={item.usr_id}
            batch={item.GeneralUser.batch}
            name={`${item.first_name} ${item.last_name}`}
            photo={item.user_image}
          />
        </Grid>
      ))}
    </>
  )
}

function ConnectCard({ user_id, batch, name, photo }) {
  const pic = photo ?? "logo512.png"

  return (
    <Card className={s.main_card}>
      <Link to={`/profile/user/${user_id}`}>
        <div>
          <img src={pic} className={s.card_image} alt="Profile"></img>
        </div>
      </Link>

      <div className={s.card_body}>
        <Typography className={s.text}>{name}</Typography>
        <Typography className={s.text}>{batch}</Typography>
        <Button variant="outlined" fullWidth className={s.card_button}>
          Connect
        </Button>
      </div>
    </Card>
  )
}

export default ConnectPage
