import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        // In Phase 11, we would also trigger a Resend email notification here

        return NextResponse.json({ success: true, id: contactMessage.id });
    } catch (error) {
        console.error('API_CONTACT_POST_ERROR', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
