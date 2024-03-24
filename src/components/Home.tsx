import React, { useEffect, useState } from 'react'
import FileUploader from './FileUploader'
import AudioPlayer from './AudioPlayer'
import './Home.css'

const Home = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [audioPlayerState, setAudioPlayerState] = useState<number>(0);

  const handleFileUpload = (file:File) => {
    setUploadedFile(file);
    setAudioPlayerState((prevState) => prevState + 1);
  };

  useEffect(() => {
    // Do nothing 
  }, [uploadedFile])

  return (
    <div className='layout'>
      <FileUploader onFileUploaded={handleFileUpload} />
      <AudioPlayer key={audioPlayerState} audioFile={uploadedFile}/>
    </div>
  )
}

export default Home
