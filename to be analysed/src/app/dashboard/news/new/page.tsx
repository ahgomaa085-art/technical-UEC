"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateNewsPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Placeholder for Phase 9 API call
        console.log({ title, content, published });

        setTimeout(() => {
            alert('News post created (simulated)');
            router.push('/dashboard/news');
        }, 1000);
    };

    return (
        <div>
            <div className="section-tag">Content Management</div>
            <h1 className="section-title">Create New Post</h1>

            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Title</label>
                    <input
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Content (Markdown supported)</label>
                    <textarea
                        required
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none', resize: 'vertical' }}
                    ></textarea>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        id="published"
                    />
                    <label htmlFor="published" style={{ fontSize: '14px', fontWeight: 600 }}>Publish immediately</label>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        disabled={loading}
                        className="nav-cta"
                        type="submit"
                        style={{ margin: 0, border: 'none', cursor: 'pointer' }}
                    >
                        {loading ? 'Saving...' : 'Create Post →'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        style={{ padding: '11px 22px', border: '1px solid var(--border)', borderRadius: '3px', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px' }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNewsPage;
