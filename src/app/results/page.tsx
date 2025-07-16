export default function Results(){
    return(
        <main className="flex flex-col items-center justify center h-screen">
            <h1 className="text-2xl font-bold">AI Analysis Result</h1>
            <div className="mt-8">
                <p>Job Recommended: Frontend Developer </p>
                <p>Skill Gaps: Typescript, testing </p>
                <p>Suggested Skills: Docker</p>
            </div>
            <button className="mt-4 bg-gray-300 px-4 py-2 rounded">Try Another</button>
        </main>
    )
}