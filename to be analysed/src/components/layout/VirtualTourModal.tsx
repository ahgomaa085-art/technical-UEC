'use client';

import React, { useState, useEffect } from 'react';

const tours = [
    {
        id: 'medicine',
        name: 'Faculty of Medicine',
        url: 'https://glowing-begonia-73696e.netlify.app',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M12 5v14" />
                <path d="M7 12h10" />
            </svg>
        )
    },
    {
        id: 'stadium',
        name: 'Football Stadium',
        url: 'https://wonderful-cactus-911235.netlify.app',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m6.7 6.7 10.6 10.6" />
                <path d="m6.7 17.3 10.6-10.6" />
                <path d="M12 2v20" />
                <path d="M2 12h20" />
            </svg>
        )
    },
    {
        id: 'admission',
        name: 'Admission Building',
        url: 'https://euphonious-stardust-d19553.netlify.app',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    }
];

const VirtualTourModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-virtual-tour', handleOpen);
        return () => window.removeEventListener('open-virtual-tour', handleOpen);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="tour-modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="tour-modal" onClick={(e) => e.stopPropagation()}>
                <button className="tour-modal-close" onClick={() => setIsOpen(false)} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="tour-modal-header">
                    <h2 className="tour-modal-title">Interactive <em>Virtual Tours</em></h2>
                    <p className="tour-modal-subtitle">Choose a location to explore in 360° immersion</p>
                </div>

                <div className="tour-grid">
                    {tours.map((tour) => (
                        <div key={tour.id} className="tour-card" onClick={() => window.open(tour.url, '_blank')}>
                            <div className="tour-card-icon">
                                {tour.icon}
                            </div>
                            <h3 className="tour-card-name">{tour.name}</h3>
                            <button className="btn-tour-launch">Launch Tour ▷</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VirtualTourModal;
