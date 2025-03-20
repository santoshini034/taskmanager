import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

const View = () => {
  const params = useParams()
  const {id} = params;
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const location = useLocation();
  const userid = location.state.userid;

  const handleerror = (message) => {toast.error(message),{
      position: 'top-right',
      autoClose: 3000,
      style: {
        color: '#000',
        padding: '10px',
        borderRadius: '5px',
      }
    }}

  useEffect(() => {
    axios.post(`http://localhost:8080/view/${id}`).then((res) => {
      if(res.data.success){
        setTask(res.data.taskdetails);
      }else{
        handleerror("Something went wrong");
        navigate('/login');
      }
    })
  })

  const handledelete = () => {
    axios.post(`http://localhost:8080/${userid}/deletetask/${id}`).then((res) => {
      console.log(res);
      if(res.data.success){
        handleerror(res.data.message);
        setTimeout(() => {
          navigate('/task')
        }, 3000);
      }
    })
  }

  return (
    <div>
      <div className="row formbg">
        <ToastContainer/>
        <div className="col-10 offset-1 mt-5 getinpage ">
          <h2 className='m-2 heading'>Details</h2>
          <hr />
          <p><b>Heading: </b>{task.heading}</p>
          <p><b>Date: </b>{task.date}</p>
          <p><b>Time: </b>{task.time}</p>
          <p><b>Details: </b>{task.details}</p>
          <p><b>Assets: </b><a href={`http://localhost:8080/${task.file}`}>click here </a>to get asset</p>
          <button className= ' btn btn-danger' onClick={handledelete}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default View
