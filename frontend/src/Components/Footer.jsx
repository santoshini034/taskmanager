import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="row pt-3">
        <div className="col-10 offset-1 footeralign">
        <div className="footer-left">
        <h3 className="heading">TaskTraker.</h3>
        <p>Stay organized and boost your productivity—follow us for the latest updates, tips, and features on our task tracker website!</p>
        <div className="navbar-icons">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-linkedin"></i>
        </div>
      </div>
      <div className="footer-center">
        <h3>company</h3>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>profile</li>
          <li>More</li>
        </ul>
      </div>
      <div className="footer-right">
        <h3>contact us</h3>
        <ul>
          <li>+1-222-3434-333</li>
          <li>contact@tasktraker.com</li>
        </ul>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
