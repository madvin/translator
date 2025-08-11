import { useState } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);

  const isAudioAvailable = file || audioStream; 

  return (
    <div className="flex  flex-col p-4 max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
      { isAudioAvailable ? (
        <FileDisplay />
      ) : (
      <HomePage setFile = {setFile} setAudioStream = {setAudioStream} />
      ) }
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
