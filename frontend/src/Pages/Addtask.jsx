import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'

const Addtask = () => {
  const token = localStorage.getItem("auth");
    const [heading, setHeading] = useState ("");
    const [date, setDate] = useState ("");
    const [time, setTime] = useState ("");
    const [details, setDetails] = useState ("");
    const [file, setFile] = useState (null);
    const navigate = useNavigate()
    const location = useLocation()
    const username = location.state.username

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
          borderRadius: '5px'
        }
      }}

      const handlesubmit = (e) => {
          e.preventDefault();
          if(heading == "" || date ==  "" || time == "" || details == ""){
            handleerror("Enter valid credentials");
          }
          if(!file){
            handleerror("Enter valid credentials");
          }
          const formdata = new FormData();
          formdata.append('heading', heading)
          formdata.append('date', date)
          formdata.append('time', time)
          formdata.append('file', file)
          formdata.append('details', details)
          formdata.append('username', username)
          axios.post("http://localhost:8080/addtask", formdata).then((res) => {
            if (res.data.success) {
              handlesuccess(res.data.message);
              setTimeout(() => {
                navigate("/task")
              }, 3000);
            }else{
              handleerror(res.data.message);
              if(res.data.message == "Enter unique values"){
                handleerror(res.data.message)
                setHeading("")
                setDate("")
                setTime("")
                setDetails("")
              }else{
                setTimeout(() => {
                  navigate("/login")
                }, 3000);
              }
            }
          })
        }

  return (
    <div>
      <div className="row formbg">
            <ToastContainer/>
            <div className="col-6 offset-3 mt-2 getinpage ">
              <h2>Add Task</h2>
              <hr />
              <form onSubmit={handlesubmit} className='m-3'>
                <div class="mb-3">
                  <label for="heading" class="form-label">Heading</label>
                  <input type="text" class="form-control" id="heading" autoComplete='off' value={heading} onChange={(e) => setHeading(e.target.value)} />
                </div>
                <div className="row">
                  <div className="col-5">
                    <div class="mb-3">
                      <label for="date" class="form-label">Date</label>
                      <input type="date" class="form-control" id="date" autoComplete='off' value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                  </div>
                  <div className="col-5">
                    <div class="mb-3">
                      <label for="time" class="form-label">Time</label>
                      <input type="time" class="form-control" id="time" autoComplete='off' value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                  </div>
                </div>
              <div class="mb-3"> 
                <label for="formFile" class="form-label">Assets</label>
                <input class="form-control" type="file" id="formFile" onChange={(e) => {setFile(e.target.files[0])}}/>
              </div>
              <div class="mb-3">
                <label for="details" class="form-label">Details</label>
                <textarea class="form-control" id="details" rows="3" autoComplete='off' value={details} onChange={(e) => {setDetails(e.target.value)}}></textarea>
              </div>
              <button class="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
    </div>
  )
}

export default Addtask
