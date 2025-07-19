
'use client';

import { useEffect, useState } from 'react';

export default function ResultsPage() {
    const [analysis, setAnalysis] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            const parsedResumeText = localStorage.getItem('parsedResumeText');
            if (!parsedResumeText) {
                setError('No resume text found. Please upload a resume first.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    body: JSON.stringify({ resumeText : parsedResumeText }),
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await response.json();

                if (!response.ok || !data.analysis) {
                    setError(data.error || 'Failed to analyse resume');
                }
                else{
                    setAnalysis(data.analysis);
                }
            }
            catch(err){
                console.error(err);
                setError('Something went wrong while analysing your resume.')
                // const data = await response.json();
                // setAnalysis(data.analysis);
            } 
            finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">AI Analysis Result</h1>

            {loading && <p className='text-gray-700'>Analysing your resume, please wait...</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {!loading && !error && (
                <pre className='whitespace-pre-wrap text-gray-900'>{analysis}</pre>
            )}
            {/* {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <pre className="whitespace-pre-wrap">{analysis}</pre>
            )} */}
        </div>
    );
}
