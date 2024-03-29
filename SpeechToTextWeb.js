import React, { useState, useRef } from 'react';


const pulsatingCircleStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: '#1e90ff',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
    marginLeft: 25,
  };
  
  const pulseAnimation = `
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.5);
        opacity: 0.5;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `;
  
  const style = document.createElement('style');
  style.innerHTML = pulseAnimation;
  document.head.appendChild(style);

  

export default function SpeechToTextWeb( {onTranscriptChange}) {
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);


  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in your browser');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      setTranscript(text);

      if (typeof onTranscriptChange === 'function') {
        onTranscriptChange(text);
      }
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition:', event.error);
    };

    recognition.onend = () => {
        setIsListening(false);
      };

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();

    return transcript;

  };


  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const clear = () => {
    setTranscript('');
    if (typeof onTranscriptChange === 'function') {
      onTranscriptChange('');
    }
  };


return (
    <div>
      <button style={{marginLeft:20,}} onClick={startListening}>Start Listening</button>
      <button onClick={stopListening}>Stop Listening</button>
      <button onClick={clear}>Clear</button>
      {isListening && <div style={pulsatingCircleStyle}></div>}
      {/* <p>Transcript: {transcript}</p> */}
    </div>
  );
}
