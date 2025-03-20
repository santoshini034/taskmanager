import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home"
import Signin from "./Pages/Signin"
import Login from "./Pages/Login"
import Task from "./Pages/Task"
import View from "./Pages/View"
import Addtask from './Pages/Addtask'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>}  />
        <Route path="/signin" element = {<Signin/>}  />
        <Route path="/login" element = {<Login/>}  />
        <Route path="/task" element = {<Task/>}  />
        <Route path="/view/:id" element = {<View/>}  />
        <Route path="/addtaskform" element = {<Addtask/>}  />
      </Routes>
    </Router>
  )
}

export default App
