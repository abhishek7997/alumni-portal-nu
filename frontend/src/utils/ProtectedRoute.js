import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import CircularProgressIndicator from "../components/CircularProgressIndicator/CircularProgressIndicator"
import { useGetCurrentUserDetailsQuery } from "../api/connectionsSlice"

const ProtectedRoute = ({ children }) => {
  const { data, error, isLoading } = useGetCurrentUserDetailsQuery()

  return (
    <>
      {isLoading ? (
        <CircularProgressIndicator />
      ) : data === undefined || data === null ? (
        <Navigate to="/login" replace />
      ) : (
        children
      )}
    </>
  )
}

export default ProtectedRoute
