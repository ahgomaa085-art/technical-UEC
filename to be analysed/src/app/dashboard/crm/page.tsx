import React from 'react';
import prisma from '@/lib/db';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import CRMView from './CRMView';

export const dynamic = 'force-dynamic';

export default async function CRMPage() {
    const session = await auth();

    if (!session) {
        redirect('/auth/login');
    }

    const user = session.user as any;
    if (user?.role !== 'ADMIN') {
        redirect('/auth/login');
    }

    // Fetch leads with their interactions
    let leads: any[] = [];
    try {
        leads = await (prisma as any).leadCapture.findMany({
            include: {
                interactions: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 200, // Fetch more for richer insights
        });
    } catch (e) {
        console.error("CRM Data Fetch Failed", e);
    }

    return (
        <CRMView initialLeads={leads} />
    );
}
