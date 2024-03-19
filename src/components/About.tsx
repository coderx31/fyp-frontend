import React from 'react'
import './About.css'

const About = () => {
  return (
    <>
    <div className='about'>
      <div className='content'>
        <h3>About Speech Emotion Recognition</h3>
        <p>Welcome to our Speech Emotion Recognition (SER) application! Our platform leverages cutting-edge 
          technology to analyze speech signals and identify the underlying emotions expressed by the speaker. 
          Through advanced algorithms and machine learning techniques, we aim to provide users with insights 
          into the emotional content of spoken language.</p>
      </div>
      <div className='content'>
        <h3>How It Works</h3>
        <p>
        Our SER application utilizes state-of-the-art signal processing and machine learning algorithms to 
        extract features from audio recordings and classify them into different emotional categories. 
        The process involves several key steps:
        </p>
        <ul>
          <li>Audio Input: Users can upload audio recordings or capture live audio using their device's 
            microphone.
          </li>
          <li>
          Feature Extraction: The application extracts various acoustic features from the input audio, 
          such as pitch, intensity, and spectral characteristics.
          </li>
          <li>
          Machine Learning: These extracted features are then fed into a machine learning model trained 
          on a diverse dataset of annotated emotional speech samples.
          </li>
          <li>
          Emotion Classification: The model analyzes the extracted features and predicts the emotional 
          state conveyed in the speech, assigning labels such as happiness, sadness, anger, etc.
          </li>
          <li>
          Visualization and Analysis: Users can visualize the results of the emotion recognition process 
          through intuitive graphs and charts, providing insights into the emotional content of the speech.
          </li>
        </ul>
      </div>
      </div>
    </>
  )
}

export default About
