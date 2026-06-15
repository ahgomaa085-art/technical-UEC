'use client';

import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';

export default function ComingSoonPage() {
    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Coming Soon"
                subtitle="We are currently preparing this section for the 2026/2027 academic year."
            />

            <section className="section" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
                    <div className="reveal">
                        <div className="section-tag" style={{ marginBottom: '24px' }}>Section Under Development</div>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                            Expanding the <em>Academic Experience</em>
                        </h2>
                        <p className="section-sub" style={{ fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.8' }}>
                            The University of East Capital is dedicated to providing meticulous and up-to-date academic resources.
                            Our full academic calendar and related documentations are being finalized to reflect our
                            latest industry-driven curriculum and institutional schedules.
                        </p>

                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            <Link href="/" className="btn-primary" style={{ minWidth: '200px' }}>
                                Back to Homepage
                            </Link>
                            <Link href="/contact-us" className="btn-secondary" style={{ minWidth: '200px' }}>
                                Contact Admissions
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
