import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            id, name, email, phone, faculty, status,
            source, medium, campaign, content, term,
            device, browser, os, ua, referralUrl, entryPath, conversionPath,
            journey
        } = body;
        const headerList = await headers();

        // Extract metadata
        const ip = headerList.get('x-forwarded-for')?.split(',')[0] || 'Unknown';
        const country = headerList.get('x-vercel-ip-country') || 'Unknown';
        const city = headerList.get('x-vercel-ip-city') || 'Unknown';
        const region = headerList.get('x-vercel-ip-city') || 'Unknown'; // Vercel often provides region in city or similar headers

        const leadData = {
            name: name !== undefined ? name : undefined,
            email: email !== undefined ? email : undefined,
            phone: phone !== undefined ? phone : undefined,
            faculty: faculty !== undefined ? faculty : undefined,
            status: status || 'PARTIAL',
            source, medium, campaign, content, term,
            device, browser, os, ua, referralUrl, entryPath, conversionPath,
            ip, country, city, region
        };

        let lead;

        // If ID exists, update the lead
        if (id) {
            lead = await (prisma as any).leadCapture.update({
                where: { id },
                data: leadData,
            });
        } else {
            // Otherwise, create a new lead
            lead = await (prisma as any).leadCapture.create({
                data: {
                    ...leadData,
                    status: status || 'STARTED',
                },
            });
        }

        // Sync journey interactions if provided
        if (journey && Array.isArray(journey) && lead.id) {
            // Delete old interactions for this lead if updating to avoid duplicates or messy history
            // In a real app we might append, but for CRM dashboard simplicity we'll overwrite or just add new ones
            // Actually, let's just add the ones that aren't already there or just clear and re-add for the latest journey
            await (prisma as any).leadInteraction.deleteMany({
                where: { leadId: lead.id }
            });

            await (prisma as any).leadInteraction.createMany({
                data: journey.map((j: any) => ({
                    leadId: lead.id,
                    type: j.type,
                    value: j.value,
                    createdAt: j.timestamp ? new Date(j.timestamp) : new Date(),
                }))
            });
        }

        return NextResponse.json(lead);
    } catch (error) {
        console.error('LEAD_CAPTURE_ERROR', error);
        return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
    }
}
