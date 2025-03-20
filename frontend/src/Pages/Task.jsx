import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Task = () => {
  const token = localStorage.getItem("auth");
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
  const [userid, setUserid] = useState();
  const [username, setUsername] =useState("");

  useEffect(() => {
    axios.post("http://localhost:8080/entertask", {token}).then((res) => {
      if(res.data.success){
        setUsername(res.data.getuser.username)
        setUserid(res.data.getuser._id)
        setTask(res.data.taskli)
      }else{
        navigate("/signin");
      }
    })
  })

  const handleview = (id) => {
    navigate(`/view/${id}`, {state: {userid: userid}});
  }

  const handledelete = (id) => {
    axios.post(`http://localhost:8080/${userid}/deletetask/${id}`)
  }
  
  return (
    <div>
      <h3 className='m-3'>Hii {username}</h3>
      <button className='btn btn-success ms-3' onClick={() => {navigate("/addtaskform",{state:{username: username}}) }}>Add task</button>
      <hr />
      <div className='row' >
        <div className='col-10 offset-1'>
        <table class="table table-success">
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">View</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              task.map((ta) => {
                return(
                  <tr>
                    <td>{ta.heading}</td>
                    <td>{ta.date}</td>
                    <td>{ta.time}</td>
                    <td><button onClick={() => handleview(ta._id)} className=' btn btn-success'>View</button></td>
                    <td><button onClick={() => handledelete(ta._id)} className=' btn btn-danger'>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default Task
