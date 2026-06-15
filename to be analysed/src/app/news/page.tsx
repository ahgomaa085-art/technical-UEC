import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import prisma from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NewsListingPage() {
    let news: any[] = [];
    try {
        news = await prisma.newsPost.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console.error("Failed to fetch news:", error);
    }

    return (
        <main>
            <RevealScript />
            <PageHeader
                title="News & Events"
                subtitle="Stay updated with the latest happenings at UEC."
            />
            <section className="section">
                {news.length === 0 ? (
                    <div className="reveal">
                        <p className="section-sub">No news articles found. Please check back later.</p>
                    </div>
                ) : (
                    <div className="news-grid reveal">
                        {news.map((post, index) => (
                            <Link key={post.id} href={`/news/${post.slug}`} className={`news-card ${index % 3 === 0 ? 'featured' : ''}`}>
                                <div className="news-img">
                                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ opacity: 0.4 }}>
                                        <rect x="8" y="8" width="36" height="36" rx="4" stroke="white" strokeWidth="2" />
                                        <path d="M16 26h20M16 34h12" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                                <span className="news-cat">Update</span>
                                <div className="news-title">{post.title}</div>
                                <div className="news-meta">
                                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
