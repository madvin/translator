export default function FileDisplay(props) {
  const { handleAudioReset, file, audioStream } = props;
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center flex-col text-center sm:gap-4 md:gap-5 justify-center pb-20">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-blue-400 bold font-semibold">File</span>
      </h1>
      <div className="flex items-center gap-2">
        <h3 className="flex items-center gap-2 font-semibold">Name</h3>
        <p>{file.name}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => audioStream(null)}
          className="specialBtn px-4 py-2 rounded-xl bg-blue-400 text-white hover:bg-red-600 transition-colors"></button>
        </div>
      <button
        onClick={handleAudioReset}
        className="specialBtn px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors">
        Reset
      </button>
      <p className="italic text-slate-400">Ready to transcribe and translate</p>
    </main>
  );
}
