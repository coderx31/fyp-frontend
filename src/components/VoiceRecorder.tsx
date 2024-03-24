import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder-2';
import axios from 'axios';
import { toast } from 'sonner';

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string>('');
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);

  const accessAudio = (url: string, blob : Blob) => {
    setBlobUrl(url)
    setRecordedAudioBlob(blob);
  }

  const handleUpload = async () => {
    if (recordedAudioBlob) {
        try {
            const formData = new FormData();
            formData.append('file', recordedAudioBlob, 'recording.wav')
        
            const response = await axios.post('http://127.0.0.1:5000/api/v1/audio/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                toast.success("Audio File Uploaded Successfully", { duration: 2000 });
            } else {
                toast.success("Invalid File Type", { duration: 2000 });
            }
        } catch (err) {
            toast.error('Audio Upload Failed', { duration: 2000 });
        }
    }
}

  return (
   <ReactMediaRecorder 
        audio
        onStop={accessAudio}
        render={({ status, startRecording, stopRecording, mediaBlobUrl}) => (
            <div>
                <p>{status}</p>
                <button onClick={() => {
                    startRecording();
                    toast.success("Audio Recording Started ...", { duration: 2000 });
                }}>Start Recording</button>
                <button onClick={() => {
                    stopRecording();
                    toast.success("Audio Recording Stopped ...", { duration: 2000 })
                }}>Stop Recording</button>
                <button onClick={handleUpload}>UploadRecording</button>
                <audio src={mediaBlobUrl} controls>
                       
                </audio>
            </div>
        )}
   />
  );
};

export default VoiceRecorder;
