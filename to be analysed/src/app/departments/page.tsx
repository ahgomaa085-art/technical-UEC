import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import prisma from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DepartmentsPage() {
    const departments = await prisma.department.findMany({
        orderBy: { order: 'asc' },
    });

    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Our Departments"
                subtitle="Exploring the diverse academic disciplines at UEC."
            />
            <section className="section">
                {departments.length === 0 ? (
                    <div className="reveal">
                        <p className="section-sub">No departments found. Please check back later or seed the database.</p>
                    </div>
                ) : (
                    <div className="schools-grid reveal">
                        {departments.map((dept) => (
                            <Link key={dept.id} href={`/departments/${dept.slug}`} className="school-card">
                                <div className="school-icon-wrap">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    </svg>
                                </div>
                                <div className="school-name">{dept.name}</div>
                                <div className="school-desc">{dept.description}</div>
                                <div className="school-link">Explore Department →</div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
