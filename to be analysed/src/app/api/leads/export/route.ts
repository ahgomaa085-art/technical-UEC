import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
    // Check authentication
    const session = await auth();
    if (!session || !['ADMIN', 'MARKETING'].includes((session.user as any).role)) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // Fetch all leads
        const leads = await (prisma as any).leadCapture.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Define CSV headers
        const headers = [
            'ID',
            'Date',
            'Time',
            'Status',
            'Full Name',
            'Email',
            'Phone',
            'Faculty',
            'IP Address',
            'City',
            'Country'
        ];

        // Format data rows
        const rows = leads.map((lead: any) => {
            const date = new Date(lead.createdAt);
            return [
                lead.id,
                date.toLocaleDateString('en-GB'),
                date.toLocaleTimeString('en-GB'),
                lead.status,
                `"${(lead.name || 'Anonymous').replace(/"/g, '""')}"`,
                lead.email || '',
                `"${lead.phone || ''}"`,
                lead.faculty || '',
                lead.ip,
                `"${(lead.city || '').replace(/"/g, '""')}"`,
                lead.country || ''
            ].join(',');
        });

        // Combine into full CSV
        const csvContent = [headers.join(','), ...rows].join('\n');

        // Return as a downloadable file
        return new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="uec_leads_${new Date().toISOString().split('T')[0]}.csv"`,
            },
        });

    } catch (error) {
        console.error('EXPORT_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
