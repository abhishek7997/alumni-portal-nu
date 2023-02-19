import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import s from "./NewNavbar.module.css"

export default function NewNavbar() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )

  const {
    loading: profileLoading,
    profileInfo,
    error: profileError,
    success: profileSuccess,
  } = useSelector((state) => state.profile)

  return (
    <nav className={s.nav}>
      <div className={s.left_container}>
        <img src="images/download.png" className={s.logo} />
        <Link to="/" className={s.site_title}>
          NIIT UNIVERSITY
        </Link>
      </div>
      <div className={s.right_container}>
        <ul>
          {userInfo && (
            <li>
              <Link reloadDocument to="/home">
                Home
              </Link>
            </li>
          )}
          {userInfo && (
            <li>
              <Link reloadDocument to="/connect" name="connect_link">
                Connect
              </Link>
            </li>
          )}
          {profileInfo && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {!userInfo && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          {!userInfo && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {userInfo && (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
