import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/auth';
import { slugify } from '@/lib/utils';

export async function POST(req: Request) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { title, content, published, excerpt, imageUrl } = await req.json();

        if (!title || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const post = await prisma.newsPost.create({
            data: {
                title,
                content,
                published: !!published,
                excerpt,
                imageUrl,
                slug: slugify(title) + '-' + Date.now().toString().slice(-4),
                authorId: session.user.id!,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('API_NEWS_POST_ERROR', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const news = await prisma.newsPost.findMany({
            orderBy: { createdAt: 'desc' },
            include: { author: { select: { name: true } } },
        });
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
