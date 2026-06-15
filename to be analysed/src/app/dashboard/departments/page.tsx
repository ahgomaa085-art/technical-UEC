import React from 'react';
import prisma from '@/lib/db';
import Link from 'next/link';

export default async function ManageDepartmentsPage() {
    const departments = await prisma.department.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { courses: true } } },
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <div className="section-tag">Academic Management</div>
                    <h1 className="section-title">Departments</h1>
                </div>
                <Link href="/dashboard/departments/new" className="nav-cta" style={{ margin: 0 }}>+ Add Department</Link>
            </div>

            <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid var(--border)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Name</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Head</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Courses</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Slug</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>No departments found.</td>
                            </tr>
                        ) : (
                            departments.map((dept: any) => (
                                <tr key={dept.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>{dept.name}</td>
                                    <td style={{ padding: '16px' }}>{dept.headOfDepartment || 'N/A'}</td>
                                    <td style={{ padding: '16px' }}>{dept._count.courses}</td>
                                    <td style={{ padding: '16px', color: 'var(--muted)', fontSize: '12px' }}>{dept.slug}</td>
                                    <td style={{ padding: '16px' }}>
                                        <Link href={`/dashboard/departments/edit/${dept.id}`} style={{ color: 'var(--blue)', textDecoration: 'none', marginRight: '12px', fontSize: '13px' }}>Edit</Link>
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
