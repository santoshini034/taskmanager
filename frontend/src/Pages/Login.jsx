import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState ("");
    const [password, setPassword] = useState ("");
    const navigate = useNavigate()
  
    const handleerror = (message) => {toast.error(message),{
      position: 'top-right',
      autoClose: 3000,
      style: {
        color: '#000',
        padding: '10px',
        borderRadius: '5px',
      }
    }}
    const handlesuccess = (message) => {toast.success(message),{
      position: 'top-right',
      autoClose: 3000,
      style: {
        color: '#000',
        padding: '10px',
        borderRadius: '5px',
      }
    }}
  
    const handlesubmit = (e) => {
      e.preventDefault();
      if(username ==  "" || password == "" ){
        handleerror("Enter valid credentials");
      }
      axios.post("http://localhost:8080/loginuser", {username, password}).then((res) => {
        if (res.data.success) {
          handlesuccess(res.data.message);
          const token = res.data.token;
          localStorage.setItem("auth", token);
          setTimeout(() => {
            navigate("/task")
          }, 3000);
        }else{
          handleerror(res.data.message);
        }
      })
    }
  
  return (
    <div className="row formbg">
      <ToastContainer/>
      <div className="col-6 offset-3 mt-2 getinpage ">
        <h2>Log in</h2>
        <hr />
        <form onSubmit={handlesubmit} className='m-3'>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="username" class="form-control" id="username" autoComplete='off' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        <div class="mb-3">
          <label for="Password" class="form-label">Password</label>
          <input type="password" class="form-control" id="Password" autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button class="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
