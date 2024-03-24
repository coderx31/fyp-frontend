import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    <header>
        <a href="#" className='logo'>Hullooo</a>
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        </ul>
    </header>
  )
}

export default Navigation
