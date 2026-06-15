import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { auth } from '@/auth';
import prisma from '@/lib/db';

export async function POST(req: Request) {
    const session = await auth();

    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'video', folder: 'uec_videos' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        }) as any;

        // Save to database
        const video = await prisma.video.create({
            data: {
                title: title || file.name,
                cloudinaryUrl: result.secure_url,
                cloudinaryPublicId: result.public_id,
                thumbnailUrl: result.secure_url.replace(/\.[^/.]+$/, ".jpg"), // Cloudinary auto-generates thumb for videos
                category: (category as any) || 'PROMO',
                published: true,
            },
        });

        return NextResponse.json(video);
    } catch (error) {
        console.error('CLOUDINARY_UPLOAD_ERROR', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
