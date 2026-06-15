// PURPOSE: Tuition & Scholarships page detailing annual fees, discounts, and payment installments.
// KEY PARTS: Egyptian Payment Plan, International Student Pricing, Scholarship Hotline, Installment Tables.
// MODIFIABLE: Fee amounts in Medicine/Dentistry tables (lines 80-105).
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import Link from 'next/link';

export default function TuitionPage() {
    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Tuition Fees & Scholarships"
                subtitle="Academic Year 2026 - 2027"
            />

            <section className="section">
                <div className="container">
                    <div className="reveal">
                        <h2 className="section-title">Investment in Excellence</h2>
                        <p className="section-sub" style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
                            The University of East Capital (UEC) is committed to providing a world-class academic experience.
                            Our tuition structure is designed to reflect the quality of our laboratories, clinical facilities, and faculty expertise.
                        </p>
                    </div>

                    {/* SECTION: Egyptian Students Payment Tables (EGP) */}
                    <div className="reveal" style={{ marginBottom: '80px' }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginBottom: '40px',
                            padding: '0 15px'
                        }}>
                            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', color: 'var(--navy)', marginBottom: '10px' }}>
                                Newcomers Payment Plan of the academic Year 2026-2027
                            </h2>

                            <div style={{ marginBottom: '30px', width: '100%', maxWidth: '600px' }}>
                                <div style={{ color: 'var(--navy)', marginBottom: '15px', fontSize: '1.2rem', fontWeight: '700' }}>
                                    Call for more information
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                                    <a href="tel:17523" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'var(--navy)', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        Hotline: 17523
                                    </a>
                                    <a href="https://wa.me/201505123555" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#25D366', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                        WhatsApp Us
                                    </a>
                                </div>
                            </div>

                            <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', color: 'var(--gold)', fontWeight: 'bold' }}>
                                Tuition Fees - Egyptian Students - EGP
                            </h3>
                        </div>

                        {/* Faculty Tables Grid */}
                        <div style={{ display: 'grid', gap: '40px' }}>
                            {/* SECTION: Medicine Tuition Table — STYLE: Header: #F0F4F8, Text: Bold */}
                            <div className="tuition-pdf-table-wrap">
                                <table className="tuition-pdf-table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '12%' }}>Faculty</th>
                                            <th style={{ width: '10%' }}>Category</th>
                                            <th style={{ width: '12%' }}>Annual Fees</th>
                                            <th style={{ width: '10%' }}>Discount</th>
                                            <th style={{ width: '11%' }}>Total Fees</th>
                                            <th style={{ width: '15%', background: '#F0F4F8', color: '#000', fontWeight: '900' }}>1st Installment</th>
                                            <th style={{ width: '15%', background: '#FFF9E5', color: '#000', fontWeight: '900' }}>2nd Installment</th>
                                            <th style={{ width: '15%', background: '#F7FAFC', color: '#000', fontWeight: '900' }}>3rd Installment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td rowSpan={3} className="faculty-label">Medicine</td>
                                            <td>A</td>
                                            <td>291,000</td>
                                            <td style={{ color: '#E53E3E', fontWeight: 'bold' }}>16%</td>
                                            <td className="total-cell">243,600</td>
                                            <td>130,000</td>
                                            <td style={{ background: 'rgba(212, 175, 55, 0.03)' }}>56,800</td>
                                            <td style={{ background: 'rgba(78, 64, 153, 0.02)' }}>56,800</td>
                                        </tr>
                                        <tr>
                                            <td>B</td>
                                            <td>291,000</td>
                                            <td style={{ color: '#E53E3E', fontWeight: 'bold' }}>11%</td>
                                            <td className="total-cell">258,900</td>
                                            <td>137,000</td>
                                            <td style={{ background: 'rgba(212, 175, 55, 0.03)' }}>60,950</td>
                                            <td style={{ background: 'rgba(78, 64, 153, 0.02)' }}>60,950</td>
                                        </tr>
                                        <tr>
                                            <td>C</td>
                                            <td>291,000</td>
                                            <td style={{ color: '#E53E3E', fontWeight: 'bold' }}>9%</td>
                                            <td className="total-cell">264,600</td>
                                            <td>140,000</td>
                                            <td style={{ background: 'rgba(212, 175, 55, 0.03)' }}>62,300</td>
                                            <td style={{ background: 'rgba(78, 64, 153, 0.02)' }}>62,300</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* SECTION: International Students Section (USD) */}
                    <div className="reveal" style={{ marginBottom: '60px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginBottom: '30px',
                            borderLeft: '5px solid var(--gold)',
                            paddingLeft: '15px'
                        }}>
                            <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: 'var(--navy)', margin: 0 }}>International Students (USD)</h3>
                        </div>

                        <div className="portal-rich-content">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                                <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderTop: '5px solid var(--navy)' }}>
                                    <h4 style={{ color: 'var(--navy)', margin: '0 0 10px 0', border: 'none', padding: 0 }}>Faculty of Medicine</h4>
                                    <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'black' }}>6,000 <span style={{ fontSize: '1rem', color: '#666' }}>USD / Year</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION: Scholarships & Financial Aid */}
                    <div className="reveal" id="scholarships">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginBottom: '30px',
                            borderLeft: '5px solid var(--gold)',
                            paddingLeft: '15px'
                        }}>
                            <h3 style={{ fontSize: '2rem', color: 'var(--navy)', margin: 0 }}>Scholarships</h3>
                        </div>

                        <div className="portal-rich-content">
                            <p style={{ fontSize: '1.15rem', marginBottom: '30px' }}>UEC offers scholarships for students, kindly contact the hotline <strong>17523</strong> for more information.</p>

                            <div style={{ padding: '30px', background: 'var(--navy)', borderRadius: '12px', textAlign: 'center', color: 'white' }}>
                                <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>For scholarship inquiries, contact the UEC hotline:</p>
                                <a href="tel:17523" style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--gold)', textDecoration: 'none', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    17523
                                </a>
                            </div>
                        </div>
                    </div>


                    {/* How to Pay Section */}
                    <div className="reveal" style={{ marginTop: '80px', textAlign: 'center' }}>
                        <div style={{ background: 'var(--navy)', color: 'white', padding: '50px', borderRadius: '20px' }}>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Ready to Begin Your Journey?</h3>
                            <p style={{ marginBottom: '30px', opacity: 0.9 }}>To secure payments & scholarship inquiries, or to discuss installment schedules with our finance team, please visit the Admission Portal.</p>
                            <Link href="https://apply.uec.edu.eg" className="nav-cta" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--navy)' }}>
                                Proceed to Admission Portal →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
