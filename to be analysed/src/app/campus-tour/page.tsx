'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';

export default function CampusTourPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: 'Prospective Student',
        faculty: 'General Tour',
        visitDate: '',
        attendees: '1'
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // In a real app, this would send data to an API
        console.log('Tour Registration Submitted:', formData);
    };

    if (submitted) {
        return (
            <main>
                <RevealScript />
                <PageHeader
                    title="Visit Scheduled!"
                    subtitle="We look forward to welcoming you to the University of East Capital."
                />
                <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="reveal glass-card" style={{ maxWidth: '600px', textAlign: 'center', padding: '60px' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '30px' }}>🏢</div>
                        <h2 className="section-title">Registration <em>Confirmed</em></h2>
                        <p className="section-sub">
                            Thank you, {formData.name.split(' ')[0]}. We have received your request for an in-person tour on <strong>{formData.visitDate}</strong>.
                        </p>
                        <p className="section-sub" style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                            A tour coordinator will contact you at <strong>{formData.email}</strong> within 24 hours to confirm the logistics and parking details.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="btn-primary"
                            style={{ marginTop: '30px', background: 'var(--navy)', color: 'white' }}
                        >
                            Return to Homepage
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Campus Tours"
                subtitle="Experience our state-of-the-art facilities and vibrant community first‑hand."
            />

            <section className="section">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'start' }}>

                    {/* Left Side: Info */}
                    <div className="reveal">
                        <div className="section-tag">Schedule a Visit</div>
                        <h2 className="section-title">Explore Your <em>Future</em></h2>
                        <p className="section-sub">
                            The best way to feel the energy of the University of East Capital is to walk our corridors,
                            visit our laboratories, and meet our faculty. Our guided tours provide a deep dive into the
                            academic life at UEC.
                        </p>

                        <div style={{ marginTop: '40px', display: 'grid', gap: '25px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontSize: '1.5rem' }}>🧭</div>
                                <div>
                                    <h4 style={{ color: 'var(--navy)', margin: 0 }}>Location</h4>
                                    <p style={{ margin: 0, opacity: 0.7 }}>KM 31 Ismailia Desert Rd, El Shorouk, East Cairo, Egypt</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontSize: '1.5rem' }}>⏱️</div>
                                <div>
                                    <h4 style={{ color: 'var(--navy)', margin: 0 }}>Tour Duration</h4>
                                    <p style={{ margin: 0, opacity: 0.7 }}>Approximately 60-90 minutes</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontSize: '1.5rem' }}>🎓</div>
                                <div>
                                    <h4 style={{ color: 'var(--navy)', margin: 0 }}>Faculty Focus</h4>
                                    <p style={{ margin: 0, opacity: 0.7 }}>Personalized tours based on your interest</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="reveal glass-card" style={{ padding: '40px', borderRadius: '20px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--navy)', fontWeight: '600' }}>Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(78,64,153,0.1)' }}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--navy)', fontWeight: '600' }}>Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="form-control"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(78,64,153,0.1)' }}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--navy)', fontWeight: '600' }}>Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="form-control"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(78,64,153,0.1)' }}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--navy)', fontWeight: '600' }}>Category</label>
                                    <select
                                        className="form-control"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(78,64,153,0.1)' }}
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Prospective Student</option>
                                        <option>Parent/Guardian</option>
                                        <option>School Counselor</option>
                                        <option>Industry Partner</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--navy)', fontWeight: '600' }}>Faculty of Interest</label>
                                    <select
                                        className="form-control"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(78,64,153,0.1)' }}
                                        value={formData.faculty}
                                        onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                                    >
                                        <option>General University Tour</option>
                                        <option>Faculty of Medicine</option>
                                        <option>Faculty of Computer Science & IT</option>
                                        <option>Faculty of Business & Economics</option>
                                        <option>Faculty of Physical Therapy</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--navy)', fontWeight: '600' }}>Visit Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="form-control"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(78,64,153,0.1)' }}
                                        value={formData.visitDate}
                                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                                style={{
                                    width: '100%',
                                    marginTop: '10px',
                                    padding: '16px',
                                    fontSize: '1.2rem',
                                    background: 'var(--gold)',
                                    color: 'var(--navy)',
                                    border: 'none',
                                    fontWeight: '800'
                                }}
                            >
                                Schedule Campus Visit →
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.6, margin: 0 }}>
                                By submitting, you agree to receive communications regarding your campus visit.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
