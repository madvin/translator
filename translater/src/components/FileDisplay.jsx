export default function FileDisplay(props) {
  const { handleAudioReset, file, audioStream } = props;
  return (
    <main className="flex flex-1 p-4 flex-col items-center justify-center gap-3 text-center sm:gap-4 md:gap-5 pb-20 min-h-screen">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-blue-400 bold font-semibold">File</span>
      </h1>

      <div className="flex items-center gap-2">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file.name : 'Custom audio'}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => audioStream(null)}
          className="specialBtn px-4 py-2 text-white rounded-xl bg-blue-500 hover:bg-red-600 transition-colors"
        >
         <p>Stop</p>
        </button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleAudioReset}
          className="specialBtn px-4 py-2 text-white rounded-xl bg-blue-500 hover:bg-red-600 transition-colors"
        >
          <p>Reset</p>
        </button>
        <p className="italic text-slate-400">Ready to transcribe and translate</p>
      </div>
    </main>
  );
}

