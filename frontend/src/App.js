import "./App.css"
//import ResponsiveAppBar from './components/ResponsiveAppBar.js';
import background from "./img/alumni.jpg"
import { maxWidth } from "@mui/system"
import Carousel from "./components/carousel"
import Testimonials from "./components/Testimonials"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Connect from "./components/connect"
import Navbar from "./components/Navbar/index.js"
import Home from "./components/Home.js"
import Profile from "./components/Profile/Profile"
import Register from "./components/Register/Register"
import NewNavbar from "./components/NewNavbar"

function App() {
  return (
    <div className="App">
      <Router>
        <NewNavbar></NewNavbar>
        <Routes>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/connect"} element={<Connect />}></Route>
          <Route path={"/profile"} element={<Profile />}></Route>
          <Route path={"/register"} element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
