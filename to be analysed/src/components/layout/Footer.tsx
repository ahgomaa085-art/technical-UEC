// PURPOSE: Global site footer with contact info, social links, location map, and privacy links.
// KEY PARTS: Brand Logo, Contact Grid, Google Maps Iframe, Bottom Legal Links.
// MODIFIABLE: Contact info (lines 45-57), Social links (lines 27-31), Map URL (line 74).
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer>
            {/* SECTION: Top Grid (Logo, Contact, Map) */}
            <div className="footer-top">
                <div className="footer-brand">
                    <Link href="/" className="logo" style={{ marginBottom: '16px' }}>
                        <Image
                            src="/footer-logo.png"
                            alt="University of East Capital Logo"
                            width={200}
                            height={75}
                            style={{ objectFit: 'contain' }}
                            className="logo-img logo-footer"
                        />
                    </Link>
                    <p style={{ marginTop: '16px' }}>
                        University of East Capital offers a transformative educational experience integrating
                        academic rigour with cutting-edge innovation and ethical leadership.
                    </p>
                    <div className="footer-social">
                        <a href="https://www.facebook.com/univofeastcapital" title="Facebook">f</a>
                        <a href="https://www.instagram.com/univofeastcapital" title="Instagram">ig</a>
                        <a href="https://x.com/EastCapitalUni" title="Twitter/X">𝕏</a>
                        <a href="https://www.linkedin.com/company/universityofeastcapital/" title="LinkedIn">in</a>
                        <a href="https://www.tiktok.com/@univofeastcapital" title="TikTok">tt</a>
                        <a href="https://wa.me/201505123555" target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        </a>
                    </div>
                </div>


                {/* SECTION: Contact Information & Hotline */}
                <div className="footer-col">
                    <h4>Contact</h4>
                    <div className="footer-contact-item">
                        <span style={{ color: '#fff', marginRight: '8px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        </span>
                        <span className="footer-phone" style={{ fontSize: '20px', fontWeight: '700' }}>17523</span>
                    </div>
                    <div className="footer-contact-item">
                        <span style={{ color: '#fff', marginRight: '8px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </span>
                        <a href="mailto:Admissions@uec.edu.eg">Admissions@uec.edu.eg</a>
                    </div>
                    <div className="footer-contact-item">
                        <span style={{ color: '#fff', marginRight: '8px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                        </span>
                        <a href="https://www.uec.edu.eg" target="_blank" rel="noopener noreferrer">www.uec.edu.eg</a>
                    </div>
                    <div style={{ marginTop: '24px' }}>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-apply-modal'))}
                            className="footer-cta"
                            style={{ background: 'var(--gold)', color: '#fff', border: 'none', cursor: 'pointer', padding: '12px 24px', borderRadius: '8px', fontWeight: 700 }}
                        >
                            Apply Now
                        </button>
                    </div>
                </div>

                {/* SECTION: Google Maps Location */}
                <div className="footer-col footer-map">
                    <h4>Our Location</h4>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.4759973562377!2d31.538498500000003!3d30.166394000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14580333fc7be2f3%3A0x86397a7e51741f2d!2sUniversity%20Of%20East%20Capital!5e0!3m2!1sar!2seg!4v1777478518855!5m2!1sar!2seg"
                            width="100%"
                            height="160"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="UEC Location Map"
                        ></iframe>
                    </div>
                    <div style={{ marginTop: '16px', fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7' }}>
                        <div style={{ marginBottom: '10px', fontSize: '19px', color: '#fff', fontWeight: '700' }}>
                            Located in the Heart of East Cairo
                        </div>
                        10 minutes from Obour City<br />
                        10 minutes from El Shorouk City<br />
                        20 Minutes from Madinty<br />
                        20 Minutes from ElRehab City<br />
                        20 Minutes from 5th Settlement
                    </div>
                </div>
            </div>

            {/* SECTION: Bottom Bar (Copyright & Legal) */}
            <div className="footer-bottom">
                <span>© 2025 University of East Capital. All rights reserved.</span>
                <div className="footer-bottom-links">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Use</Link>
                    <Link href="/accessibility">Accessibility</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
