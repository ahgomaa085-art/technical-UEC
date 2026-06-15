import React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const role = (session?.user as any)?.role || 'STAFF';

    const isAdmin = role === 'ADMIN';
    const isHR = role === 'RECRUITER' || isAdmin;
    const isMarketing = role === 'MARKETING' || isAdmin;
    const isContentStaff = role === 'STAFF' || isAdmin;

    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 150px)', background: '#f8fafc' }}>
            <aside style={{ width: '280px', background: 'var(--navy)', color: '#fff', padding: '40px 24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '32px', color: 'var(--gold-lt)', textTransform: 'uppercase', letterSpacing: '1px' }}>Staff Portal</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none', padding: '12px 16px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>Overview</Link>

                    {isMarketing && (
                        <Link href="/dashboard/crm" style={{ color: '#fff', textDecoration: 'none', padding: '14px 16px', borderRadius: '12px', background: 'linear-gradient(90deg, #c5a358, #b08d3e)', fontWeight: '800', marginBottom: '8px', boxShadow: '0 4px 12px rgba(197,163,88,0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>📊</span> CRM Intel Dashboard
                        </Link>
                    )}

                    {isHR && (
                        <Link href="/dashboard/hr" style={{ color: '#fff', textDecoration: 'none', padding: '14px 16px', borderRadius: '12px', background: 'linear-gradient(90deg, #0a1f3c, #1a3c6c)', fontWeight: '800', marginBottom: '16px', border: '1px solid rgba(197,163,88,0.5)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>👥</span> HR Recruitment Suite
                        </Link>
                    )}

                    {isContentStaff && (
                        <>
                            <Link href="/dashboard/news" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '12px 16px', borderRadius: '4px' }}>Manage News</Link>
                            <Link href="/dashboard/events" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '12px 16px', borderRadius: '4px' }}>Manage Events</Link>
                            <Link href="/dashboard/videos" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '12px 16px', borderRadius: '4px' }}>Video Library</Link>
                        </>
                    )}

                    {isMarketing && (
                        <>
                            <Link href="/dashboard/messages" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '12px 16px', borderRadius: '4px' }}>View Messages</Link>
                            <Link href="/dashboard/analytics" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '12px 16px', borderRadius: '4px' }}>🌍 Traffic & Geo</Link>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <Link href="/dashboard/departments" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '12px 16px', borderRadius: '4px' }}>Departments</Link>
                            <Link href="/dashboard/staff" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '12px 16px', borderRadius: '4px' }}>Directory</Link>
                            <Link href="/dashboard/settings" style={{ color: 'var(--gold-lt)', textDecoration: 'none', padding: '12px 16px', borderRadius: '4px', marginTop: '12px', border: '1px solid rgba(212,175,55,0.3)' }}>SEO Settings</Link>
                        </>
                    )}

                    <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                        <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '13px' }}>← Back to Website</Link>
                    </div>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: '48px' }}>
                {children}
            </main>
        </div>
    );
}
