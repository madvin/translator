export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
      <h2 className="font-small text-1xl sm:text-2xl md:text-3xl">
        Free<span className="text-blue-400 bold">Translater</span>
      </h2>
      <button className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
      </button>
    </header>
  );
}
