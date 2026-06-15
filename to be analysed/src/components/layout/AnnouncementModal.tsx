'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { resolveAsset } from '@/utils/assets';

const AnnouncementModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if modal has been shown in the current session
        const hasBeenShown = sessionStorage.getItem('uec_announcement_shown');
        if (!hasBeenShown) {
            // Show modal after a short delay for smooth arrival
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('uec_announcement_shown', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="announcement-overlay">
            <div className="announcement-modal">
                <button className="announcement-close" onClick={handleClose} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="announcement-grid">
                    <div className="announcement-image" style={{ background: '#f8f9fa' }}>
                        <Image
                            src={resolveAsset('/images/announcement-cta.webp')}
                            alt="Announcement"
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="50vw"
                        />
                        <div className="announcement-image-overlay"></div>
                    </div>

                    <div className="announcement-content">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '20px',
                            background: '#fff',
                            width: '160px',
                            height: '160px',
                            borderRadius: '24px',
                            margin: '0 auto 20px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            position: 'relative',
                            zIndex: 2,
                            overflow: 'hidden'
                        }}>
                            <Image
                                src={resolveAsset('/images/logo-white-back.webp')}
                                alt="University of East Capital Logo"
                                width={130}
                                height={130}
                                style={{ borderRadius: '20px' }}
                            />
                        </div>
                        <div className="announcement-tag">Admission 2026-2027</div>
                        <h2 className="announcement-title center" style={{ fontSize: '2.4rem', lineHeight: '1.1', textAlign: 'center' }}>Industry Leaders Share in the Educational Process</h2>
                        <p className="announcement-text" style={{ textAlign: 'center' }}>
                            Join a community where curiosity meets discovery. Enrollment opens for our
                            world-class undergraduate programs.
                        </p>
                        <div className="announcement-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '15px' }}>
                            <button
                                onClick={() => {
                                    handleClose();
                                    window.dispatchEvent(new CustomEvent('open-apply-modal'));
                                }}
                                className="btn-primary btn-apply-pulse"
                                style={{
                                    textAlign: 'center',
                                    minWidth: '160px',
                                    background: 'var(--gold)',
                                    color: 'var(--navy)',
                                    fontWeight: '800',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                Apply Now
                            </button>
                            <button
                                className="btn-outline"
                                onClick={() => {
                                    handleClose();
                                    window.dispatchEvent(new CustomEvent('open-virtual-tour'));
                                }}
                                style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                            >
                                Virtual Tour ▷
                            </button>
                        </div>
                        <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--navy)', fontWeight: '700', fontSize: '1.2rem' }}>
                            Hotline: 17523
                        </div>
                        <div className="announcement-footer" style={{ marginTop: '30px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px', textAlign: 'center' }}>
                            <div className="footer-copyright" style={{
                                background: 'var(--navy)',
                                color: '#fff',
                                padding: '8px 24px',
                                borderRadius: '50px',
                                display: 'inline-block',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                border: '2px solid var(--gold)',
                                boxShadow: '0 4px 12px rgba(10, 31, 60, 0.2)'
                            }}>
                                University of East Capital Industry-Driven University
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementModal;
