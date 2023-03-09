import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ConnectPage from "./components/ConnectPage/ConnectPage"
import Home from "./components/Home/Home.js"
import Profile from "./components/Profile/Profile"
import Register from "./components/Register/Register"
import NewNavbar from "./components/NewNavbar/NewNavbar"
import Login from "./components/Login/Login"
import Logout from "./components/Logout/Logout"
import ProtectedRoute from "./utils/ProtectedRoute"
import UserPosts from "./components/Posts/UserPosts/UserPosts"
import CreateGeneralPost from "./components/Posts/CreatePost/CreatePost"
import EditGeneralPost from "./components/Posts/EditPost/EditPost"
import GeneralPost from "./components/Posts/GeneralPost/GeneralPost"
import { ThemeProvider, createTheme } from "@mui/material"
import theme from "./utils/themes"

const th = createTheme(theme)

function App() {
  return (
    <Router>
      <NewNavbar></NewNavbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/home"
          exact
          element={
            <ProtectedRoute>
              <ThemeProvider theme={th}>
                <UserPosts />
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/connect"
          exact
          element={
            <ProtectedRoute>
              <ThemeProvider theme={th}>
                <ConnectPage />
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ThemeProvider theme={th}>
                <Profile />
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/user/:user_id"
          element={
            <ProtectedRoute>
              <ThemeProvider theme={th}>
                <Profile />
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create/generalpost"
          element={
            <ProtectedRoute>
              <ThemeProvider theme={th}>
                <CreateGeneralPost />
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/generalpost"
          element={
            <ProtectedRoute>
              <ThemeProvider theme={th}>
                <EditGeneralPost />
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/generalpost/:post_id"
          element={
            <ProtectedRoute>
              <ThemeProvider theme={th}>
                <GeneralPost />
              </ThemeProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ThemeProvider theme={th}>
              <Register />
            </ThemeProvider>
          }
        />
        <Route
          path="/login"
          element={
            <ThemeProvider theme={th}>
              <Login />
            </ThemeProvider>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
