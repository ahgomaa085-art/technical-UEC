'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import Link from 'next/link';

const ICT_VACANCIES = [
    {
        id: 1,
        title: 'Hardware Maintenance Specialist',
        category: 'Administrative & Technical',
        department: 'ICT Department',
        shortDesc: 'Responsible for diagnosing, repairing, and maintaining university hardware infrastructure.',
        responsibilities: [
            'Diagnose and repair desktops, laptops, and peripheral hardware',
            'Replace faulty hardware components and ensure optimal equipment performance',
            'Perform preventive maintenance for IT equipment and peripherals',
            'Install, configure, and test hardware devices',
            'Troubleshoot and resolve hardware-related issues in a timely manner',
            'Maintain inventory records of spare parts, equipment, and maintenance activities',
            'Coordinate warranty claims and repair services with vendors and suppliers',
            'Prepare and maintain maintenance reports and technical documentation'
        ],
        requirements: [
            'Diploma or Bachelor\'s degree in Information Technology, Electronics, Computer Engineering, or a related field',
            '6 years of relevant experience in hardware maintenance and troubleshooting',
            'Strong knowledge of computer hardware components, peripherals, and maintenance procedures',
            'Experience in diagnosing and repairing desktops, laptops, printers, and related equipment',
            'Good communication, customer service, and problem-solving skills',
            'Ability to work independently and as part of a team'
        ]
    },
    {
        id: 2,
        title: 'ICT Physical Security Systems Specialist',
        category: 'Administrative & Technical',
        department: 'ICT Department',
        shortDesc: 'Expertise in supporting and maintaining university-wide security infrastructure and systems.',
        responsibilities: [
            'Install, configure, and maintain CCTV surveillance systems',
            'Configure, monitor, and troubleshoot NVR (Network Video Recorder) and VMS (Video Management System) platforms',
            'Support and maintain access control, attendance, and related security systems',
            'Monitor the performance and availability of physical security systems',
            'Diagnose and resolve cabling, connectivity, and system-related issues',
            'Coordinate with vendors and service providers for maintenance, upgrades, and technical support',
            'Maintain system documentation, configurations, and technical records',
            'Ensure the continuous operation and reliability of surveillance and security systems'
        ],
        requirements: [
            'Diploma or Bachelor\'s degree in Information Technology, Electronics, Computer Engineering, or a related field',
            '6 years of relevant experience in CCTV, surveillance, and physical security systems',
            'Hands-on experience with CCTV, access control, and attendance management systems',
            'Strong knowledge of surveillance, monitoring, and security technologies',
            'Experience in troubleshooting, maintenance, and system optimization',
            'Good analytical, problem-solving, and communication skills',
            'Ability to work independently and collaboratively within a team environment'
        ]
    },
    {
        id: 3,
        title: 'ICT Helpdesk Specialist',
        category: 'Administrative & Technical',
        department: 'ICT Department',
        shortDesc: 'Customer-focused role providing first-line technical support to faculty, staff, and students.',
        responsibilities: [
            'Receive, log, and resolve user support requests in a timely manner',
            'Troubleshoot software, hardware, and operating system issues',
            'Support user account management, password resets, and access requests',
            'Install, configure, and maintain end-user software and applications',
            'Provide first-level network troubleshooting and connectivity support',
            'Assist users with Wi-Fi, internet access, and basic network-related issues',
            'Escalate complex technical issues to specialized IT teams when required',
            'Maintain accurate helpdesk tickets, records, and technical documentation',
            'Support printers, scanners, and other office IT equipment',
            'Provide technical guidance and user support to enhance productivity'
        ],
        requirements: [
            'Diploma or Bachelor\'s degree in Information Technology, Computer Science, or a related field',
            '3 years of relevant experience in IT support, technical support, or helpdesk operations',
            'Experience supporting end users in a professional environment',
            'Strong troubleshooting and problem-solving skills',
            'Good communication and customer service skills',
            'Ability to manage multiple priorities and work effectively under pressure',
            'Basic knowledge of networking, Windows operating systems, Microsoft Office, and end-user devices'
        ]
    },
    {
        id: 4,
        title: 'ICT Lab Technician',
        category: 'Administrative & Technical',
        department: 'ICT Department',
        shortDesc: 'Supporting the operation and maintenance of computer laboratories and smart classrooms.',
        responsibilities: [
            'Prepare, maintain, and support computer labs and related equipment',
            'Install, configure, update, and maintain operating systems and software applications',
            'Ensure all lab devices and systems are fully operational before lectures, practical sessions, and examinations',
            'Troubleshoot and resolve hardware, software, and basic network-related issues within computer labs',
            'Provide technical support to students and faculty members during lab sessions when required',
            'Monitor lab equipment performance and report technical faults or maintenance requirements',
            'Assist in maintaining network connectivity and access within computer labs',
            'Coordinate with ICT Helpdesk, Systems, and Network teams for issue escalation and resolution',
            'Maintain inventory records of laboratory equipment, peripherals, and software licenses',
            'Ensure compliance with university IT policies, procedures, and security standards',
            'Support the setup and operation of smart classrooms, audiovisual systems, and multimedia equipment'
        ],
        requirements: [
            'Diploma or Bachelor\'s degree in Information Technology, Computer Science, or a related field',
            '3 years of relevant experience in computer lab support, technical support, or IT operations',
            'Basic knowledge of computer hardware, software, operating systems, and networking concepts',
            'Experience with software installation, configuration, maintenance, and troubleshooting',
            'Good communication, customer service, and organizational skills',
            'Ability to work under pressure and support multiple lab environments simultaneously',
            'Strong problem-solving skills and attention to detail'
        ]
    }
];

