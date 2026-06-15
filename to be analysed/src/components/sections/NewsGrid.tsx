import React from 'react';
import Image from 'next/image';

const NewsGrid = () => {
    const newsItems = [
        {
            cat: 'International',
            title: 'UEC at the Heart of the Global Digital Education Landscape: Participating in WDEA General Assembly',
            meta: 'May 2026 · World Digital Education Alliance',
            slug: 'china-congress',
            image: '/images/news/china-congress/cover.webp'
        },
        {
            cat: 'Research',
            title: 'UEC Launches Interdisciplinary Research Hub Bridging Technology and Healthcare',
            meta: 'September 2025 · University of East Capital',
            icon: (
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position: 'relative', zIndex: 1, opacity: 0.4 }}>
                    <circle cx="40" cy="40" r="30" stroke="white" strokeWidth="2" />
                    <path d="M28 40h24M40 28v24" stroke="white" strokeWidth="2" />
                </svg>
            )
        },
        {
            cat: 'Admissions',
            title: 'Applications Now Open for the 2026–2027 Academic Year',
            meta: 'August 2026 · Admissions Office',
            image: '/images/news/admission_v2.webp',
            slug: 'admissions-2026'
        },
        {
            cat: 'Campus',
            title: 'Inaugural Campus Life Festival Celebrates UEC\'s Founding Community',
            meta: 'July 2025 · Student Affairs',
            icon: (
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ position: 'relative', zIndex: 1, opacity: 0.4 }}>
                    <path d="M26 8L44 20v24H8V20L26 8z" stroke="white" strokeWidth="2" />
                </svg>
            )
        }
    ];

    return (
        <section className="news-section" id="news">
            <div className="news-header reveal">
                <div>
                    <div className="section-tag">Latest from UEC</div>
                    <h2 className="section-title">News &amp; Events</h2>
                </div>
                <a href="https://www.uec.edu.eg/news/" className="btn-outline">View All News →</a>
            </div>

            <div className="news-grid">
                {newsItems.map((item, index) => (
                    <a key={index} href={item.slug ? `/news/${item.slug}` : "https://www.uec.edu.eg/news/"} className={`news-card reveal ${index === 0 ? 'featured' : ''} ${index > 0 ? `reveal-delay-${index}` : ''}`}>
                        <div
                            className="news-img"
                            style={item.image ? {
                                position: 'relative',
                                backgroundSize: item.slug === 'china-congress' ? 'contain' : 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: item.slug === 'china-congress' ? 'transparent' : 'transparent',
                                minHeight: index === 0 ? '280px' : '220px',
                                overflow: 'hidden'
                            } : (index === 0 ? { minHeight: '280px' } : {})}
                        >
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    style={{ objectFit: item.slug === 'china-congress' ? 'contain' : 'cover' }}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            )}
                            {!item.image && item.icon}
                        </div>
                        <span className="news-cat">{item.cat}</span>
                        <div className="news-title">{item.title}</div>
                        <div className="news-meta">{item.meta}</div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default NewsGrid;
