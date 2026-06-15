"use client";

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import Image from 'next/image';
import Link from 'next/link';

export default function AdmissionsNewsPage() {
    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Admissions 2026/2027"
                subtitle="Join the Next Generation of Industry-Driven Leaders"
            />

            <article className="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '90px 24px' }}>
                <div className="reveal">
                    <div className="section-tag">Academic Year Opening</div>
                    <h2 className="section-title">Applications Now Open for the 2026–2027 Academic Year</h2>

                    <div className="responsive-flex-grid" style={{ display: 'flex', gap: '48px', margin: '40px 0', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 500px' }}>
                            <p className="section-sub" style={{ fontSize: '18px', color: 'var(--navy)', fontWeight: '500' }}>
                                The University of East Capital (UEC) is proud to announce that applications for the
                                2026–2027 academic year are officially open across all nine prestigious faculties.
                            </p>
                            <p className="section-sub">
                                As a pioneer in industry-integrated education, UEC offers a unique learning ecosystem
                                that bridges the gap between academic theory and professional excellence. Our programs
                                are designed specifically to meet the demands of the modern global market, focusing on
                                medicine, technology, and interdisciplinary research.
                            </p>
                            <div style={{ marginTop: '32px' }}>
                                <button
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-apply-modal'))}
                                    className="btn-primary"
                                    style={{ padding: '16px 40px', fontSize: '18px' }}
                                >
                                    Start Your Application Now
                                </button>
                            </div>
                        </div>
                        <div style={{ flex: '1 1 400px', position: 'relative', aspectRatio: '4/5', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', background: '#f5f5f5' }}>
                            <Image
                                src="/images/faculties/Admission.webp"
                                alt="UEC Admissions Opening"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    <div style={{ background: 'var(--off)', padding: '40px 24px', borderRadius: '12px', borderLeft: '4px solid var(--gold)', margin: '60px 0' }}>
                        <h3 className="section-title" style={{ fontSize: '24px' }}>Why Choose UEC?</h3>
                        <p className="section-sub">
                            UEC provides more than just a degree. We provide a career-ready experience. Through our
                            "RESPECT" core areas, we ensure every student gains hands-on experience in clinical
                            simulations, industry projects, and international collaborations.
                        </p>
                    </div>

                    <div style={{ margin: '80px 0' }}>
                        <div className="section-tag">Academic Opportunities</div>
                        <h2 className="section-title">Nine Faculties, Infinite Possibilities</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '32px' }}>
                            {[
                                { name: 'Faculty of Medicine', slug: 'medicine' },
                                { name: 'Faculty of Dentistry', slug: 'dentistry' },
                                { name: 'Faculty of Pharmacy', slug: 'pharmacy' },
                                { name: 'Faculty of Physical Therapy', slug: 'physical-therapy' },
                                { name: 'Faculty of Engineering', slug: 'engineering' },
                                { name: 'Faculty of Business & Economics', slug: 'business-economics' },
                                { name: 'Faculty of Mass Communication', slug: 'mass-communication' },
                                { name: 'Art & Design', slug: 'art-design' },
                                { name: 'Computer Science & IT', slug: 'computer-science' }
                            ].map((faculty, idx) => (
                                <Link key={idx} href={`/departments/${faculty.slug}`} className="hover-card" style={{
                                    background: '#fff',
                                    padding: '30px',
                                    borderRadius: '8px',
                                    border: '1px solid #eee',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    transition: 'all 0.3s'
                                }}>
                                    <div className="section-tag" style={{ margin: '0 0 10px 0' }}>Faculty</div>
                                    <h4 style={{ margin: 0, color: 'var(--navy)' }}>{faculty.name}</h4>
                                    <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>Explore cutting-edge curriculum and specialized labs.</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '80px auto 40px' }}>
                        <p className="section-sub" style={{ fontSize: '20px', fontStyle: 'italic', color: 'var(--navy)' }}>
                            "Our mission is to empower students with the skills, ethics, and vision required to lead
                            in the 21st century. Your journey to excellence begins here."
                        </p>
                        <div style={{ marginTop: '40px' }}>
                            <Link href="/tuition" className="btn-outline">
                                View Tuition Fees & Scholarships →
                            </Link>
                        </div>
                    </div>
                </div>
            </article>

            <style jsx>{`
                .hover-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--gold);
                    box-shadow: 0 10px 30px rgba(78, 64, 153, 0.1);
                }
                @media (max-width: 768px) {
                    .section-title {
                        font-size: 26px !important;
                    }
                    .section-sub {
                        font-size: 16px !important;
                    }
                }
            `}</style>
        </main>
    );
}
