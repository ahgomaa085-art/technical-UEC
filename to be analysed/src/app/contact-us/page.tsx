"use client";

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';

const ContactUsPage = () => {
    const SOCIAL_LINKS = [
        { name: 'Facebook', icon: 'f', color: '#1877F2', url: 'https://www.facebook.com/univofeastcapital', handle: '@univofeastcapital' },
        { name: 'Instagram', icon: 'ig', color: '#E4405F', url: 'https://www.instagram.com/univofeastcapital', handle: '@univofeastcapital' },
        { name: 'WhatsApp', icon: '💬', color: '#25D366', url: 'https://wa.me/201505123555', handle: '+20 1505123555' },
        { name: 'LinkedIn', icon: 'in', color: '#0A66C2', url: 'https://www.linkedin.com/company/universityofeastcapital/', handle: 'University of East Capital' },
        { name: 'TikTok', icon: 'tt', color: '#000000', url: 'https://www.tiktok.com/@univofeastcapital', handle: '@univofeastcapital' },
        { name: 'Twitter / X', icon: '𝕏', color: '#000000', url: 'https://x.com/EastCapitalUni', handle: '@EastCapitalUni' },
    ];

    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Contact Us"
                subtitle="Get in touch with the University of East Capital."
            />

            <section className="section" style={{ minHeight: '600px' }}>
                <div className="reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px auto' }}>
                    <div className="section-tag">Reach Out</div>
                    <h2 className="section-title">We'd Love to Hear from <em>You</em></h2>
                    <p className="section-sub">
                        Whether you have questions about admissions, research, or campus life,
                        our team is here to provide you with the support you need.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>

                    {/* Contact Info Side */}
                    <div className="reveal">
                        <div style={{
                            background: '#fff',
                            padding: '40px',
                            borderRadius: '24px',
                            boxShadow: '0 20px 40px rgba(10,31,60,0.05)',
                            border: '1px solid var(--border)'
                        }}>
                            <h3 style={{ color: 'var(--navy)', marginBottom: '32px', fontSize: '24px', fontWeight: '700' }}>Direct Contact</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'rgba(212,175,55,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--navy)' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Hotline</div>
                                        <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy)' }}>17523</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'rgba(10,31,60,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <span style={{ fontSize: '24px' }}>✉️</span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Admissions Email</div>
                                        <a href="mailto:Admissions@uec.edu.eg" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', textDecoration: 'none' }}>Admissions@uec.edu.eg</a>
                                        <div style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>General Enrollment: <a href="mailto:Enrol@uec.edu.eg" style={{ color: 'var(--navy)', textDecoration: 'none' }}>Enrol@uec.edu.eg</a></div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'rgba(10,31,60,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <span style={{ fontSize: '24px' }}>📍</span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Main Campus</div>
                                        <div style={{ fontSize: '16px', color: 'var(--navy)', lineHeight: '1.6' }}>
                                            KM 31, Cairo–Ismailia Desert Road,<br />
                                            East Cairo, Egypt
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                marginTop: '40px',
                                padding: '24px',
                                background: 'rgba(212,175,55,0.05)',
                                borderRadius: '16px',
                                border: '1px dashed var(--gold)'
                            }}>
                                <h4 style={{ color: 'var(--navy)', marginBottom: '8px', fontSize: '16px' }}>Admission Office Mobile</h4>
                                <a href="tel:01505123666" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', textDecoration: 'none', display: 'block' }}>01505123666</a>
                            </div>
                        </div>
                    </div>

                    {/* Social Hub Side */}
                    <div className="reveal reveal-delay-2">
                        <div style={{
                            background: 'var(--navy)',
                            padding: '40px',
                            borderRadius: '24px',
                            color: '#fff',
                            boxShadow: '0 20px 40px rgba(10,31,60,0.15)'
                        }}>
                            <h3 style={{ color: '#fff', marginBottom: '8px', fontSize: '24px', fontWeight: '700' }}>Social Media Hub</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Follow us for latest updates and campus highlights.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            padding: '20px',
                                            borderRadius: '16px',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            display: 'block',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                        className="social-hover"
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                            <div style={{ width: '32px', height: '32px', background: social.color, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800 }}>
                                                {social.icon}
                                            </div>
                                            <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>{social.name}</span>
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{social.handle}</div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="reveal reveal-delay-3" style={{ marginTop: '72px' }}>
                    <div style={{
                        borderRadius: '24px',
                        overflow: 'hidden',
                        height: '400px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                        border: '1px solid var(--border)'
                    }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.4759973562377!2d31.538498500000003!3d30.166394000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14580333fc7be2f3%3A0x86397a7e51741f2d!2sUniversity%20Of%20East%20Capital!5e0!3m2!1sar!2seg!4v1777478518855!5m2!1sar!2seg"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="UEC Location Map"
                        ></iframe>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .social-hover:hover {
                    background: rgba(255,255,255,0.1) !important;
                    transform: translateY(-5px);
                    border-color: var(--gold) !important;
                }
            `}</style>
        </main>
    );
};

export default ContactUsPage;
