// PURPOSE: Careers landing page featuring academic and administrative vacancies.
// KEY PARTS: Hero section, Recruitment process, Job Vacancy links, HR Contact Bar.
// MODIFIABLE: HR Contact Email (line 114), Vacancy links (lines 104-107).
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import Link from 'next/link';
import { Metadata } from 'next';
import { resolveAsset } from '@/utils/assets';

export const metadata: Metadata = {
    title: 'Careers at UEC | University of East Capital',
    description: 'Join the University of East Capital. Explore administrative and academic career opportunities and apply to be part of our world-class team.',
};

export default function CareersHubPage() {
    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Careers at UEC"
                subtitle="Join Our Team of Excellence"
                bgImage={resolveAsset('/images/hero/hero-2.webp')}
            />

            <section className="section">
                <div className="container">
                    {/* Intro */}
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div className="section-tag">Human Resources</div>
                        <h2 className="section-title">Build Your Career at UEC</h2>
                        <p className="section-sub" style={{ maxWidth: '780px', margin: '0 auto' }}>
                            The University of East Capital is committed to attracting exceptional talent.
                            We invite qualified professionals who share our passion for academic excellence,
                            innovation, and academic based integrity to explore our current openings.
                        </p>
                        <div style={{ marginTop: '30px' }}>
                            <Link href="/careers/vacancies" className="btn-primary">
                                View Current Vacancies →
                            </Link>
                        </div>
                    </div>

                    {/* Two Category Cards */}
                    {/* SECTION: Careers Category Selection — Administrative vs Academic */}
                    <div className="reveal careers-category-grid">
                        {/* Administrative Card */}
                        <div className="careers-category-card careers-card-admin">
                            <div className="careers-card-icon-wrap">
                                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z" fill="currentColor" />
                                    <path d="M13 10H11V13H8V15H11V18H13V15H16V13H13V10Z" fill="currentColor" opacity="0.6" />
                                </svg>
                            </div>
                            <div className="careers-card-label">Administrative Positions</div>
                            <h3 className="careers-card-title">Administration &amp; Support Staff</h3>
                            <p className="careers-card-desc">
                                Join our professional administrative team across departments including
                                Finance, Human Resources, Student Affairs, IT Services, Facilities,
                                Marketing, and more. We seek dedicated professionals who uphold
                                academic based standards and operational excellence.
                            </p>
                            <ul className="careers-card-highlights">
                                <li>Full-time positions available</li>
                                <li>Competitive compensation packages</li>
                                <li>Professional development opportunities</li>
                                <li>Modern campus work environment</li>
                            </ul>
                            <Link href="/careers/administrative" className="careers-card-cta">
                                View &amp; Apply for Administrative Positions →
                            </Link>
                        </div>

                        {/* Academic Card */}
                        <div className="careers-category-card careers-card-academic">
                            <div className="careers-card-icon-wrap">
                                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="currentColor" opacity="0.6" />
                                    <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="careers-card-label">Academic Positions</div>
                            <h3 className="careers-card-title">Faculty &amp; Research Staff</h3>
                            <p className="careers-card-desc">
                                We are seeking distinguished academics and researchers to join our nine
                                faculties — Medicine, Dentistry, Pharmacy, Physical Therapy, Engineering,
                                Computer Science, Business &amp; Economics, Art &amp; Design, and
                                Mass Communication. Contribute to shaping the next generation of leaders.
                            </p>
                            <ul className="careers-card-highlights">
                                <li>Lecturer to Professor level positions</li>
                                <li>Research funding &amp; lab facilities</li>
                                <li>International collaboration opportunities</li>
                                <li>Publication &amp; conference support</li>
                            </ul>
                            <Link href="/careers/academic" className="careers-card-cta careers-card-cta-academic">
                                View &amp; Apply for Academic Positions →
                            </Link>
                        </div>
                    </div>

                    {/* Academic based Note */}
                    {/* SECTION: Recruitment Standards & Data Privacy Notice */}
                    <div className="reveal careers-notice">
                        <div className="careers-notice-icon">⚠️</div>
                        <div>
                            <strong>Important Notice:</strong> The University of East Capital maintains the highest
                            standards in its recruitment process. Only shortlisted candidates will be contacted.
                            All submitted information is treated with strict confidentiality in accordance with
                            academic based data protection policies.
                        </div>
                    </div>

                    {/* Contact HR */}
                    {/* SECTION: HR Direct Contact Bar — STYLE: Font 1.1rem */}
                    <div className="reveal careers-contact-bar">
                        <h3>Have Questions About Vacancies?</h3>
                        <p>Contact our Human Resources Department for inquiries about positions and the application process.</p>
                        <div className="careers-contact-links">
                            <a href="mailto:hr@uec.edu.eg">
                                <span>✉️</span> hr@uec.edu.eg
                            </a>
                            <a href="tel:17523" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                Hotline: 17523
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
