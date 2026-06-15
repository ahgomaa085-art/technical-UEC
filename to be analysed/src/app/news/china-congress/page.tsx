"use client";

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import Image from 'next/image';

export default function ChinaCongressNewsPage() {
    return (
        <main>
            <RevealScript />
            <PageHeader
                title="International Excellence"
                subtitle="UEC at the Heart of the Global Digital Education Landscape"
            />

            <article className="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '90px 24px' }}>
                <div className="reveal">
                    <div className="section-tag">Global Leadership</div>
                    <h2 className="section-title">University of East Capital at the Heart of the Global Digital Education Landscape</h2>

                    <div className="responsive-flex-grid" style={{ display: 'flex', gap: '48px', margin: '40px 0', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 500px' }}>
                            <p className="section-sub" style={{ fontSize: '18px', color: 'var(--navy)', fontWeight: '500' }}>
                                With steady strides toward global leadership in medical education, the University of East Capital (UEC),
                                as an active member of the World Digital Education Alliance (WDEA) participated in the alliance's
                                General Assembly meeting and Annual Conference.
                            </p>
                            <p className="section-sub">
                                The university was represented by Prof. Mona Abdel-Aal Elzahry, Vice Dean of the Faculty of Medicine
                                for Education and Students’ Affairs, who delivered a distinguished presentation titled:
                                <strong style={{ display: 'block', margin: '16px 0', color: 'var(--gold)', fontSize: '22px' }}>
                                    “Integrated AI-Enhanced Learning Ecosystem”
                                </strong>
                            </p>
                        </div>
                        <div style={{ flex: '1 1 400px', position: 'relative', aspectRatio: '4/5', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', background: '#f5f5f5' }}>
                            <Image
                                src="/images/news/china-congress/cover.jpg"
                                alt="UEC Representation at WDEA"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    <div style={{ background: 'var(--off)', padding: '40px 24px', borderRadius: '12px', borderLeft: '4px solid var(--gold)', margin: '60px 0' }}>
                        <h3 className="section-title" style={{ fontSize: '24px' }}>A Smart Learning Environment</h3>
                        <p className="section-sub">
                            During the presentation, Prof. Elzahry showcased the university’s vision for integrating digital technologies
                            into academic curricula and clinical training. This approach creates a smart learning environment that
                            places the student at the heart of technological innovation, preparing them to be future physicians
                            capable of navigating the most complex digital health systems.
                        </p>
                    </div>

                    <div className="responsive-flex-grid" style={{ display: 'flex', gap: '48px', margin: '60px 0', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
                        <div style={{ flex: '1 1 400px', position: 'relative', aspectRatio: '4/5', borderRadius: '8px', overflow: 'hidden', background: '#f5f5f5' }}>
                            <Image
                                src="/images/news/china-congress/event1.jpg"
                                alt="Innovation in Education"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <div style={{ flex: '1 1 500px' }}>
                            <div className="section-tag">Top 30 Innovative Experience</div>
                            <p className="section-sub">
                                Notably, the University of East Capital’s experience was selected as one of the
                                <strong> top 30 innovative educational experiences </strong>
                                out of more than 500 case studies and was featured in the alliance’s official report
                                <em style={{ display: 'block', marginTop: '12px' }}>“Best Practices in AIED: Scenario-Driven Educational Transformation Report.”</em>
                            </p>
                        </div>
                    </div>

                    <div style={{ margin: '80px 0' }}>
                        <div className="section-tag">Event Highlights</div>
                        <h2 className="section-title">Participation Highlights</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '32px' }}>
                            {[2, 3, 4].map((num) => (
                                <div key={num} style={{ position: 'relative', aspectRatio: '4/5', borderRadius: '6px', overflow: 'hidden', transition: 'transform 0.3s', background: '#f5f5f5' }} className="hover-scale">
                                    <Image
                                        src={`/images/news/china-congress/event${num}.jpg`}
                                        alt={`Event Photo ${num}`}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '80px auto 40px' }}>
                        <p className="section-sub" style={{ fontSize: '20px', fontStyle: 'italic', color: 'var(--navy)' }}>
                            "This participation underscores the University of East Capital’s role as a strategic partner
                            in international alliances and highlights its ongoing commitment to exchanging expertise
                            with major academic entities to enhance the global standing of its students and graduates."
                        </p>
                    </div>
                </div>
            </article>

            <style jsx>{`
                .hover-scale:hover {
                    transform: scale(1.03);
                    box-shadow: 0 10px 30px rgba(78, 64, 153, 0.15);
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
