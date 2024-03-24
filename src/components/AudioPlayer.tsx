
import React from "react";
import './AudioPlayer.css'

interface FileProp {
    audioFile: File | null
}

const AudioPlayer = ({audioFile}: FileProp) => {
    return (
        <div className="audio-player">
            <div className="player">
                <div className="imgBx">
                    <img src="/images/emotion-logo.jpg" alt="" />
                </div>
                <audio controls>
                    <source src={audioFile ? URL.createObjectURL(audioFile) : '' } type={audioFile?.type}/>
                </audio>
            </div>
        </div>
    )
}

export default AudioPlayer;