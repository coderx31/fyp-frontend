
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "sonner";
import { MdCloudUpload, MdDelete, MdCheckCircleOutline } from 'react-icons/md'
import './FileUploader.css'

interface Uploader {
    onFileUploaded: (file:File) => void
}

interface Emotion {
    emotion: {
        _id: {
            $oid: string;
        };
        category: string;
        description: string;
    };
    identified_emotion: string;
    success: boolean;
}

const FileUploader = ({onFileUploaded} : Uploader) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [emotion, setEmotion] = useState<Emotion>()

    const toggleBlur = () => {
        let blur = document.getElementById('blur');
        blur?.classList.toggle('active');
    
        let popup = document.getElementById('popup');
        popup?.classList.toggle('active');
      }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setSelectedFile(acceptedFiles[0]);
        onFileUploaded(acceptedFiles[0])
    }, [onFileUploaded])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, 
        maxSize: 5 * 1024 * 1024, 
        accept: {
            'audio/wav': ['.wav'],
            'audio/mpeg': ['.mp3']
        }, 
    });

    useEffect(() => {
        // Do nothing
    }, [emotion])

    const handleFileUpload = async (file:File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/audio/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                // need to handle success scenarios and display the response to user
                toast.success("File Uploaded Successfully", { duration: 2000 })
                
                setEmotion(response.data)

                let blur = document.getElementById('blur');
                blur?.classList.toggle('active');

                let popup = document.getElementById('popup');
                popup?.classList.toggle('active');
            } else {
                toast.warning("Invalid File", { duration: 2000 })
            }
        } catch (err) {
            toast.error("File Uploading Failed, Please Try Again Later", { duration: 2000 })
        }
    }

    return (
        <div className="uploader" id="blur">
            <div className="file-upload">
                <form className="file" {...getRootProps()}>
                        <input {...getInputProps} hidden/>
                        {selectedFile ? (
                            <MdCheckCircleOutline color="#1475cf" size={60}/>
                        ): 
                        <>
                            <MdCloudUpload color="#1475cf" size={60} />
                            <p>Drag 'n' drop a file here, or click to select a file</p>
                        </>
                        }
                </form>
                <div className="upload">
                    {/* <AiFillFileImage color="#1475cf" /> */}
                    {selectedFile && (
                        <button className="upload-btn" onClick={() => handleFileUpload(selectedFile)}>Upload File</button>
                    )}
                    <span className="upload-content">
                        {selectedFile?.name}
                        <MdDelete onClick={() => setSelectedFile(null)} />
                    </span>
                </div>
                {/* {selectedFile && (
                    <button className="upload-btn" onClick={() => handleFileUpload(selectedFile)}>Upload File</button>
                )} */}
        </div>
        <div id='popup'>
      <h2>{emotion?.identified_emotion}</h2>
      <p>{emotion?.emotion.description}</p>
      <a href="#" onClick={toggleBlur}>Close</a>

    </div>
        </div>
    )
};

export default FileUploader