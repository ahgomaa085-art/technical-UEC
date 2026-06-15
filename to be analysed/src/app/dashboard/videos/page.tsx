import React from 'react';
import prisma from '@/lib/db';
import Link from 'next/link';

export default async function ManageVideosPage() {
    const videos = await prisma.video.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <div className="section-tag">Media Management</div>
                    <h1 className="section-title">Video Library</h1>
                </div>
                <Link href="/dashboard/videos/new" className="nav-cta" style={{ margin: 0 }}>+ Upload Video</Link>
            </div>

            <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid var(--border)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Title</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Category</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Upload Date</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Status</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>No videos found.</td>
                            </tr>
                        ) : (
                            videos.map((video: any) => (
                                <tr key={video.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>{video.title}</td>
                                    <td style={{ padding: '16px' }}>{video.category}</td>
                                    <td style={{ padding: '16px', color: 'var(--muted)' }}>{new Date(video.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            background: video.published ? '#dcfce7' : '#fee2e2',
                                            color: video.published ? '#166534' : '#991b1b'
                                        }}>
                                            {video.published ? 'PUBLISHED' : 'DRAFT'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <Link href={`/dashboard/videos/edit/${video.id}`} style={{ color: 'var(--blue)', textDecoration: 'none', marginRight: '12px', fontSize: '13px' }}>Edit</Link>
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
