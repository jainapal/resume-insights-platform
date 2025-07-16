
export default function Home(){
  return(
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Upload Resume for AI Analysis</h1>
      <form className="mt-8 flex flex-col items-center">
        <input type="file" accept=".pdf" className="mb-4"/>
        <button type="submit" className="bg-yellow-300 text-black py-2 px-4 rounded">
          Upload Resume</button>
      </form>
      <p className="mt-4 font-bg-gray-900">Instructions: Upload your latest PDF resume for analysis.</p>
    </main>
  )
}