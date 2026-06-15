import React from 'react';

const WhyUEC = () => {
    return (
        <section className="why-section" id="why">
            <div className="why-content">
                <div className="section-tag reveal">Academic based Goals [RESPECT]</div>
                <h2 className="section-title reveal" style={{ color: '#fff' }}>
                    University of East Capital,
                    <span style={{
                        display: 'block',
                        fontSize: '0.65em',
                        fontWeight: 400,
                        opacity: 0.8,
                        marginTop: '10px',
                        letterSpacing: '1px'
                    }}>
                        Industry-Driven Education
                    </span>
                </h2>
                <div className="why-grid desktop-view">
                    <div className="why-card reveal">
                        <div className="why-letter">R</div>
                        <div className="why-title">Rich Student Life</div>
                        <div className="why-text">A vibrant community with diverse extracurricular activities, clubs, and events that foster personal growth and collaboration.</div>
                    </div>
                    <div className="why-card reveal reveal-delay-1">
                        <div className="why-letter">E</div>
                        <div className="why-title">East Capital Education</div>
                        <div className="why-text">Providing high-quality, industry-driven education that meets international standards and prepares students for global success.</div>
                    </div>
                    <div className="why-card reveal reveal-delay-2">
                        <div className="why-letter">S</div>
                        <div className="why-title">Smart Campus</div>
                        <div className="why-text">A modern, state-of-the-art campus designed with the latest technology to enhance the learning and teaching experience.</div>
                    </div>
                    <div className="why-card reveal reveal-delay-3">
                        <div className="why-letter">P</div>
                        <div className="why-title">Prototyping & Startups</div>
                        <div className="why-text">Featuring our state-of-the-art Prototyping Research Center fostering hands-on discovery, technical advancement, and entrepreneurial ventures.</div>
                    </div>
                    <div className="why-card reveal reveal-delay-4">
                        <div className="why-letter">E</div>
                        <div className="why-title">Excellence in Research</div>
                        <div className="why-text">A dedicated commitment to pushing academic boundaries and fostering impactful discovery across all prestigious faculties.</div>
                    </div>
                    <div className="why-card reveal reveal-delay-5">
                        <div className="why-letter">C</div>
                        <div className="why-title">Career & Internships</div>
                        <div className="why-text">Dedicated career advising and internship programs that connect students with industry leaders and professional opportunities.</div>
                    </div>
                    <div className="why-card reveal reveal-delay-6">
                        <div className="why-letter">T</div>
                        <div className="why-title">Technology Innovation Zone</div>
                        <div className="why-text">Our specialized zone for hands-on technological development, bridging the gap between academia and industrial application.</div>
                    </div>
                </div>

                <div className="why-mobile mobile-view reveal">
                    <div className="why-mobile-letters">
                        <span className="letter-r">R</span>
                        <span className="letter-e">E</span>
                        <span className="letter-s">S</span>
                        <span className="letter-p">P</span>
                        <span className="letter-e">E</span>
                        <span className="letter-c">C</span>
                        <span className="letter-t">T</span>
                    </div>
                    <div className="why-mobile-sentence">
                        Our commitment to your <strong>Future Career</strong> through
                        Rich Student Life, East Capital Education, a Smart Campus,
                        Prototyping, Excellence in Research, and Technology Innovation.
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhyUEC;
