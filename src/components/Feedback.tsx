import React, { useState } from 'react'
import './Feedback.css'
import  { toast } from 'sonner'

const Feedback = () => {
  const [formData, setFormData] = useState({
    name : '',
    email: '',
    description: ''
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
      // handle the popup
      let blur = document.getElementById('blur');
      blur?.classList.toggle('active');

      let popup = document.getElementById('popup');
      popup?.classList.toggle('active');
    
      toast.success("Feedback added successfully!", { duration: 2000 })

      setFormData({
        name: '',
        email: '',
        description: ''
      })
    })
    .catch(err => {
      toast.error("Feedback adding failed", { duration: 2000 })
    })
  }

  const toggleBlur = () => {
    let blur = document.getElementById('blur');
    blur?.classList.toggle('active');

    let popup = document.getElementById('popup');
    popup?.classList.toggle('active');
  }
  return (
    <>
      <div className='feedback'>
        <div className='container' id='blur'>
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
              <textarea required name='description' value={formData.description} onChange={handleChange}></textarea>
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
    <div id='popup'>
      <h2>Thank You !</h2>
      <p>Thank you for taking the time to share your feedback with us! Your insights are invaluable in helping us improve our website and enhance your experience. 
        We truly appreciate your input and look forward to implementing any suggestions you've provided. If you have any further thoughts or questions, 
        please don't hesitate to reach out. Thanks again for your contribution!
      </p>
      <a href="#" onClick={toggleBlur}>Close</a>

    </div>
    </>
  )
}

export default Feedback
