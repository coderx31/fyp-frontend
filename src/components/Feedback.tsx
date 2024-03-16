import React, { useState } from 'react'
import './Feedback.css'

const Feedback = () => {
  const [formData, setFormData] = useState({
    name : '',
    email: '',
    message: ''
  });

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://127.0.0.1:5000/api/v1/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='feedback'>
      <div className='container'>
      <div className='formBx'>
        <form onSubmit={handleSubmit}>
          <h2>Feedback</h2>
          <div className='inputBox'>
            <input type="text" name='name' value={formData.name} onChange={handleChange} required/>
            <span>Full Name</span>
          </div>
          <div className='inputBox'>
            <input type="email" name='email' value={formData.email} onChange={handleChange} required/>
            <span>Email Address</span>
          </div>
          <div className='inputBox'>
            <textarea required name='message' value={formData.message}></textarea>
            <span>Type Your Message Here...</span>
          </div>
          <div className='inputBox'>
            <input type="submit" value='Send'/>
          </div>
        </form>
      </div>
      <div className='imgBx'></div>
    </div>
    </div>
  )
}

export default Feedback
