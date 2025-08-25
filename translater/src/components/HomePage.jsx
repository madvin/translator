import { useState, useEffect, useRef } from "react";

export default function HomePage(props) {
  const { setFile, setAudioStream } = props;

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);
  const mimeType = "audio/webm";

  async function startRecording() {
    console.log("Start recording");

    let tempStream;
    try {
      tempStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } catch (err) {
      console.error("Error accessing microphone:", err.message);
      return;
    }

    setRecordingStatus("recording");

    const media = new MediaRecorder(tempStream, { mimeType });
    mediaRecorder.current = media;

    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        localAudioChunks.push(event.data);
      }
    };

    mediaRecorder.current.start();
    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");
    console.log("Stop recording");

    if (!mediaRecorder.current) return;

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }
    const interval = setInterval(() => {
      setDuration((prevDuration) => prevDuration + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [recordingStatus]);

  return (
    <main className="flex-1 flex items-center flex-col text-center sm:gap-4 md:gap-5 justify-center pb-20 w-72 sm:w-96 max-w-full mx-auto">
      <h1 className="font-semibold text-5xl sm:text-6xl  md:text-7xl">
        Free<span className="text-blue-400 bold font-semibold">Translate</span>
      </h1>
      <h3 className="font-medium  md:text-lg">
        Record <span className="text-blue-400">&rarr;</span> Transcribe{" "}
        <span className="text-blue-400">&rarr;</span> Translate
      </h3>

      <button
        onClick={
          recordingStatus === "recording" ? stopRecording : startRecording
        }
        className="flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4"
      >
        <p className="text-blue-500">
          {recordingStatus === "inactive" ? "Record" : "Stop Recording"}
        </p>
        <div className="flex items-center gap-2">
          {duration > 0 && (
            <p className="text-sm">
              {Math.floor(duration / 60)}:
              {(duration % 60).toString().padStart(2, "0")}
            </p>
          )}
          <i
            className={
              "fa-solid fa-microphone " +
              (recordingStatus === "recording" ? "text-rose-300" : "")
            }
          ></i>
        </div>
      </button>

      <p>
        Or{" "}
        <label className="text-blue cursor-pointer hover:text-blue-600 duration-200">
          upload{" "}
          <input
            onChange={(e) => {
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
            className="hidden"
            type="file"
          />
        </label>{" "}
        an mp3 file
      </p>
      <p className="italic text-slate-400">
        Something that will be free forever
      </p>
    </main>
  );
}
