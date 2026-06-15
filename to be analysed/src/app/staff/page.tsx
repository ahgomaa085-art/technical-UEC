import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import prisma from '@/lib/db';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function StaffDirectoryPage() {
    const staff = await prisma.user.findMany({
        where: { role: { in: ['ADMIN', 'STAFF'] } },
        orderBy: { name: 'asc' },
    });

    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Staff Directory"
                subtitle="Meet the leaders, educators, and visionaries at UEC."
            />
            <section className="section">
                {staff.length === 0 ? (
                    <div className="reveal">
                        <p className="section-sub">No staff members listed yet. Directory is being updated for the new academic year.</p>
                    </div>
                ) : (
                    <div className="schools-grid reveal">
                        {staff.map((person) => (
                            <div key={person.id} className="school-card" style={{ textAlign: 'center' }}>
                                <div className="school-icon-wrap" style={{ margin: '0 auto 16px', width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
                                    {person.avatarUrl ? (
                                        <img src={person.avatarUrl} alt={person.name || 'Staff'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, color: 'var(--navy)' }}>
                                            {(person.name || 'U').charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="school-name">{person.name || 'Anonymous User'}</div>
                                <div className="school-desc">{person.department || 'Administration'}</div>
                                <div className="school-link" style={{ justifyContent: 'center' }}>{person.role}</div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
