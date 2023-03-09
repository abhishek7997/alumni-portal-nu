import React, { useEffect, useLayoutEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearState } from "../../features/profile/profileSlice"
import { logoutUser } from "../../features/user/userActions"

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )

  useLayoutEffect(() => {
    dispatch(clearState())
    dispatch(logoutUser())
    if (success) {
      navigate("/")
    }
  }, [loading, userInfo, error])
  return <div>Logout</div>
}

export default Logout
