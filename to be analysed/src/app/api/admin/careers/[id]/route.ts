import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session || !['ADMIN', 'RECRUITER'].includes((session.user as any).role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { id } = await params;
        const { status } = await req.json();

        const application = await (prisma as any).careerApplication.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(application);
    } catch (error) {
        console.error('HR_API_PATCH_ERROR', error);
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session || !['ADMIN', 'RECRUITER'].includes((session.user as any).role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { id } = await params;

        await (prisma as any).careerApplication.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('HR_API_DELETE_ERROR', error);
        return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
    }
}
