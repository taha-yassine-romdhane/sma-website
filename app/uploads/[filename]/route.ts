import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // Security: prevent directory traversal
    if (filename.includes('..') || filename.includes('/')) {
      return new NextResponse('Invalid filename', { status: 400 });
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadsDir, filename);

    // Read the file
    const fileBuffer = await readFile(filepath);

    // Determine content type
    const ext = filename.split('.').pop()?.toLowerCase();
    const contentTypeMap: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
    };

    const contentType = contentTypeMap[ext || ''] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving uploaded file:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}
