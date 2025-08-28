export default function Information() {
    return (
        <main className="flex flex-1 p-4 flex-col items-center justify-center gap-3 text-center sm:gap-4 md:gap-5 pb-20 max-w-prose w-full mx-auto">
            <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
                Your <span className="text-blue-400 bold font-semibold">Transcription</span>
            </h1>
            <div className="flex mx-auto bg-white border-2 border-solid border-blue-400 shadow rounded-full overflow-hidden items-center gap-4">
                <button className="px-2 py-1 font-medium gap-2">Transcription</button>
                <button className="px-2 py-1 font-medium gap-2">Translation</button>
            </div>
            
        </main>
    )
}