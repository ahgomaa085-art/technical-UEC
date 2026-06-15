import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import prisma from '@/lib/db';

export default async function VideoGalleryPage() {
    const videos = await prisma.video.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Video Gallery"
                subtitle="Experience UEC through our latest productions."
            />
            <section className="section">
                {videos.length === 0 ? (
                    <div className="reveal">
                        <p className="section-sub">No videos found. Our media team is working on bringing you new content soon.</p>
                    </div>
                ) : (
                    <div className="news-grid reveal">
                        {videos.map((video) => (
                            <div key={video.id} className="news-card">
                                <div className="news-img" style={{ position: 'relative' }}>
                                    {video.thumbnailUrl && (
                                        <img src={video.thumbnailUrl} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    )}
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                                        <span style={{ fontSize: '40px', color: '#fff' }}>▷</span>
                                    </div>
                                </div>
                                <span className="news-cat">{video.category}</span>
                                <div className="news-title">{video.title}</div>
                                <div className="news-meta">{video.description}</div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
