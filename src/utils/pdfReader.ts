import fs from 'fs';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

export async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
    const data = await pdfParse(fileBuffer);
    return data.text;
}
