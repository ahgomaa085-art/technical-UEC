'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: '',
        metaDescription: '',
        metaKeywords: '',
        contactEmail: '',
        contactPhone: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                setSettings(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                setMessage('Settings updated successfully!');
                router.refresh();
            } else {
                setMessage('Failed to update settings.');
            }
        } catch (err) {
            setMessage('An error occurred.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', color: 'var(--navy)', fontWeight: 700 }}>SEO & Site Settings</h1>
                    <p style={{ color: 'var(--ink-light)', marginTop: '4px' }}>Manage global metadata and contact information</p>
                </div>
            </div>

            {message && (
                <div style={{
                    padding: '16px',
                    borderRadius: '8px',
                    background: message.includes('success') ? '#ecfdf5' : '#fef2f2',
                    color: message.includes('success') ? '#065f46' : '#991b1b',
                    marginBottom: '24px',
                    border: `1px solid ${message.includes('success') ? '#10b981' : '#ef4444'}`
                }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'grid', gap: '24px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--navy)' }}>Site Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={settings.siteName}
                            onChange={e => setSettings({ ...settings, siteName: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--navy)' }}>Meta Description (SEO)</label>
                        <textarea
                            className="form-input"
                            style={{ height: '100px', resize: 'vertical' }}
                            value={settings.metaDescription}
                            onChange={e => setSettings({ ...settings, metaDescription: e.target.value })}
                            required
                        />
                        <p style={{ fontSize: '12px', color: 'var(--ink-light)', marginTop: '4px' }}>Recommended: 150-160 characters for search engines.</p>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--navy)' }}>Keywords (SEO)</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. university, education, egypt"
                            value={settings.metaKeywords}
                            onChange={e => setSettings({ ...settings, metaKeywords: e.target.value })}
                        />
                    </div>

                    <div style={{ height: '1px', background: '#e2e8f0', margin: '12px 0' }} />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--navy)' }}>Contact Email</label>
                            <input
                                type="email"
                                className="form-input"
                                value={settings.contactEmail || ''}
                                onChange={e => setSettings({ ...settings, contactEmail: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--navy)' }}>Contact Phone</label>
                            <input
                                type="text"
                                className="form-input"
                                value={settings.contactPhone || ''}
                                onChange={e => setSettings({ ...settings, contactPhone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--navy)' }}>Office Address</label>
                        <input
                            type="text"
                            className="form-input"
                            value={settings.address || ''}
                            onChange={e => setSettings({ ...settings, address: e.target.value })}
                        />
                    </div>

                    <div style={{ marginTop: '12px' }}>
                        <button type="submit" className="btn btn-gold" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </div>
            </form>

            <style jsx>{`
                .form-input {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: border-color 0.2s;
                }
                .form-input:focus {
                    outline: none;
                    border-color: var(--gold);
                }
            `}</style>
        </div>
    );
}
