'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home(){
  const router = useRouter()
  const [file, setfile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!file) return;

    const formData = new FormData();
    formData.append('file',file);

    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    router.push('/results')
  };

  return(
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Upload Resume for AI Analysis</h1>
      <form onSubmit={handleUpload}  className="mt-8 flex flex-col items-center">
        <input 
        onChange={(e) => setfile(e.target.files?.[0] || null)} type="file" accept=".pdf" className="mb-4"/>
        <button type="submit" className="bg-yellow-300 text-black py-2 px-4 rounded">
          Upload Resume</button>
      </form>
      <p className="mt-4 font-bg-gray-900">Instructions: Upload your latest PDF resume for analysis.</p>
    </main>
  )
}