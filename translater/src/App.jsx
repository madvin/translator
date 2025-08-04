import { useState } from "react"

function App() {
  return (
    <div className="flex  flex-col p-4 max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <header>
          <h1 className="">Free<span className="text-blue-500">Translater</span></h1>
          <button className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            <p>New</p>
            <i className="fa-solid fa-plus"></i>
          </button>
          <main>

          </main>
        </header>
      </section>
      <footer></footer>
    </div>
  )
}

export default App
