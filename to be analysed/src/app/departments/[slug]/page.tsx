import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import FacultySwipeNavigator from '@/components/layout/FacultySwipeNavigator';
import RevealScript from '@/components/layout/RevealScript';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { facultyContentOverrides } from './facultyContent';
import TourTrigger from '@/components/ui/TourTrigger';

export const dynamic = 'force-dynamic';


// Static fallback data for known department slugs when DB is unreachable
const staticDepartmentFallbacks: Record<string, any> = {
    'research-main': {
        id: 'research-main-fallback',
        slug: 'research-main',
        name: 'Research & Innovation',
        description: 'Discover the Prototyping Research Center (PRC) — an interdisciplinary innovation hub at the University of East Capital.',
        type: 'DEPARTMENT',
        vision: null,
        mission: null,
        deanName: null,
        deanMessage: null,
        portalContents: [
            { id: 'prc-fallback', title: 'Prototype Center / Startups', slug: 'prototype-center', content: '', published: true, order: 1 }
        ],
        children: [],
        courses: [],
    },
    'about-main': {
        id: 'about-main-fallback',
        slug: 'about-main',
        name: 'About UEC',
        description: 'Learn about the University of East Capital.',
        type: 'DEPARTMENT',
        vision: null, mission: null, deanName: null, deanMessage: null,
        portalContents: [], children: [], courses: [],
    },
    'admissions': {
        id: 'admissions-fallback',
        slug: 'admissions',
        name: 'Admissions',
        description: 'Apply to the University of East Capital.',
        type: 'DEPARTMENT',
        vision: null, mission: null, deanName: null, deanMessage: null,
        portalContents: [], children: [], courses: [],
    },
    'student-life': {
        id: 'student-life-fallback',
        slug: 'student-life',
        name: 'Student Life',
        description: 'Experience student life at the University of East Capital.',
        type: 'DEPARTMENT',
        vision: null, mission: null, deanName: null, deanMessage: null,
        portalContents: [], children: [], courses: [],
    },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const department = await prisma.department.findUnique({
            where: { slug: slug },
            select: { name: true, description: true }
        });

        if (!department) {
            const fallback = staticDepartmentFallbacks[slug];
            if (fallback) return { title: `${fallback.name} | University of East Capital`, description: fallback.description };
            return {};
        }

        return {
            title: `${department.name} | University of East Capital`,
            description: department.description,
        };
    } catch {
        const fallback = staticDepartmentFallbacks[slug];
        if (fallback) return { title: `${fallback.name} | University of East Capital`, description: fallback.description };
        return {};
    }
}