export default function VacanciesPage() {
    const [selectedJob, setSelectedJob] = useState<any>(null);

    return (
        <main>
            <RevealScript />
            <PageHeader
                title="ICT Opportunities"
                subtitle="Join Our Dedicated Technology & IT Infrastructure Team"
            />

            <section className="section">
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div className="section-tag">ICT Department Recruitment</div>
                        <h2 className="section-title">Support UEC's Digital Future</h2>
                        <p className="section-sub" style={{ maxWidth: '780px', margin: '0 auto' }}>
                            We are seeking qualified and dedicated technical specialists to join our ICT team.
                            Browse our current openings as detailed in our departmental recruitment plan.
                        </p>
                    </div>

                    <div className="reveal vacancy-grid">
                        {ICT_VACANCIES.map(job => (
                            <div key={job.id} className="vacancy-card" onClick={() => setSelectedJob(job)} style={{ cursor: 'pointer' }}>
                                <span className="vacancy-type-tag">Full Details Available</span>
                                <h3 className="vacancy-title">{job.title}</h3>
                                <div className="vacancy-dept">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                                    </svg>
                                    {job.department}
                                </div>
                                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', margin: '10px 0 20px' }}>
                                    {job.shortDesc}
                                </p>
                                <button className="vacancy-apply-btn" style={{ marginTop: 'auto', pointerEvents: 'none' }}>
                                    View Full Specifications
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="reveal" style={{ textAlign: 'center', marginTop: '60px' }}>
                        <Link href="/careers" style={{ color: 'var(--navy)', textDecoration: 'none', fontWeight: '700' }}>
                            ← Back to Careers Overview
                        </Link>
                    </div>
                </div>
            </section>

            {/* Detailed Vacancy Modal */}
            {selectedJob && (
                <div className="apply-modal-overlay" onClick={() => setSelectedJob(null)}>
                    <div className="apply-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px' }}>
                        <button className="apply-modal-close" onClick={() => setSelectedJob(null)}>×</button>

                        <div style={{ marginBottom: '30px' }}>
                            <span className="vacancy-type-tag">{selectedJob.category}</span>
                            <h2 style={{ color: 'var(--navy)', fontSize: '2rem', marginBottom: '5px' }}>{selectedJob.title}</h2>
                            <p style={{ color: 'var(--gold)', fontWeight: '700' }}>{selectedJob.department}</p>
                        </div>

                        <div className="vacancy-details-content">
                            <div className="vacancy-details-section">
                                <h4 style={{ color: 'var(--navy)', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Key Responsibilities</h4>
                                <ul className="vacancy-req-list">
                                    {selectedJob.responsibilities.map((item: string, i: number) => (
                                        <li key={i} className="vacancy-req-item" style={{ marginBottom: '10px' }}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="vacancy-details-section" style={{ marginTop: '30px' }}>
                                <h4 style={{ color: 'var(--navy)', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Qualifications & Requirements</h4>
                                <ul className="vacancy-req-list">
                                    {selectedJob.requirements.map((item: string, i: number) => (
                                        <li key={i} className="vacancy-req-item" style={{ marginBottom: '10px' }}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{ marginTop: '40px', padding: '30px', background: 'rgba(10,31,60,0.03)', borderRadius: '15px', textAlign: 'center' }}>
                                <h4 style={{ marginBottom: '15px' }}>Ready to Apply?</h4>
                                <p style={{ fontSize: '14px', color: '#666', marginBottom: '25px' }}>
                                    If you meet the above requirements and are interested in joining our team,
                                    please submit your application through our administrative portal.
                                </p>
                                <Link href="/careers/administrative" className="vacancy-apply-btn" style={{ padding: '16px 40px', fontSize: '1rem' }}>
                                    Apply for this Position Now
                                </Link>
                                <p style={{ marginTop: '15px', fontSize: '12px', color: '#999' }}>
                                    Alternatively, you can email your CV to <a href="mailto:hr@uec.edu.eg" style={{ color: 'var(--gold)' }}>hr@uec.edu.eg</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
