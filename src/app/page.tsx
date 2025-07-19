'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [resumefile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumefile){
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    try{
    const formData = new FormData();
    formData.append('file', resumefile);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.extractedText) {
      setError(data.error || 'Upload failed. Please try again');
      return;
    }
    localStorage.setItem('parsedResumeText', data.extractedText);
    router.push('/results');
    }
    catch(err){
      console.log(err);
      setError('Something went wrong. Try again later.');
    }
    finally{
      setLoading(false);
    }

    // if (data.extractedText) {
    //   localStorage.setItem('parsedResumeText', data.extractedText);
    //   router.push('/results');
    // }
  };

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Upload Resume for AI Analysis</h1>
      <form onSubmit={handleUpload} className="mt-8 flex flex-col items-center">
        <input
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          type="file"
          accept=".pdf"
          className="mb-4"
        />
        <button 
        type="submit" 
        disabled = {loading} 
        className={`py-2 px-4 rounded ${loading ? 'bg-gray-300' : 'bg-yellow-300'} text-black`} >
          {loading ? 'Uploading...' : 'Upload Resume'}

        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <p className="mt-4 text-gray-900">Instructions: Upload your latest PDF resume for analysis.</p>
    </main>
  );
}
