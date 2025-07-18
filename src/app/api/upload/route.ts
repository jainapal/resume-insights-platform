

import { NextResponse } from 'next/server';
import { extractTextFromPDF } from '@/utils/pdfReader';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    
    const formData = await req.formData();
    const file: File | null = formData.get('file') as unknown as File;

    if (!file) return NextResponse.json({ error: 'No file uploaded' },{status:400});

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    if(!fs.existsSync(uploadsDir)){
        fs.mkdirSync(uploadsDir, {recursive: true});
    }

    const filePath = path.join(uploadsDir, file.name);
    fs.writeFileSync(filePath, buffer);

    //read buffer again for parsing
    const savedBuffer = fs.readFileSync(filePath);
    const extractedText = await extractTextFromPDF(savedBuffer);

    return NextResponse.json({ extractedText }); //Must return JSON
}
