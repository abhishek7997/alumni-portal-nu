import React, { useState, useEffect, useLayoutEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import s from "./NewNavbar.module.css"
import { useGetCurrentUserDetailsQuery } from "../../api/connectionsSlice"

export default function NewNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data = null, error, isLoading } = useGetCurrentUserDetailsQuery()

  useLayoutEffect(() => {
    if (data) setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }, [data, isLoading])

  return (
    <nav className={s.nav}>
      <div className={s.left_container}>
        <img src="/images/download.png" className={s.logo} />
        <Link reloadDocument to="/" className={s.site_title}>
          ALUMNI PORTAL
        </Link>
      </div>
      {!isLoading ? (
        <div className={s.right_container}>
          <ul>
            {isLoggedIn ? (
              <li>
                <Link reloadDocument to="/home">
                  Home
                </Link>
              </li>
            ) : null}
            {isLoggedIn ? (
              <li>
                <Link reloadDocument to="/connect" name="connect_link">
                  Connect
                </Link>
              </li>
            ) : null}
            {isLoggedIn ? (
              <li>
                <Link reloadDocument to={`/profile/user/${data.data.usr_id}`}>
                  Profile
                </Link>
              </li>
            ) : null}
            {!isLoggedIn ? (
              <li>
                <Link reloadDocument to="/register">
                  Register
                </Link>
              </li>
            ) : null}
            {!isLoggedIn ? (
              <li>
                <Link reloadDocument to="/login">
                  Login
                </Link>
              </li>
            ) : null}
            {isLoggedIn ? (
              <li>
                <Link
                  reloadDocument
                  to="/logout"
                  onClick={() => setIsLoggedIn(false)}
                >
                  Logout
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </nav>
  )
}
