import React from 'react';
import prisma from '@/lib/db';
import Link from 'next/link';

export default async function ManageEventsPage() {
    const events = await prisma.event.findMany({
        orderBy: { startDate: 'asc' },
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <div className="section-tag">Content Management</div>
                    <h1 className="section-title">Manage Events</h1>
                </div>
                <Link href="/dashboard/events/new" className="nav-cta" style={{ margin: 0 }}>+ Create New Event</Link>
            </div>

            <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid var(--border)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Event Title</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Start Date</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Location</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Status</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>No events found.</td>
                            </tr>
                        ) : (
                            events.map((event: any) => (
                                <tr key={event.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>{event.title}</td>
                                    <td style={{ padding: '16px' }}>{new Date(event.startDate).toLocaleDateString()}</td>
                                    <td style={{ padding: '16px' }}>{event.location}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            background: event.published ? '#dcfce7' : '#fee2e2',
                                            color: event.published ? '#166534' : '#991b1b'
                                        }}>
                                            {event.published ? 'PUBLISHED' : 'DRAFT'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <Link href={`/dashboard/events/edit/${event.id}`} style={{ color: 'var(--blue)', textDecoration: 'none', marginRight: '12px', fontSize: '13px' }}>Edit</Link>
                                        <button style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
