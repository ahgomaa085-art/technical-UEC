'use client';

import Link from 'next/link';
import Image from 'next/image';

const Welcome = () => {
    return (
        <section className="welcome-actions-section" id="about">
            <div className="container">
                <h2 className="section-title centered-title text-center" style={{ textAlign: 'center', marginBottom: '40px', fontWeight: 800 }}>ADMISSION GUIDE</h2>
                <div className="executive-actions centered">
                    <div
                        onClick={() => window.dispatchEvent(new CustomEvent('open-apply-modal'))}
                        className="exec-btn"
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="exec-btn-icon">
                            <Image
                                src="/icons/admission-guide/Apply_now_new.png"
                                alt="Apply Now"
                                width={82}
                                height={82}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <span className="exec-btn-label">Apply Now</span>
                    </div>
                    <Link href="/tuition" className="exec-btn">
                        <div className="exec-btn-icon">
                            <Image
                                src="/icons/admission-guide/Tuition_Fees_Scholarships_new.png"
                                alt="Tuition Fees and Scholarships"
                                width={82}
                                height={82}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <span className="exec-btn-label">Tuition Fees and Scholarships</span>
                    </Link>
                    <div className="exec-btn" onClick={() => window.dispatchEvent(new CustomEvent('open-virtual-tour'))} style={{ cursor: 'pointer' }}>
                        <div className="exec-btn-icon">
                            <Image
                                src="/icons/admission-guide/Explore_Our_Campus_new.png"
                                alt="Explore Our Campus"
                                width={82}
                                height={82}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <span className="exec-btn-label">Explore Our Campus</span>
                    </div>
                    <Link href="/coming-soon" className="exec-btn">
                        <div className="exec-btn-icon">
                            <Image
                                src="/icons/admission-guide/Academic_Calendar_new.png"
                                alt="Academic Calendar"
                                width={82}
                                height={82}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <span className="exec-btn-label">Academic Calendar</span>
                    </Link>
                    <Link href="/news" className="exec-btn">
                        <div className="exec-btn-icon">
                            <Image
                                src="/icons/admission-guide/Announcements_new.png"
                                alt="Announcement"
                                width={82}
                                height={82}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <span className="exec-btn-label">Announcements</span>
                    </Link>


                </div>
            </div>
        </section>
    );
};

export default Welcome;
