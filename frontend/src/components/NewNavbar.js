import React from "react"
import "./styles.css"
import { Link } from "react-router-dom"
import NIIT from "../img/download.png"
export default function NewNavbar() {
  return (
    <nav className="nav">
      <img src={NIIT} className="logo"></img>
      <Link to="/" className="site-title">
        NIIT UNIVERSITY
      </Link>
      <ul>
        <li>
          <Link to="/connect">Connect</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  )
}
