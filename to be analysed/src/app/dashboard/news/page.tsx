import React from 'react';
import prisma from '@/lib/db';
import Link from 'next/link';

export default async function ManageNewsPage() {
    const news = await prisma.newsPost.findMany({
        orderBy: { createdAt: 'desc' },
        include: { author: true },
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <div className="section-tag">Content Management</div>
                    <h1 className="section-title">Manage News</h1>
                </div>
                <Link href="/dashboard/news/new" className="nav-cta" style={{ margin: 0 }}>+ Create New Post</Link>
            </div>

            <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid var(--border)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Title</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Author</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Status</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Date</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>No news posts found.</td>
                            </tr>
                        ) : (
                            news.map((post: any) => (
                                <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--navy)' }}>{post.title}</td>
                                    <td style={{ padding: '16px' }}>{post.author.name}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            background: post.published ? '#dcfce7' : '#fee2e2',
                                            color: post.published ? '#166534' : '#991b1b'
                                        }}>
                                            {post.published ? 'PUBLISHED' : 'DRAFT'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', color: 'var(--muted)' }}>{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '16px' }}>
                                        <Link href={`/dashboard/news/edit/${post.id}`} style={{ color: 'var(--blue)', textDecoration: 'none', marginRight: '12px', fontSize: '13px' }}>Edit</Link>
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
