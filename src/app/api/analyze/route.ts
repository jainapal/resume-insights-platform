// 
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        // Check API key first
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY not found in environment variables');
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        // Get resume text from request
        const { resumeText } = await req.json();
        
        // Check if resume text exists
        if (!resumeText || resumeText.trim() === '') {
            console.error('No resume text provided');
            return NextResponse.json({ error: 'No resume text provided' }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
You are a career coach AI. Analyze this resume and answer:
1. Best fitting job roles (max 3)
2. Major skill gaps
3. Suggested skills to focus on
Resume:
${resumeText}
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return NextResponse.json({ analysis: text });
    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json({ 
            error: 'Failed to analyze resume', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
}