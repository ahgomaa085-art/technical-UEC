'use client';

import React from 'react';
import Link from 'next/link';

const ApplyBand = () => {
    return (
        <section className="apply-band" id="admissions" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="apply-content reveal" style={{ maxWidth: '800px' }}>
                <h2 className="apply-title">Start Your Journey at UEC</h2>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-apply-modal'))}
                    className="btn-hero-white"
                    style={{ marginTop: '32px', display: 'inline-block', cursor: 'pointer', border: 'none' }}
                >
                    Apply Now
                </button>
            </div>
            <div className="apply-footer" style={{ marginTop: '40px' }}>
                Applications open · 2026/2027 academic year
            </div>
        </section>
    );
};

export default ApplyBand;
