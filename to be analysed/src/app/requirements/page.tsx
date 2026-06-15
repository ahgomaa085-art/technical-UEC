import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import Link from 'next/link';
import { Metadata } from 'next';
import { resolveAsset } from '@/utils/assets';

export const metadata: Metadata = {
    title: 'Entry Requirements | University of East Capital',
    description: 'Explore faculty-specific entry requirements for the University of East Capital — Egyptian "Thanaweya Amma", IGCSE, American Diploma, IB, and more.',
};

const faculties = [
    {
        slug: 'medicine',
        label: 'Faculty of Medicine',
        icon: '🩺',
        description: 'Explore entry requirements for the UEC Faculty of Medicine across all accepted certificate types including Egyptian Secondary "Thanaweya Amma", IGCSE, American Diploma, IB, and more.',
    },
    {
        slug: 'dentistry',
        label: 'Faculty of Dentistry',
        icon: '🦷',
        description: 'View the entry requirements and qualifying subjects for the UEC Faculty of Dentistry across all accepted certificate types.',
    },
    {
        slug: 'pharmacy',
        label: 'Faculty of Pharmacy',
        icon: '💊',
        description: 'Explore the academic prerequisites and certificate requirements for the UEC Faculty of Pharmacy.',
    },
    {
        slug: 'physical-therapy',
        label: 'Faculty of Physical Therapy',
        icon: '🏃',
        description: 'View the comprehensive entry requirements for Physical Therapy across all certificate types accepted by UEC for the 2026/2027 academic year.',
    },
    {
        slug: 'engineering',
        label: 'Faculty of Engineering',
        icon: '⚙️',
        description: 'Discover the entry requirements for the UEC Faculty of Engineering, including Advanced Mathematics and certificate-specific criteria.',
    },
    {
        slug: 'computer-sciences',
        label: 'Faculty of Computer Sciences',
        icon: '💻',
        description: 'Discover the academic prerequisites and qualifying subjects required to join the UEC Faculty of Computer Sciences.',
    },
    {
        slug: 'business-economics',
        label: 'Faculty of Business & Economics',
        icon: '📊',
        description: 'Find the entry criteria and supported certificate types for joining the UEC Faculty of Business & Economics.',
    },
    {
        slug: 'art-design',
        label: 'Faculty of Art & Design',
        icon: '🎨',
        description: 'View the entry requirements for the UEC Faculty of Art & Design, accepting both Scientific and Art section certificates.',
    },
    {
        slug: 'mass-communication',
        label: 'Faculty of Mass Communication',
        icon: '📡',
        description: 'Explore the entry criteria for the UEC Faculty of Mass Communication across all accepted certificate types.',
    },
];

export default function RequirementsHubPage() {
    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Faculty Entry Requirements"
                subtitle="Academic Year 2026 – 2027"
                bgImage={resolveAsset('/images/hero/hero-2.webp')}
            />

            <section className="section">
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div className="section-tag">Admissions</div>
                        <h2 className="section-title">Certificates & Entry Criteria</h2>
                        <p className="section-sub" style={{ maxWidth: '780px', margin: '0 auto' }}>
                            Select your faculty to explore the specific entry requirements for each accepted certificate type,
                            including qualifying subjects, minimum scores, and important notes.
                        </p>
                    </div>

                    <div className="req-faculty-grid reveal">
                        {faculties.map((f) => (
                            <div key={f.slug} className="req-faculty-card">
                                <div className="req-faculty-card-icon">{f.icon}</div>
                                <div className="req-faculty-card-title">{f.label}</div>
                                <div className="req-faculty-card-desc">{f.description}</div>
                                <Link href={`/requirements/${f.slug}`} className="req-faculty-card-cta">
                                    View Entry Requirements →
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="reveal" style={{ marginTop: '70px', background: 'var(--navy)', borderRadius: '20px', padding: 'clamp(25px, 5vw, 50px)', textAlign: 'center', color: 'white' }}>
                        <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', marginBottom: '15px' }}>Ready to Apply?</h3>
                        <p style={{ opacity: 0.9, marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
                            Once you have reviewed the entry requirements for your preferred faculty, proceed to the Admission Portal to begin your application.
                        </p>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="https://apply.uec.edu.eg" className="nav-cta" style={{ background: 'var(--gold)', color: 'var(--navy)', display: 'inline-block' }}>
                                Proceed to Admission Portal →
                            </Link>
                            <a href="https://wa.me/201505123555" target="_blank" rel="noopener noreferrer" className="nav-cta" style={{ background: '#25D366', color: 'white', display: 'inline-block' }}>
                                WhatsApp Admissions
                            </a>
                        </div>

                        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', fontSize: '15px' }}>
                            <a href="tel:17523" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                Hotline: 17523
                            </a>
                            <a href="mailto:Enrol@uec.edu.eg" style={{ color: 'white', textDecoration: 'none' }}>✉️ Enrol@uec.edu.eg</a>
                            <a href="tel:01505123666" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                01505123666
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
