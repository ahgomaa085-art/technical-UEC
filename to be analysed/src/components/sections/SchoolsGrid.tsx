import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { resolveAsset } from '@/utils/assets';

const schools = [
    {
        name: 'Faculty of Medicine',
        slug: 'medicine',
        desc: 'Advancing healthcare through clinical excellence and medical research.',
        isComingSoon: false,
        image: resolveAsset('/images/faculties/Medicine_v2.webp'),
        icon: (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
            </svg>
        ),
    },
    {
        name: 'Faculty of Physical Therapy',
        slug: 'physical-therapy',
        desc: 'Rehabilitation science, movement disorders, and clinical physiotherapy.',
        isComingSoon: false,
        image: resolveAsset('/images/faculties/Physical therapy_v2.webp'),
        icon: (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
            </svg>
        ),
    },
    {
        name: 'Faculty of CS & IT',
        slug: 'computer-science',
        desc: 'Driving digital innovation through software, AI, and cybersecurity.',
        isComingSoon: false,
        image: resolveAsset('/images/faculties/Computer Science_v2.webp'),
        icon: (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
            </svg>
        ),
    },
    {
        name: 'Faculty of Business & Economics',
        slug: 'business-economics',
        desc: 'Preparing the next generation of global business leaders and economists.',
        isComingSoon: false,
        image: resolveAsset('/images/faculties/Economy_v2.webp'),
        icon: (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
            </svg>
        ),
    },
    {
        name: 'Faculty of Dentistry',
        slug: 'dentistry',
        desc: '',
        isComingSoon: true,
        image: resolveAsset('/images/faculties/Dental_v2.webp'),
        icon: (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
        ),
    },
    {
        name: 'Faculty of Pharmacy',
        slug: 'pharmacy',
        desc: '',
        isComingSoon: true,
        image: resolveAsset('/images/faculties/Pharmacy_v2.webp'),
        icon: (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 15.5c.19 0 .38-.07.53-.22l6.28-6.28-1.06-1.06-5.75 5.75-2.25-2.25-1.06 1.06 2.78 2.78c.15.15.34.22.53.22zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
        ),
    },
    {
        name: 'Faculty of Engineering',
        slug: 'engineering',
        desc: '',
        isComingSoon: true,
        image: resolveAsset('/images/faculties/Engineering_v2.webp'),
        icon: (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zm-6 0h5v5H6zM13 13h4v4h-4z" />
            </svg>
        ),
    },
    {
        name: 'Faculty of Arts & Design',
        slug: 'art-design',
        desc: '',
        isComingSoon: true,
        image: resolveAsset('/images/faculties/Arts_v2.webp'),
        icon: (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L1 9l4 2.18V15c0 3 3 5 7 5s7-2 7-5v-3.82L22 9 12 3zm6 8.99l-6 3.27-6-3.27V13l6 3.27L18 13v-.01zM12 5.35L17.6 9 12 12.65 6.4 9 12 5.35z" />
            </svg>
        ),
    },
    {
        name: 'Faculty of Mass Communication',
        slug: 'mass-communication',
        desc: '',
        isComingSoon: true,
        image: resolveAsset('/images/faculties/Mass communication_v2.webp'),
        icon: (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 6.5c-1.17 0-2.17.55-2.82 1.39A3.493 3.493 0 0015.5 6.5c-1.17 0-2.17.55-2.82 1.39C12.03 6.31 10.67 5.5 9 5.5c-2.49 0-4.5 2.01-4.5 4.5 0 3.77 3.4 6.86 8.55 11.53L14 22.23l.95-.7C20.1 16.86 23.5 13.77 23.5 10c0-2.49-2.01-4.5-4.5-4.5-1.17 0-2.17.55-2.82 1.39A3.449 3.449 0 0018.5 6.5z" />
            </svg>
        ),
    },
];

const SchoolsGrid = () => {
    return (
        <section className="schools-section" id="schools">
            <div className="schools-header reveal">

                <div>
                    <div className="section-tag">Industry leaders share in the educational process</div>
                    <h2 className="section-title">UEC FACULTIES</h2>
                    <p className="section-sub">Nine prestigious faculties offering cutting-edge, hands-on experience-based programs</p>
                </div>
            </div>

            <div className="schools-grid reveal">
                {schools.map((school, index) => {
                    const CardContent = (
                        <>
                            <div className="school-card-bg">
                                <Image
                                    src={school.image}
                                    alt={school.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="school-card-overlay"></div>
                            <div className="school-card-content">
                                <h3 className="school-name">{school.name}</h3>
                            </div>
                        </>
                    );

                    return (
                        <Link key={index} href={`/departments/${school.slug}`} className="school-card">
                            {CardContent}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default SchoolsGrid;
