import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './FAQ.css'

interface FAQ {
  _id: {
    $oid: string;
  };
  answer: string;
  question: string;
  uuid: string;
}

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleExanpandables = () => {
    
  }


  useEffect(() => {
    
    const addEventListernersToContentBx = () => {
      const accordions = document.getElementsByClassName("contentBx")
      
     
      for (let i = 0; i<accordions.length; i++) {
        accordions[i].addEventListener("click", () => {
          accordions[i].classList.toggle("active")
        })
      }
      
    }


    const fetchFaqs = () => {
      axios.get('http://127.0.0.1:5000/api/v1/faqs')
      .then(response => {
        console.log(response.data.data)
        if (JSON.stringify(response.data.data) !== JSON.stringify(faqs)) {
          setFaqs(response.data.data)
        }
      })
      .catch(err => {
        console.error('error fetching data', err)
      })
    }

    fetchFaqs()
    console.log(faqs);
    addEventListernersToContentBx()
    
  }, [])

  return (
    <div className='accordion'>
      {faqs.map((faq) => {
        return (
        <div key={faq.uuid}className='contentBx'>
          <div className='label'>{faq.question}</div>
          <div className='content'>
            <p>{faq.answer}</p>
          </div>
      </div>
        )
      })}
    </div>
  )
}

export default FAQ
