import React from 'react';
import prisma from '@/lib/db';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ContactMessagesPage() {
    const session = await auth();

    if (!session) {
        redirect('/auth/login');
    }

    const messages = await prisma.contactMessage.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <div className="section-tag">CRM / Inquiries</div>
                    <h1 className="section-title">Student Inquiries</h1>
                    <p className="section-sub">Manage and respond to messages received through the contact forms.</p>
                </div>
                <div style={{ background: 'var(--navy)', color: 'white', padding: '12px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' }}>
                    Total: {messages.length}
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Date</th>
                            <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Sender</th>
                            <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Subject</th>
                            <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase' }}>Message</th>
                            <th style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--muted)', fontWeight: '700', textTransform: 'uppercase', textAlign: 'center' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)' }}>
                                    No messages found in the database.
                                </td>
                            </tr>
                        ) : (
                            messages.map((msg) => (
                                <tr key={msg.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#666' }}>
                                        {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '4px' }}>{msg.name}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{msg.email}</div>
                                    </td>
                                    <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>
                                        {msg.subject || 'General Inquiry'}
                                    </td>
                                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#444', maxWidth: '300px' }}>
                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={msg.message}>
                                            {msg.message}
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                                        {msg.read ? (
                                            <span style={{ background: '#e2e8f0', color: '#64748b', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>Read</span>
                                        ) : (
                                            <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>New</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <Link href="/dashboard" style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>
                    ← Back to Overview
                </Link>
            </div>
        </div>
    );
}
