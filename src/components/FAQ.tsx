import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './FAQ.css'
import { toast } from 'sonner'
import BACKEND_HOST from '../api/api'

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

  const toggle = (i: number) => {
    if (selectedIndex == i) {
      return setSelectedIndex(-1)
    }
    setSelectedIndex(i)
  }


  useEffect(() => {
    const fetchFaqs = async () => {
      axios.get(`${BACKEND_HOST}/api/v1/faqs`)
      .then(response => {
        setFaqs(response.data.data);
      })
      .catch(err => {
        toast.error("Failed to load FAQs");
      })
    }

    // TODO: error is not loading, it is always giving success toast message
    toast.promise(fetchFaqs, {
      loading: 'Loading ...',
      success: () => `FAQs Loaded Successfully`,
      error: 'Failed to load FAQs'
    })
    
  }, [])

  return (
    <div className='accordion'>
      {faqs.map((faq, i) => {
        return (
        <div key={faq.uuid} className={selectedIndex === i ? 'contentBx active' : 'contentBx'}>
          <div className='label' onClick={() => toggle(i)}>{faq.question}</div>
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
