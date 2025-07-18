
'use client';

import { useEffect, useState } from 'react';

export default function ResultsPage() {
    const [analysis, setAnalysis] = useState<string>('Loading...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            const resumeText = localStorage.getItem('parsedResumeText');
            if (!resumeText) {
                setError('No resume text found. Please upload a resume first.');
                return;
            }

            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    body: JSON.stringify({ resumeText }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    const err = await response.json();
                    setError(err.error || 'Unknown error');
                    return;
                }

                const data = await response.json();
                setAnalysis(data.analysis);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch analysis.');
            }
        };

        fetchAnalysis();
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">AI Analysis Result</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <pre className="whitespace-pre-wrap">{analysis}</pre>
            )}
        </div>
    );
}
