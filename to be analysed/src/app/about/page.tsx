import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';

export default function AboutPage() {
    return (
        <main>
            <RevealScript />
            <PageHeader
                title="About UEC"
                subtitle="Unleashing potential, fostering excellence."
            />
            <section className="section">
                <div className="reveal">
                    <div className="section-tag">Our Story</div>
                    <h2 className="section-title">Built on <em>Vision</em></h2>
                    <p className="section-sub">
                        The University of East Capital (UEC) stands as a beacon of academic rigour and innovation in East Cairo.
                        Our mission is to cultivate a dynamic generation of leaders poised to make an impact in Egypt and beyond.
                    </p>
                </div>

                <div className="reveal" style={{ marginTop: '60px' }}>
                    <div className="section-tag">Mission & Vision</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginTop: '32px' }}>
                        <div>
                            <h3 className="school-name">Our Mission</h3>
                            <p className="section-sub">
                                To provide a transformative educational experience that integrates cutting-edge research,
                                ethical leadership, and a global perspective across all disciplines.
                            </p>
                        </div>
                        <div>
                            <h3 className="school-name">Our Vision</h3>
                            <p className="section-sub">
                                To be recognized as a world-class center for innovation and excellence,
                                shaping the future through discovery and inclusivity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
