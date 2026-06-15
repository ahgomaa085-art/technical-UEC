"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getVisitorJourney } from '@/utils/tracking';

export default function ApplyNowModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [leadId, setLeadId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        faculty: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    // Listen for custom event to open modal from anywhere
    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            trackEvent({ status: 'STARTED' }); // Log initial open
        };
        window.addEventListener('open-apply-modal', handleOpen);
        return () => window.removeEventListener('open-apply-modal', handleOpen);
    }, []);

    // Tracking function
    const trackEvent = async (data: any) => {
        try {
            // Capture attribution and technical metadata
            const urlParams = new URLSearchParams(window.location.search);
            const attribution = {
                source: urlParams.get('utm_source') || document.referrer || 'Direct',
                medium: urlParams.get('utm_medium') || '',
                campaign: urlParams.get('utm_campaign') || '',
                content: urlParams.get('utm_content') || '',
                term: urlParams.get('utm_term') || '',
                referralUrl: document.referrer,
                entryPath: window.location.pathname,
                conversionPath: window.location.pathname,
                ua: navigator.userAgent,
                device: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
                journey: getVisitorJourney(),
            };

            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    ...attribution,
                    id: leadId,
                }),
            });
            const result = await response.json();
            if (result.id && !leadId) {
                setLeadId(result.id);
            }
            return result.id;
        } catch (error) {
            console.error('Tracking failed', error);
        }
    };

    const handleClose = async () => {
        // If data was being typed but not finished
        const hasSomeData = formData.name || formData.email || formData.phone || formData.faculty;

        if (hasSomeData) {
            await trackEvent({ ...formData, status: 'PARTIAL' });
        } else {
            await trackEvent({ status: 'DISMISSED' });
        }

        setIsOpen(false);
    };

    // Debounced tracking for form inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            trackEvent({ ...newFormData, status: 'PARTIAL' });
        }, 1000);
    };

    const handleContinue = async () => {
        setIsSubmitting(true);
        const isComplete = formData.name && formData.email && formData.phone && formData.faculty;

        const status = isComplete ? 'COMPLETED' : 'OFFICIAL_REDIRECT';
        await trackEvent({ ...formData, status });

        // Short delay for the "Syncing" state to be visible
        setTimeout(() => {
            window.location.href = 'https://apply.uec.edu.eg/#/registration';
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <div className="apply-modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
        }}>
            <div className="apply-modal-box">
                <button
                    onClick={handleClose}
                    className="apply-modal-close"
                    aria-label="Close"
                >
                    ✕
                </button>

                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--gold)', borderRadius: '100px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
                        Admission Portal
                    </div>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px', lineHeight: '1.2' }}>
                        Start Your <em>Journey</em>
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
                        Fill in your basic details below to proceed to the official application system.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase' }}>Full Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Student's Legal Name"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase' }}>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="example@email.com"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase' }}>Phone Number (WhatsApp)</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+20 XXX XXX XXXX"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase' }}>Faculty of Interest</label>
                        <select
                            name="faculty"
                            value={formData.faculty}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#fff', fontSize: '15px' }}
                        >
                            <option value="">Select a Faculty</option>
                            <option value="medicine">Faculty of Medicine</option>
                            <option value="business">Faculty of Business & Economics</option>
                            <option value="cs">Faculty of Computer Science & Information Technology</option>
                            <option value="physical-therapy">Faculty of Physical Therapy</option>
                        </select>
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: 'var(--navy)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            marginTop: '8px',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            fontSize: '15px'
                        }}
                    >
                        {isSubmitting ? 'Syncing...' : 'Continue to Official Application →'}
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                        By continuing, your basic contact info will be securely shared with the UEC Admissions Office.
                    </p>
                </div>
            </div>
        </div>
    );
}
