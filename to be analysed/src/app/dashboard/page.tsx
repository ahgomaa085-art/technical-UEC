import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect('/auth/login');
    }

    const role = (session.user as any)?.role || 'STAFF';

    const getGreeting = () => {
        if (role === 'RECRUITER') return 'HR Recruitment Command Center';
        if (role === 'MARKETING') return 'Marketing & CRM Intelligence';
        return 'UEC Staff Portal';
    };

    const getDescription = () => {
        if (role === 'RECRUITER') return 'Manage academic and administrative applications, track recruitment KPIs, and oversee the university talent pipeline.';
        if (role === 'MARKETING') return 'Monitor lead generation performance, track website traffic, and analyze geographical visitor data.';
        return 'Manage university news, events, departments, and other core academic content.';
    };

    return (
        <div>
            <div className="section-tag">{getGreeting()}</div>
            <h1 className="section-title">Welcome back, {session.user?.name || 'Staff Member'}</h1>
            <p className="section-sub">
                {getDescription()}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '48px' }}>
                {role === 'RECRUITER' ? (
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid #eef2f6', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Active Applications</div>
                        <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--navy)' }}>Pipeline Live</div>
                    </div>
                ) : (
                    <>
                        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>News Posts</div>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--navy)' }}>--</div>
                        </div>
                        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Active Events</div>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--navy)' }}>--</div>
                        </div>
                    </>
                )}
                <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>System Status</div>
                    <div style={{ fontSize: '32px', fontWeight: 800, color: '#2ecc71' }}>Online</div>
                </div>
            </div>
        </div>
    );
}
