
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path'
 
export async function POST(req: Request) {
 
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if(!file){
    return NextResponse.json({sucess: false, error: 'No file uploaded'});
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), 'public','uploads',file.name);

  await writeFile(filePath, buffer);
  console.log('Saved file to', filePath);
  
  return NextResponse.json({sucess: true, filename: file.name});
}