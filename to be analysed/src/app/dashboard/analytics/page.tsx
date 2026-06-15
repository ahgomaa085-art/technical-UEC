import React from 'react';
import prisma from '@/lib/db';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
    const session = await auth();

    if (!session) {
        redirect('/auth/login');
    }

    // Fetch the latest 50 application leads
    let leads: any[] = [];
    try {
        leads = await (prisma as any).leadCapture.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 50,
        });
    } catch (e) {
        console.error("LeadCapture table not found or query failed", e);
    }

    // Fetch the latest 100 visitors
    let visitors: any[] = [];
    try {
        visitors = await prisma.visitorLog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 100,
        });
    } catch (e) {
        console.error("VisitorLog query failed", e);
    }

    // Helper to get country flag (using emoji)
    const getFlag = (countryCode: string) => {
        if (!countryCode || countryCode === 'Unknown') return '🌐';
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    return (
        <div style={{ paddingBottom: '80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <div className="section-tag">CRM / Visual Insights</div>
                    <h1 className="section-title">Visitor & Lead Analytics</h1>
                    <p className="section-sub">Comprehensive tracking of both general visitors and potential student application leads.</p>
                </div>
                <div style={{ background: 'var(--navy)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', boxShadow: '0 4px 12px rgba(10,31,60,0.15)' }}>
                    Total Leads: {leads.length}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Application Leads</div>
                    <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--gold)' }}>{leads.length}</div>
                </div>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Conversion Rate</div>
                    <div style={{ fontSize: '36px', fontWeight: 800, color: '#10b981' }}>
                        {leads.length > 0 ? Math.round((leads.filter((l: any) => l.status === 'COMPLETED').length / leads.length) * 100) : 0}%
                    </div>
                </div>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>General Traffic</div>
                    <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--navy)' }}>{visitors.length}</div>
                </div>
            </div>

            {/* Application Leads Table */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '48px' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>Application Lead Pipeline</h3>
                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Direct Student Inquiries via "Apply Now"</div>
                    </div>
                    <Link
                        href="/api/leads/export"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#fff',
                            color: 'var(--navy)',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: '700',
                            textDecoration: 'none',
                            border: '1px solid var(--border)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            transition: 'all 0.2s'
                        }}
                    >
                        <span>📥</span> Export CSV
                    </Link>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Student Detail</th>
                                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Contact Info</th>
                                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Location</th>
                                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontSize: '15px' }}>
                                        <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎓</div>
                                        No application leads captured yet.
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead: any) => (
                                    <tr key={lead.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                                        <td style={{ padding: '18px 24px' }}>
                                            <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{lead.name || 'Anonymous Student'}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'capitalize' }}>Faculty: {lead.faculty || 'Unselected'}</div>
                                        </td>
                                        <td style={{ padding: '18px 24px' }}>
                                            <div style={{ fontSize: '13px', color: 'var(--navy)' }}>{lead.email || 'No Email'}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{lead.phone || 'No Phone'}</div>
                                        </td>
                                        <td style={{ padding: '18px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '20px' }}>{getFlag(lead.country || '')}</span>
                                                <div style={{ fontSize: '12px', color: 'var(--navy)' }}>{lead.city}, {lead.country}</div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '18px 24px' }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '100px',
                                                fontSize: '11px',
                                                fontWeight: 800,
                                                background: lead.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.1)' : lead.status === 'PARTIAL' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                                                color: lead.status === 'COMPLETED' ? '#10b981' : lead.status === 'PARTIAL' ? '#f59e0b' : '#64748b'
                                            }}>
                                                {lead.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>Global Visitor Log</h3>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>General site traffic</div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Time</th>
                                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Location</th>
                                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>IP Address</th>
                                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Device / OS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitors.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)', fontSize: '15px' }}>
                                        <div style={{ fontSize: '32px', marginBottom: '16px' }}>📍</div>
                                        Waiting for first visitor data.
                                    </td>
                                </tr>
                            ) : (
                                visitors.map((v: any) => (
                                    <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                                        <td style={{ padding: '18px 24px', fontSize: '14px', color: '#64748b' }}>
                                            {new Date(v.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td style={{ padding: '18px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '20px' }}>{getFlag(v.country || '')}</span>
                                                <div>
                                                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{v.city || 'Unknown City'}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{v.country || 'Global'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '18px 24px', fontSize: '13px', fontFamily: 'monospace', color: 'var(--navy)' }}>
                                            {v.ip}
                                        </td>
                                        <td style={{ padding: '18px 24px', fontSize: '12px', color: '#64748b', maxWidth: '250px' }}>
                                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={v.ua || ''}>
                                                {v.ua || 'Unknown Device'}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Link href="/dashboard" style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '6px' }}>
                    ← Back to Management Portal
                </Link>
            </div>
        </div>
    );
}
