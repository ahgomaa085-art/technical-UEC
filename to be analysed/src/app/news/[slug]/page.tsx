import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.newsPost.findUnique({
        where: { slug: slug },
        select: { title: true, excerpt: true }
    });

    if (!post) return {};

    return {
        title: `${post.title} | UEC News`,
        description: post.excerpt || `Read the latest news from University of East Capital: ${post.title}`,
    };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.newsPost.findUnique({
        where: { slug: slug },
        include: { author: true },
    });

    if (!post) notFound();

    return (
        <main>
            <RevealScript />
            <PageHeader
                title={post.title}
                subtitle={`Published on ${new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
            />
            <section className="section" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="reveal">
                    <div className="section-tag">Published by {post.author.name}</div>
                    <div className="section-sub" style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--navy)', marginBottom: '32px' }}>
                        {post.excerpt}
                    </div>
                    <div className="section-sub" style={{ fontSize: '16px', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: post.content }}>
                    </div>
                </div>
            </section>
        </main>
    );
}
