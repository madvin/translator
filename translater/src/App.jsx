import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";

function App() {
    const [file, setFile] = useState(null);
    const [audioStream, setAudioStream] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [output, setOutput] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAudioAvailable = file || audioStream;

    function handleAudioReset() {
        setFile(null);
        setAudioStream(null);
    }

    const worker = useRef(null);

    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('./utils/worker.js', import.meta.url),
                { type: 'module' });
        } 
        const onMessageReceived = async (e) => {
            switch (e.data.type) {
                case 'DOWNLOADING':
                    setDownloading(true);
                    console.log('Downloading model...');                    
                    break;
                    
            }
              switch (e.data.type) {
                case 'LOADING':
                    setLoading(true);
                    console.log('Loading model...');
                    break;
            }
              switch (e.data.type) {
                case 'RESULT':
                    setOutput(true);
                    console.log('Setting output...');
                    break;
            }
              switch (e.data.type) {
                case 'INFERENCE_DONE':
                    setFinished(true);
                    console.log('Inference done...');
                    break;
            }
        }
        worker.current.addEventListener('message', onMessageReceived);

        return () => worker.current.removeEventListener('message', onMessageReceived);

    }, []); 

    async function readAudioFrom(file) {
        const sampling_rate = 16000;
        const audioCTX = new AudioContext({ sampleRate: sampling_rate });
        const response = await file.arrayBuffer();
        const decoded = await audioCTX.decodeAudioData(response);
        const audio = decoded.getChannelData(0);
        return audio;
    }

    return (
        <div className="flex  flex-col p-4 max-w-[1000px] mx-auto w-full">
            <section className="min-h-screen flex flex-col">
                <Header />
                {output ? (
                    <Information />
                ) : loading ? (
                    <Transcribing />
                ) : isAudioAvailable ? (
                    <FileDisplay handleAudioReset=
                        {handleAudioReset} file={file} audioStream=
                        {setAudioStream} />
                ) : (
                    <HomePage setFile={setFile} setAudioStream=
                        {setAudioStream} />
                )}
            </section>
            <footer></footer>
        </div>
    );
}

export default App;
