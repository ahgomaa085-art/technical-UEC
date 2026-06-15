import { headers } from 'next/headers';
import prisma from '@/lib/db';

export async function logVisitor(path: string) {
    try {
        const headerList = await headers();

        // Extract geolocation and IP from Vercel headers
        const ip = headerList.get('x-forwarded-for')?.split(',')[0] || 'Unknown';
        const country = headerList.get('x-vercel-ip-country') || 'Unknown';
        const city = headerList.get('x-vercel-ip-city') || 'Unknown';
        const region = headerList.get('x-vercel-ip-country-region') || 'Unknown';
        const ua = headerList.get('user-agent') || 'Unknown';

        // Filter out bot/system paths if needed
        if (path.startsWith('/api') || path.startsWith('/_next') || path.includes('.')) {
            return;
        }

        // Save to database
        await prisma.visitorLog.create({
            data: {
                ip,
                country,
                city,
                region,
                path,
                ua,
            },
        });

        // Maintenance: Keep only latest 1000 logs to prevent DB bloat
        // We do this asynchronously or periodically in a real app, 
        // but for this scale, we can do a quick check.
        const count = await prisma.visitorLog.count();
        if (count > 1100) {
            const oldest = await prisma.visitorLog.findFirst({
                orderBy: { createdAt: 'asc' },
            });
            if (oldest) {
                await prisma.visitorLog.delete({
                    where: { id: oldest.id },
                });
            }
        }
    } catch (error) {
        // Silent fail to ensure main site never crashes due to analytics
        console.error('ANALYTICS_LOG_ERROR', error);
    }
}
