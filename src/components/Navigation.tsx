import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    // <nav>
    //     <ul>
    //         <li><Link to="/">Home</Link></li>
    //         <li><Link to="/about">About</Link></li>
    //         <li><Link to="/faq">FAQ</Link></li>
    //     </ul>
    // </nav>
    <header>
        <a href="#" className='logo'>Hullooo</a>
        <ul>
        <li><a href="#"><Link to="/">Home</Link></a></li>
        <li><a href="#"><Link to="/about">About</Link></a></li>
        <li><a href="#"><Link to="/faq">FAQ</Link></a></li>
        <li><a href="#"><Link to="/feedback">Feedback</Link></a></li>
        </ul>
    </header>
  )
}

export default Navigation
