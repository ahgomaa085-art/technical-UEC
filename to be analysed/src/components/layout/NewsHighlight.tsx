'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NewsHighlight = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Show after a delay (e.g., 3 seconds)
        const timer = setTimeout(() => {
            if (!localStorage.getItem('newsHighlightDismissed')) {
                setIsVisible(true);
            }
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        localStorage.setItem('newsHighlightDismissed', 'true');
    };

    if (!isVisible || isDismissed) return null;

    return (
        <div className="news-highlight-toast">
            <button className="news-highlight-close" onClick={dismiss}>×</button>

            <div className="news-highlight-badge">Achievement</div>

            <Link href="/news/china-congress" className="news-highlight-content">
                <div className="news-highlight-thumb">
                    <Image
                        src="/images/news/china-congress/cover.webp"
                        alt="News Achievement"
                        width={60}
                        height={60}
                        className="news-highlight-img"
                    />
                </div>
                <div className="news-highlight-text">
                    <div className="news-highlight-label">Recent Recognition</div>
                    <div className="news-highlight-title">Recognized Among Top 30 Innovative Educational Experiences Worldwide</div>
                    <div className="news-highlight-action">Read Full Article →</div>
                </div>
            </Link>
        </div>
    );
};

export default NewsHighlight;
