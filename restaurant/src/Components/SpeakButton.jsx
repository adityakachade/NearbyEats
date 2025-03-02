import React, { useState, useEffect } from "react";
import "../Styles/speakbutton.css";
import { MicVocal } from "lucide-react";

const SpeakButton = () => {
  const [dialogBox, setDialogBox] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    let recognition;

    if (listening) {
      recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);

        // Send the transcript to the backend for processing
        fetch(`/process-command?query=${encodeURIComponent(transcript)}`)
          .then((response) => response.json())
          .then((data) => console.log("Assistant Response:", data));
      };

      recognition.onerror = (event) => {
        console.error("Error occurred in recognition:", event.error);
      };

      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [listening]);

  const toggleListening = () => {
    setListening((prev) => !prev);
  };

  return (
    <div id="speakerCtn">
      {dialogBox && (
        <dialog open className="dialog">
          <button onClick={() => setDialogBox(!dialogBox)} autoFocus>
            Close
          </button>
          <p>You said: {transcript}</p>
          <button onClick={toggleListening}>
            {listening ? "Stop Listening" : "Start Listening"}
          </button>
        </dialog>
      )}

      <button onClick={() => setDialogBox(!dialogBox)} id="micv">
        <MicVocal />
      </button>
    </div>
  );
};

export default SpeakButton;
