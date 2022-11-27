import React from "react"
import "./styles2.css"
import Profile1 from "../img/r1.jpeg"
import Profile2 from "../img/r2.jpeg"
import Profile3 from "../img/r3.jpeg"
import { Photo } from "@mui/icons-material"

function Card1(props) {
  var pic = ""
  if (props.photo === "../img/r1.jpeg") {
    pic = Profile1
  } else if (props.photo === "../img/r2.jpeg") {
    pic = Profile2
  } else {
    pic = Profile3
  }
  return (
    <div className="MainCard">
      <div>
        <img src={pic} className="CardImage"></img>
      </div>

      <div className="Yo">
        <p className="Text">{props.name}</p>
        <p className="Text">{props.batch}</p>
        <button type="button" className="Card-Button">
          Connect
        </button>
      </div>
    </div>
  )
}

export default Card1
