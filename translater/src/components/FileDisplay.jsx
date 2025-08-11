export default function FileDisplay(props) {
  const { handleAudioReset, file, audioStream } = props;
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center flex-col text-center sm:gap-4 md:gap-5 justify-center pb-20">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-blue-400 bold font-semibold">File</span>
      </h1>
    </main>
  );
}
