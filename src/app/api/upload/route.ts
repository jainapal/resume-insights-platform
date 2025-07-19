import { NextResponse } from 'next/server';
import { extractTextFromPDF } from '@/utils/pdfReader';

export async function POST(req: Request) {
   try{
    const formData = await req.formData();
    const file: File | null = formData.get('file') as unknown as File;

    if (!file) return NextResponse.json({ error: 'No file uploaded' },{status:400});

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extractedText = await extractTextFromPDF(buffer);
    return NextResponse.json({ extractedText });
   }
    catch{
        console.error(error);
        return NextResponse.json({ error: 'Failed to extract text' },{ status: 500}); 
    }
}
