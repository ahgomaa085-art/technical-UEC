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
        const { title, description, startDate, endDate, location, imageUrl, published } = await req.json();

        if (!title || !description || !startDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const event = await prisma.event.create({
            data: {
                title,
                description,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                location,
                imageUrl,
                published: !!published,
                slug: slugify(title) + '-' + Date.now().toString().slice(-4),
            },
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error('API_EVENTS_POST_ERROR', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { startDate: 'asc' },
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