export default async function DepartmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let department: any = null;

    try {
        // Fetch department WITHOUT include to avoid Prisma environment validation issues
        department = (await prisma.department.findUnique({
            where: { slug: slug }
        })) as any;

        if (department) {
            // Fetch relations manually
            department.portalContents = await (prisma as any).portalContent.findMany({
                where: { departmentId: department.id, published: true },
                orderBy: { order: 'asc' }
            });

            department.children = await (prisma as any).department.findMany({
                where: { parentId: department.id }
            });

            if (department.type === 'FACULTY') {
                department.courses = await prisma.course.findMany({
                    where: { departmentId: department.id }
                });
            } else {
                department.courses = [];
            }
        }
    } catch (error) {
        console.error("Failed to fetch department info:", error);
        // Use static fallback when database is unreachable
        if (staticDepartmentFallbacks[slug]) {
            department = { ...staticDepartmentFallbacks[slug] };
        }
    }

    if (!department) notFound();

    const requirementsUrlMap: Record<string, string> = {
        medicine: '/requirements/medicine',
        'physical-therapy': '/requirements/physical-therapy',
        'computer-sciences': '/requirements/computer-sciences',
        'business-economics': '/requirements/business-economics',
    };

    const facultyImageMap: Record<string, string> = {
        medicine: '/images/faculties/Medicine_v2.webp',
        'physical-therapy': '/images/faculties/Physical therapy_v2.webp',
        'computer-science': '/images/faculties/Computer Science_v2.webp',
        'business-economics': '/images/faculties/Economy_v2.webp',
        dentistry: '/images/faculties/Dental_v2.webp',
        pharmacy: '/images/faculties/Pharmacy_v2.webp',
        engineering: '/images/faculties/Engineering_v2.webp',
        'mass-communication': '/images/faculties/Mass communication_v2.webp',
        'art-design': '/images/faculties/Arts_v2.webp',
        'about-main': '/images/hero/about-uec-hero.webp',
        'admissions': '/images/hero/hero-2.webp',
        'research-main': '/images/hero/hero-2.webp',
        'student-life': '/images/hero/hero-2.webp',
    };

    return (
        <main>
            <RevealScript />
            {department.type === 'FACULTY' ? (
                <FacultySwipeNavigator currentSlug={slug}>
                    <PageHeader
                        title={department.name}
                        bgImage={facultyImageMap[slug]}
                    />
                </FacultySwipeNavigator>
            ) : (
                <PageHeader
                    title={department.name}
                    bgImage={facultyImageMap[slug]}
                />
            )}
            <section className="section">
                <div className="reveal">
                    <div className="section-tag">
                        {slug === 'about-main' ? 'University Overview' : `${department.type} Overview`}
                    </div>
                    <h2 className="section-title"><em>{department.name}</em></h2>
                    <p className="section-sub">{department.description}</p>
                </div>

                {(department.vision || department.mission) && (
                    <div className="reveal strategic-grid" style={{ marginTop: '40px' }}>
                        {department.vision && (
                            <div className="strategic-card">
                                <div className="strategic-icon">👁️</div>
                                <h3 className="strategic-title">Our Vision</h3>
                                <div className="strategic-text">{department.vision}</div>
                            </div>
                        )}
                        {department.mission && (
                            <div className="strategic-card">
                                <div className="strategic-icon">🎯</div>
                                <h3 className="strategic-title">Our Mission</h3>
                                <div className="strategic-text">{department.mission}</div>
                            </div>
                        )}
                    </div>
                )}

                {department.deanName && (
                    <div className="reveal exec-quote-wrap">
                        <div className="exec-quote-icon">“</div>
                        <div className="exec-quote-content">
                            <div className="exec-quote-text">
                                <p>"{department.deanMessage}"</p>
                            </div>
                            <div className="exec-quote-signature">
                                <h4 className="exec-quote-name">— {department.deanName}</h4>
                                <p className="exec-quote-title">{department.type === 'FACULTY' ? 'Dean of Faculty' : 'Head of Department'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {department.portalContents && department.portalContents.length > 0 && (
                    <div className="reveal" style={{ marginTop: '60px' }}>
                        <div style={{ display: 'grid', gap: '40px' }}>
                            {department.portalContents
                                .filter((content: any) => !['UEC Leadership', 'History of UEC', 'Governance'].includes(content.title))
                                .map((content: any) => {
                                    let displayTitle = content.title;
                                    if (displayTitle === 'Explore our UEC Campus') displayTitle = 'Explore UEC Campus';
                                    if (displayTitle === 'Academic Calendar') displayTitle = 'General University Calendar';
                                    if (displayTitle === 'Latest News and Events') displayTitle = 'Latest News & Events';
                                    // Override database content with official .docx content
                                    const overrides = facultyContentOverrides[slug];
                                    const officialContent = overrides?.[displayTitle];
                                    if (officialContent) {
                                        return { ...content, displayTitle, content: officialContent };
                                    }
                                    return { ...content, displayTitle };
                                })
                                .sort((a: any, b: any) => {
                                    // Admissions page: mirror the navbar dropdown order exactly
                                    const admissionsSortOrder = [
                                        'Tuition Fees',
                                        'Scholarships',
                                        'Entry Requirements',
                                        'Required Official Documents',
                                        'International Students',
                                        'Admission Guide',
                                        'How to Apply',
                                        'Apply Now'
                                    ];

                                    // About Main page: mirror the navbar dropdown order
                                    const aboutMainSortOrder = [
                                        'Message from the President',
                                        'Vision and Mission',
                                        'Explore UEC Campus'
                                    ];

                                    // Faculty / department pages: standard academic order
                                    const defaultSortOrder = [
                                        'Meet the Dean',
                                        'Vision and Mission',
                                        'Entry Requirements',
                                        'Programs',
                                        'Program Summary',
                                        'Program Structure',
                                        'General University Calendar',
                                        'Tuition Fees',
                                        'Scholarships',
                                        'Latest News & Events',
                                        'Apply Now'
                                    ];

                                    const customSortOrder =
                                        slug === 'admissions' ? admissionsSortOrder :
                                            slug === 'about-main' ? aboutMainSortOrder :
                                                defaultSortOrder;
                                    const aIdx = customSortOrder.indexOf(a.displayTitle);
                                    const bIdx = customSortOrder.indexOf(b.displayTitle);
                                    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
                                    if (aIdx !== -1) return -1;
                                    if (bIdx !== -1) return 1;
                                    return a.order - b.order;
                                })
                                .map((content: any) => {
                                    // Sync slugs with navbar IDs for about-main mapping
                                    let anchorId = content.slug;
                                    if (slug === 'about-main') {
                                        if (anchorId === 'about-overview') anchorId = 'presidents-message';
                                        if (anchorId === 'explore-campus') anchorId = 'campus';
                                    }

                                    return (
                                        <div key={content.id} id={anchorId} style={{ scrollMarginTop: '120px' }}>
                                            {['Message from the President', 'Meet the Dean'].includes(content.displayTitle) ? (
                                                <div className="exec-quote-wrap" style={{ marginTop: '20px' }}>
                                                    <div className="exec-quote-icon">“</div>
                                                    <div className="exec-quote-content">
                                                        <div className="exec-quote-text" dangerouslySetInnerHTML={{ __html: content.content }} />
                                                    </div>
                                                </div>
                                            ) : content.displayTitle === 'Vision and Mission' ? (
                                                <div className="strategic-grid" style={{ marginTop: '20px' }}>
                                                    <div className="strategic-card">
                                                        <div className="strategic-icon">
                                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.3" />
                                                                <path d="M11 11L7 17l6-6-4-4 2 4z" fill="currentColor" />
                                                                <path d="M12 7l1 1-1 1-1-1 1-1z" fill="currentColor" />
                                                                <path d="M13.5 13.5l1 1-1 1-1-1 1-1z" fill="currentColor" />
                                                            </svg>
                                                        </div>
                                                        <h3 className="strategic-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Vision</h3>
                                                        <div className="strategic-text">
                                                            {content.content.includes('Vision:') ? (
                                                                <div dangerouslySetInnerHTML={{ __html: content.content.split('Mission:')[0].replace('Vision:', '').replace('<strong>', '').replace('</strong>', '').trim() }} />
                                                            ) : 'To be a leading university in the region, recognized for excellence in education, research, and community engagement.'}
                                                        </div>
                                                    </div>
                                                    <div className="strategic-card">
                                                        <div className="strategic-icon">
                                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor" opacity="0.3" />
                                                                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" fill="currentColor" />
                                                            </svg>
                                                        </div>
                                                        <h3 className="strategic-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Mission</h3>
                                                        <div className="strategic-text">
                                                            {content.content.includes('Mission:') ? (
                                                                <div dangerouslySetInnerHTML={{ __html: content.content.includes('Mission:') ? content.content.split('Mission:')[1].replace('<strong>', '').replace('</strong>', '').trim() : '' }} />
                                                            ) : 'To provide a transformative educational experience that prepares students to become innovative leaders and responsible global citizens.'}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : content.displayTitle === 'Explore UEC Campus' ? (
                                                <div className="reveal strategic-grid" style={{ marginTop: '20px' }}>
                                                    <div className="strategic-card">
                                                        <div className="strategic-icon">
                                                            <Image
                                                                src="/icons/tour/virtual_tour_new.png"
                                                                alt="Virtual Campus Tour"
                                                                width={72}
                                                                height={72}
                                                                style={{ objectFit: 'contain' }}
                                                            />
                                                        </div>
                                                        <h3 className="strategic-title">Virtual Campus Tour</h3>
                                                        <div className="strategic-text">
                                                            Experience our state-of-the-art labs and academic spaces from anywhere in the world with our interactive 360° virtual tour.
                                                        </div>
                                                        <TourTrigger
                                                            className="btn-primary"
                                                            style={{
                                                                marginTop: '25px',
                                                                background: 'var(--navy)',
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                padding: '14px'
                                                            }}
                                                        >
                                                            Watch 360° Tour →
                                                        </TourTrigger>

                                                    </div>
                                                    <div className="strategic-card">
                                                        <div className="strategic-icon">
                                                            <Image
                                                                src="/icons/tour/on_campus_visit_new.png"
                                                                alt="On-Campus Visit"
                                                                width={72}
                                                                height={72}
                                                                style={{ objectFit: 'contain' }}
                                                            />
                                                        </div>
                                                        <h3 className="strategic-title">On-Campus Visit</h3>
                                                        <div className="strategic-text">
                                                            Schedule a personalized in-person visit to experience the vibrant academic life and culture of UEC first-hand.
                                                        </div>
                                                        <Link
                                                            href="/campus-tour"
                                                            className="btn-primary"
                                                            style={{
                                                                marginTop: '25px',
                                                                background: 'var(--gold)',
                                                                color: 'var(--navy)',
                                                                textAlign: 'center',
                                                                padding: '14px',
                                                                border: 'none',
                                                                fontWeight: '800'
                                                            }}
                                                        >
                                                            Book your Visit →
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : content.displayTitle === 'Required Official Documents' ? (
                                                <div style={{ marginTop: '20px' }}>
                                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '20px' }}>Required Official Documents</h3>
                                                    <div className="portal-rich-content" style={{ maxWidth: 'none' }}>
                                                        <h4 style={{ color: 'var(--navy)' }}>General Documents Required</h4>
                                                        <ul>
                                                            <li>Original birth certificate</li>
                                                            <li>Copy of national ID</li>
                                                            <li>Copy of Student&apos;s Passport (if available)</li>
                                                            <li>4 new passport-size photos with white background</li>
                                                        </ul>

                                                        <h4 style={{ color: 'var(--navy)', marginTop: '20px' }}>Conscription Papers for Egyptian Males</h4>
                                                        <ul>
                                                            <li>Form no; 2 Jund</li>
                                                            <li>The original military ID, born in 2008 and before</li>
                                                            <li>A letter of withdrawal (private universities) or a statement of withdrawal including the position on the Conscription of students enrolled in public universities or academic entities, or a letter from the Public Administration for Delegations to raise the scientific supervision of students transferred from outside Egypt</li>
                                                        </ul>

                                                        <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#666' }}>
                                                            <strong>Important Note:</strong> The University will not be held responsible for the registration of students with missing original documents submitted after the announced deadlines.
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : content.displayTitle === 'International Students' ? (
                                                <div style={{ marginTop: '20px' }}>
                                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '20px' }}>International Students</h3>
                                                    <div className="portal-rich-content" style={{ maxWidth: 'none' }}>
                                                        <p>For international students kindly check{' '}
                                                            <a href="https://admission.study-in-egypt.gov.eg/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontWeight: 700 }}>
                                                                Study in Egypt
                                                            </a>.
                                                        </p>
                                                    </div>
                                                </div>

                                            ) : ['Apply Now', 'Tuition Fees', 'Scholarships', 'Entry Requirements'].includes(content.displayTitle) ? (
                                                <div style={{
                                                    background: 'var(--navy)',
                                                    padding: '40px',
                                                    borderRadius: '15px',
                                                    textAlign: 'center',
                                                    color: 'white',
                                                    marginTop: '20px'
                                                }}>
                                                    <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '20px' }}>{content.displayTitle}</h3>
                                                    <p style={{ marginBottom: '25px', opacity: '0.9' }}>
                                                        {content.displayTitle === 'Apply Now'
                                                            ? 'Start your academic journey with the University of East Capital. Our Admission Portal opens for the 2026/2027 academic year.'
                                                            : content.displayTitle === 'Scholarships'
                                                                ? 'UEC offers scholarships for students. Contact the hotline 17523 for more information, or explore our full scholarship programs.'
                                                                : content.displayTitle === 'Entry Requirements'
                                                                    ? 'View the complete list of accepted certificates and qualifying subjects for your chosen faculty, including Egyptian Secondary, IGCSE, American Diploma, IB, and more.'
                                                                    : 'View comprehensive tuition structures, payment plans, and financial aid opportunities in our official portal.'}
                                                    </p>
                                                    <Link
                                                        href={
                                                            content.displayTitle === 'Apply Now' ? 'https://apply.uec.edu.eg' :
                                                                content.displayTitle === 'Scholarships' ? '/tuition#scholarships' :
                                                                    content.displayTitle === 'Entry Requirements' ? (requirementsUrlMap[slug] || '/requirements') :
                                                                        '/tuition'
                                                        }
                                                        className="btn-primary"
                                                        style={{
                                                            background: 'var(--gold)',
                                                            color: 'var(--navy)',
                                                            border: 'none',
                                                            padding: '12px 32px',
                                                            fontSize: '1.1rem',
                                                            fontWeight: '700'
                                                        }}
                                                    >
                                                        {
                                                            content.displayTitle === 'Apply Now' ? 'Go to Admission Portal →' :
                                                                content.displayTitle === 'Scholarships' ? 'Explore Scholarship Programs →' :
                                                                    content.displayTitle === 'Entry Requirements' ? 'View Full Entry Requirements →' :
                                                                        'View Admissions & Tuition →'
                                                        }
                                                    </Link>
                                                </div>

                                            ) : (
                                                <>
                                                    <h3 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '15px' }}>
                                                        {content.displayTitle}
                                                    </h3>
                                                    <div
                                                        className="section-sub portal-rich-content"
                                                        style={{ maxWidth: 'none' }}
                                                        dangerouslySetInnerHTML={{ __html: content.content }}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}

                {department.children && department.children.length > 0 && (
                    <div className="reveal" style={{ marginTop: '60px' }}>
                        <div className="section-tag">Related {department.name}</div>
                        <div className="schools-grid" style={{ marginTop: '32px' }}>
                            {department.children.map((child: any) => (
                                <Link key={child.id} href={`/departments/${child.slug}`} className="school-card">
                                    <div className="school-name">{child.name}</div>
                                    <div className="school-desc">{child.description}</div>
                                    <div className="school-link">View Details →</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {department.courses && department.courses.length > 0 && (
                    <div className="reveal" style={{ marginTop: '60px' }}>
                        <div className="section-tag">Programs</div>
                        <h2 className="section-title">Courses Offered</h2>
                        <div className="schools-grid" style={{ marginTop: '32px' }}>
                            {department.courses.map((course: any) => (
                                <div key={course.id} className="val-mini">
                                    <div className="val-mini-title">{course.code}: {course.title}</div>
                                    <div className="val-mini-sub">{course.credits} Credits · {course.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
