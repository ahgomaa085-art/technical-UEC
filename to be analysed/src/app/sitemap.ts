import { MetadataRoute } from 'next';
import prisma from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://uec.edu.eg'; // Default fallback

    // Fetch all dynamic content with error handling for build-time stability
    let departments: any[] = [];
    let news: any[] = [];

    try {
        const results = await Promise.all([
            prisma.department.findMany({ select: { slug: true, updatedAt: true } }),
            prisma.newsPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
        ]);
        departments = results[0];
        news = results[1];
    } catch (error) {
        console.warn('Sitemap generation: Database unreachable, skipping dynamic routes.', error);
    }

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/admissions',
        '/contact-us',
        '/news',
        '/events',
        '/staff',
        '/videos',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Dynamic routes
    const departmentRoutes = departments.map((d: any) => ({
        url: `${baseUrl}/departments/${d.slug}`,
        lastModified: d.updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const newsRoutes = news.map((n: any) => ({
        url: `${baseUrl}/news/${n.slug}`,
        lastModified: n.updatedAt || new Date(),
        changeFrequency: 'never' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...departmentRoutes, ...newsRoutes];
}
