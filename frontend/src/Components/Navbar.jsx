import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
        <nav className="navbar p-3">
            <h3 className='heading'>TaskTraker.</h3>
            <div className="nav-right">
                <button onClick={() => navigate('/signin')} className='btn btn-success m-2'>Sign in</button>
                <button onClick={() => navigate('/login')} className='btn btn-outline-success'>Login</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
