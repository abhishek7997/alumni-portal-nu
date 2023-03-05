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

function App() {
  return (
    <div>
      <Router>
        <NewNavbar></NewNavbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/home"
            exact
            element={
              <ProtectedRoute>
                <UserPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connect"
            exact
            element={
              <ProtectedRoute>
                <ConnectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/generalpost"
            element={
              <ProtectedRoute>
                <CreateGeneralPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/generalpost"
            element={
              <ProtectedRoute>
                <EditGeneralPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/generalpost/:post_id"
            element={
              <ProtectedRoute>
                <GeneralPost />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
    </div>
  )
}

export default App
