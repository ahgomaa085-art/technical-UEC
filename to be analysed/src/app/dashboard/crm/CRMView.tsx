"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface LeadInteraction {
    id: string;
    type: string;
    value: string;
    createdAt: string;
}

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    faculty: string;
    status: string;
    source: string;
    medium: string;
    campaign: string;
    device: string;
    browser: string;
    os: string;
    ip: string;
    country: string;
    city: string;
    referralUrl: string;
    entryPath: string;
    conversionPath: string;
    createdAt: string;
    interactions: LeadInteraction[];
}

export default function CRMView({ initialLeads }: { initialLeads: Lead[] }) {
    const [leads] = useState<Lead[]>(initialLeads);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [filter, setFilter] = useState('ALL');

    const filteredLeads = filter === 'ALL' ? leads : leads.filter(l => l.status === filter);

    const stats = {
        total: leads.length,
        completed: leads.filter(l => l.status === 'COMPLETED').length,
        officialRedirect: leads.filter(l => l.status === 'OFFICIAL_REDIRECT').length,
        partial: leads.filter(l => l.status === 'PARTIAL').length,
        dismissed: leads.filter(l => l.status === 'DISMISSED').length,
        conversionRate: leads.length > 0 ? Math.round((leads.filter(l => l.status === 'COMPLETED').length / leads.length) * 100) : 0
    };

    const facultyStats = leads.reduce((acc: any, lead) => {
        const fac = lead.faculty || 'Unknown';
        acc[fac] = (acc[fac] || 0) + 1;
        return acc;
    }, {});

    const getFlag = (countryCode: string) => {
        if (!countryCode || countryCode === 'Unknown') return '🌐';
        try {
            const codePoints = countryCode
                .toUpperCase()
                .split('')
                .map(char => 127397 + char.charCodeAt(0));
            return String.fromCodePoint(...codePoints);
        } catch (e) { return '🌐'; }
    };

    return (
        <div style={{ paddingBottom: '100px', fontFamily: '"Lato", sans-serif' }}>
            <style dangerouslySetInnerHTML={{
                __html: `
                .crm-card {
                    background: #fff;
                    border: 1px solid #eef2f6;
                    border-radius: 20px;
                    padding: 24px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
                    transition: transform 0.2s;
                }
                .crm-card:hover { transform: translateY(-4px); }
                .stat-value { font-size: 32px; font-weight: 800; margin: 10px 0; color: #0a1f3c; }
                .stat-label { font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
                .lead-status { padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 800; text-transform: uppercase; }
                .status-completed { background: #dcfce7; color: #166534; }
                .status-partial { background: #fef9c3; color: #854d0e; }
                .status-official_redirect { background: #e0f2fe; color: #075985; }
                .status-dismissed { background: #f1f5f9; color: #64748b; }
                .status-started { background: #f8fafc; color: #94a3b8; }
                .timeline-item { position: relative; padding-left: 24px; margin-bottom: 20px; border-left: 2px solid #e2e8f0; }
                .timeline-item::before { content: ''; position: absolute; left: -7px; top: 0; width: 12px; height: 12px; border-radius: 50%; background: #c5a358; border: 2px solid #fff; }
                .faculty-bar { height: 8px; border-radius: 10px; background: #f1f5f9; overflow: hidden; margin-top: 8px; }
                .faculty-progress { height: 100%; background: linear-gradient(90deg, #0a1f3c, #c5a358); }
            `}} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                <div>
                    <div style={{ color: '#c5a358', fontWeight: 800, fontSize: '14px', marginBottom: '8px' }}>CRM ADMISSIONS DASHBOARD</div>
                    <h1 style={{ color: '#0a1f3c', fontSize: '36px', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>Student Inquiry Intelligence</h1>
                    <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>Real-time behavioral insights and marketing attribution for UEC.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: 600, outline: 'none' }}
                    >
                        <option value="ALL">All Interaction States</option>
                        <option value="COMPLETED">Full Registration</option>
                        <option value="PARTIAL">Partial Interest</option>
                        <option value="OFFICIAL_REDIRECT">Official Passthrough</option>
                        <option value="DISMISSED">Modal Bounce</option>
                    </select>
                </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
                <div className="crm-card">
                    <div className="stat-label">Total Pipeline</div>
                    <div className="stat-value">{stats.total}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Active leads in current cycle</div>
                </div>
                <div className="crm-card">
                    <div className="stat-label">Conversion Rate</div>
                    <div className="stat-value" style={{ color: '#166534' }}>{stats.conversionRate}%</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Open-to-Apply Efficiency</div>
                </div>
                <div className="crm-card">
                    <div className="stat-label">Official Passthroughs</div>
                    <div className="stat-value" style={{ color: '#075985' }}>{stats.officialRedirect}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Clicked portal without registration</div>
                </div>
                <div className="crm-card">
                    <div className="stat-label">Modal Bounces</div>
                    <div className="stat-value" style={{ color: '#64748b' }}>{stats.dismissed}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Opened but closed immediately</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                {/* Main Table */}
                <div className="crm-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0a1f3c', margin: 0 }}>Lead Management</h2>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #eef2f6' }}>
                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Student</th>
                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Faculty</th>
                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Source</th>
                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                                    <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map(lead => (
                                    <tr key={lead.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ fontWeight: 800, color: '#0a1f3c' }}>{lead.name || 'Incognito User'}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>{lead.email}</div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ fontSize: '13px', fontWeight: 600 }}>{lead.faculty}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{getFlag(lead.country)} {lead.city}</div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0a1f3c' }}>{lead.source}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{lead.device} • {lead.medium || 'organic'}</div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <span className={`lead-status status-${lead.status.toLowerCase()}`}>{lead.status}</span>
                                        </td>
                                        <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                            <button
                                                onClick={() => setSelectedLead(lead)}
                                                style={{ padding: '8px 16px', borderRadius: '10px', background: '#0a1f3c', color: '#fff', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                                            >
                                                Analyze Journey
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar Metrics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div className="crm-card">
                        <h3 className="stat-label" style={{ marginBottom: '20px' }}>Faculty Interest Share</h3>
                        {Object.entries(facultyStats).map(([fac, count]: any) => (
                            <div key={fac} style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                                    <span>{fac}</span>
                                    <span style={{ color: '#c5a358' }}>{count}</span>
                                </div>
                                <div className="faculty-bar">
                                    <div className="faculty-progress" style={{ width: `${(count / leads.length) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="crm-card" style={{ background: 'linear-gradient(135deg, #0a1f3c 0%, #1a3c6c 100%)', color: '#fff' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 12px 0' }}>Marketing ROI</h3>
                        <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '20px' }}>Top performing channels by conversion volume.</p>
                        {Array.from(new Set(leads.map(l => l.source))).slice(0, 3).map(src => (
                            <div key={src} style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '8px', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{src || 'Direct'}</span>
                                <span style={{ fontWeight: 800, color: '#c5a358' }}>HIGH</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lead Detail Modal */}
            {selectedLead && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,31,60,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(10px)' }}>
                    <div style={{ background: '#fff', width: '90%', maxWidth: '900px', maxHeight: '80vh', borderRadius: '30px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '350px 1fr', boxShadow: '0 50px 100px rgba(0,0,0,0.5)' }}>
                        <div style={{ padding: '40px', background: '#f8fafc', borderRight: '1px solid #e2e8f0' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '25px', background: '#0a1f3c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#fff', marginBottom: '24px', fontWeight: 900 }}>
                                {selectedLead.name?.[0] || '?'}
                            </div>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0a1f3c', margin: '0 0 8px 0' }}>{selectedLead.name || 'Anonymous User'}</h2>
                            <div style={{ color: '#c5a358', fontWeight: 800, fontSize: '14px', marginBottom: '24px' }}>Potential {selectedLead.faculty} Student</div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>EMAIL</div>
                                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0a1f3c', marginBottom: '16px' }}>{selectedLead.email}</div>

                                <div style={{ fontSize: '13px', color: '#64748b' }}>UTM SOURCE</div>
                                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0a1f3c', marginBottom: '16px' }}>{selectedLead.source}</div>

                                <div style={{ fontSize: '13px', color: '#64748b' }}>DEVICE / OS</div>
                                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0a1f3c', marginBottom: '16px' }}>{selectedLead.device} ({selectedLead.os || 'Unknown OS'})</div>

                                <Link
                                    href={`https://wa.me/${selectedLead.phone}`}
                                    style={{ display: 'block', padding: '16px', background: '#25D366', color: '#fff', textAlign: 'center', borderRadius: '15px', textDecoration: 'none', fontWeight: 800, marginTop: '40px' }}
                                >
                                    Quick WhatsApp Connect
                                </Link>
                            </div>
                        </div>
                        <div style={{ padding: '40px', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0a1f3c', margin: 0 }}>Behavioral Journey Timeline</h3>
                                <button onClick={() => setSelectedLead(null)} style={{ background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Close Analysis</button>
                            </div>

                            <div style={{ padding: '20px 0' }}>
                                {selectedLead.interactions && selectedLead.interactions.length > 0 ? (
                                    selectedLead.interactions.map((event, idx) => (
                                        <div key={idx} className="timeline-item">
                                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8' }}>{new Date(event.createdAt).toLocaleTimeString()}</div>
                                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0a1f3c' }}>{event.type.replace('_', ' ')}</div>
                                            <div style={{ fontSize: '13px', color: '#64748b', wordBreak: 'break-all' }}>{event.value}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                                        No behavioral data found for this session.
                                    </div>
                                )}

                                <div className="timeline-item" style={{ borderLeftColor: 'transparent' }}>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#c5a358' }}>CONVERSION MOMENT</div>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0a1f3c' }}>
                                        {selectedLead.status === 'COMPLETED' ? 'Form Submitted' :
                                            selectedLead.status === 'OFFICIAL_REDIRECT' ? 'Direct Portal Access' :
                                                selectedLead.status === 'PARTIAL' ? 'Session Abandoned (Partial)' :
                                                    'Modal Dismissed'}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>Current Status: {selectedLead.status}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
