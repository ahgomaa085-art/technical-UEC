import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session || !['ADMIN', 'RECRUITER'].includes((session.user as any).role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');
        const status = searchParams.get('status');
        const department = searchParams.get('department');

        const where: any = {};
        if (type && type !== 'ALL') where.type = type;
        if (status && status !== 'ALL') where.status = status;
        if (department && department !== 'ALL') where.department = department;

        const applications = await (prisma as any).careerApplication.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error('HR_API_GET_ERROR', error);
        return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
    }
}
