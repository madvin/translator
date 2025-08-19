import { useState, useEffect, useRef } from "react";
export default function HomePage(props) {

  const { setFile, setAudioStream } = props;

  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mimeType = 'audio/webm';

  async function startRecording() {
    let tempStream

    console.log('Start recording');

    try {
      const streamData = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      tempStream = streamData;
    } catch {
      console.log(err.message);
      return      
    }
    setRecordingStatus('recording');
    
    const media = MediaRecorder(tempStream, { type: mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavaliable = (event) => {
      if (typeof event.data === 'undefined') { 
        return
      }
      if (event.data.size === 0) {
        return
      }
        localAudioChunks.push(event.data)
      }
      setAudioChunks(localAudioChunks);
    }
  
    async function stopRecording() {
      setRecordingStatus('inactive');
      console.log('Stop recording');

      mediaRecorder.current.stop()
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        setAudioStream(audioBlob);
        setFile(null);
        setAudioChunks([]);
      }
    }

    useEffect(() => {
      if (recordingStatus === 'inactive') {
        return;
      }
      const interval = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000);
      return () => clearInterval(interval);
    });
    
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center flex-col text-center sm:gap-4 md:gap-5 justify-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Free<span className="text-blue-400 bold font-semibold">Translate</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span>Transcribe <span className="text-blue-400">&rarr;</span>Translate
      </h3>
      <button className="flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4">
        <p className="text-blue-500">Record</p>
        <i className="fa-solid fa-microphone"></i>
      </button>
      <p>Or <label className="text-blue cursor-pointer hover:text-blue-600 duration-200">upload <input onChange={(e) => {
        const tempFile = e.target.files[0];
        setFile(tempFile);
      }
      } className="hidden" type="file" /></label> a mp3 file</p>
      <p className="italic text-slate-400">Something that will be free forever</p>
    </main>
  );
}
