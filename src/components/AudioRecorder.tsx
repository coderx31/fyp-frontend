import axios from "axios";
import React, {useRef, useState} from "react";
import { toast } from "sonner";
import BACKEND_HOST from '../api/api'

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = () => {
    
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                toast.success("starting audio recording ...", { duration: 2000 })
                const mediaRecorder = new MediaRecorder(stream);
                
                mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
                mediaRecorderRef.current = mediaRecorder;
                streamRef.current = stream;
                mediaRecorder.start();
                setIsRecording(true);
            })
            .catch(err => {
                toast.error("Error while recording audio", { duration: 2000 });
            })
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            toast.success("audio recording ended", { duration: 2000 })
            setIsRecording(false);
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                track.stop();
            });
        }
    };

    const handleDataAvailable = (event: BlobEvent) => {
        setRecordedAudioBlob(event.data);
    };

    const handleUpload = async () => {
        if (recordedAudioBlob) {
            try {
                const blobToBase64 = await convertToBase64(recordedAudioBlob);
                const response = await axios.post(`${BACKEND_HOST}/api/v1/audio/record`, {
                    audio: blobToBase64,
                    headers: {
                        'Content-Type': 'application/json'
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

    const convertToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((reslove, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64Str = reader.result as string;
                reslove(base64Str)
            };
            reader.onerror = () => {
                reject(new Error("unable to convert blob to base64"))
            }
        })
    }


    return (
        <div>
            {isRecording ? (
                <button onClick={stopRecording}>Stop Recording</button>
            ): (
                <button onClick={startRecording}>Start Recording</button>
            )}
            {recordedAudioBlob && (
                <div>
                    <audio controls>
                        <source  src={URL.createObjectURL(recordedAudioBlob)} />
                        Your browser doesn't support the audio element
                    </audio>
                    <button onClick={handleUpload}>Upload Audio</button>
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;