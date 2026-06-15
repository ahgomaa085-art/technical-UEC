import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import prisma from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EventsListingPage() {
    const events = await prisma.event.findMany({
        where: { published: true },
        orderBy: { startDate: 'asc' },
    });

    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Upcoming Events"
                subtitle="Join our community for academic, cultural, and social events."
            />
            <section className="section">
                {events.length === 0 ? (
                    <div className="reveal">
                        <p className="section-sub">No upcoming events found. Stay tuned for our next academic calendar update.</p>
                    </div>
                ) : (
                    <div className="news-grid reveal">
                        {events.map((event) => (
                            <Link key={event.id} href={`/events/${event.slug}`} className="news-card">
                                <div className="news-img" style={{ background: 'var(--blue)' }}>
                                    <div style={{ textAlign: 'center', color: '#fff' }}>
                                        <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}</div>
                                        <div style={{ fontSize: '32px', fontWeight: 800 }}>{new Date(event.startDate).getDate()}</div>
                                    </div>
                                </div>
                                <span className="news-cat">Event</span>
                                <div className="news-title">{event.title}</div>
                                <div className="news-meta">
                                    📍 {event.location || 'UEC Campus'}<br />
                                    🕒 {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
