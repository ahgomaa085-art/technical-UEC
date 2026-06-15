// PURPOSE: Main navigation header with logo, mega-menus for departments, and Apply CTA.
// KEY PARTS: Logo, Desktop Navigation, Mobile Menu, Faculty Dropdowns.
// MODIFIABLE: Menu items (lines 58-98), Logo image (line 37).
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const [activeSegment, setActiveSegment] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const { data: session } = useSession();

    // SECTION: Scroll Behavior for Active Links
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id') || '';
                }
            });
            setActiveSegment(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on link click
    const closeMenu = () => setMobileOpen(false);

    // SECTION: Main Navbar Visual Structure
    return (
        <nav className="nav" id="mainNav">
            <Link href="/" className="logo" onClick={closeMenu}>
                <Image
                    src="/white-back.png"
                    alt="University of East Capital Logo"
                    width={300}
                    height={100}
                    style={{ objectFit: 'contain' }}
                    className="logo-img"
                    priority
                />
            </Link>

            {/* Hamburger button — visible only on mobile */}
            <button
                className={`hamburger ${mobileOpen ? 'active' : ''}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`nav-links ${mobileOpen ? 'nav-open' : ''}`}>
                {/* SECTION: Navigation Links & Dropdowns */}
                <Link href="/" className="nav-link" onClick={closeMenu}>Home</Link>

                <div className="dropdown">
                    <span className="nav-link dropdown-toggle" style={{ cursor: 'default' }}>About UEC</span>
                    <div className="dropdown-menu">
                        <Link href="/departments/about-main#presidents-message" className="dropdown-item" onClick={closeMenu}>Message from the President</Link>
                        <Link href="/departments/about-main#vision-mission-goals" className="dropdown-item" onClick={closeMenu}>Vision and Mission</Link>
                        <Link href="/departments/about-main#campus" className="dropdown-item" onClick={closeMenu}>Explore UEC Campus</Link>
                    </div>
                </div>

                <div className="dropdown">
                    <Link href="/#schools" className="nav-link dropdown-toggle" onClick={closeMenu}>Faculties</Link>
                    <div className="dropdown-menu">
                        <Link href="/departments/medicine" className="dropdown-item" onClick={closeMenu}>Faculty of Medicine</Link>
                        <Link href="/departments/physical-therapy" className="dropdown-item" onClick={closeMenu}>Faculty of Physical Therapy</Link>
                        <Link href="/departments/computer-science" className="dropdown-item" onClick={closeMenu}>Faculty of Computer Science and Information Technology</Link>
                        <Link href="/departments/business-economics" className="dropdown-item" onClick={closeMenu}>Faculty of Business and Economics</Link>
                        <Link href="/departments/dentistry" className="dropdown-item" onClick={closeMenu}>Faculty of Dentistry</Link>
                        <Link href="/departments/pharmacy" className="dropdown-item" onClick={closeMenu}>Faculty of Pharmacy</Link>
                        <Link href="/departments/engineering" className="dropdown-item" onClick={closeMenu}>Faculty of Engineering</Link>
                        <Link href="/departments/art-design" className="dropdown-item" onClick={closeMenu}>Faculty of Arts and Design</Link>
                        <Link href="/departments/mass-communication" className="dropdown-item" onClick={closeMenu}>Faculty of Mass Communication</Link>
                    </div>
                </div>

                <div className="dropdown">
                    <Link href="/departments/admissions" className="nav-link dropdown-toggle" onClick={closeMenu}>Admission</Link>
                    <div className="dropdown-menu right-aligned">
                        <Link href="/tuition" className="dropdown-item" onClick={closeMenu}>Tuition Fees</Link>
                        <Link href="/departments/admissions#scholarships" className="dropdown-item" onClick={closeMenu}>Scholarships</Link>
                        <Link href="/requirements" className="dropdown-item" onClick={closeMenu}>Entry Requirements</Link>
                        <Link href="/departments/admissions#official-documents" className="dropdown-item" onClick={closeMenu}>Required Official Documents</Link>
                        <Link href="/departments/admissions#international-students" className="dropdown-item" onClick={closeMenu}>International Students</Link>
                    </div>
                </div>

                <Link href="/departments/student-life" className="nav-link" onClick={closeMenu}>Student Life</Link>
                <Link href="/departments/research-main" className="nav-link" onClick={closeMenu}>Research</Link>
                <Link href="/careers" className="nav-link" onClick={closeMenu}>Careers</Link>
                {session && (
                    <Link href="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
                )}

                {/* Apply Now — inside mobile menu */}
                <div className="mobile-cta">
                    {session ? (
                        <button
                            onClick={() => { signOut(); closeMenu(); }}
                            className="nav-cta"
                            style={{ background: 'var(--navy)', color: '#fff', border: 'none', cursor: 'pointer' }}
                        >
                            Sign Out
                        </button>
                    ) : (
                        <button
                            className="nav-cta"
                            onClick={() => {
                                closeMenu();
                                window.dispatchEvent(new CustomEvent('open-apply-modal'));
                            }}
                            style={{ background: 'var(--gold)', color: '#fff', border: 'none', cursor: 'pointer' }}
                        >
                            Apply Now
                        </button>
                    )}
                </div>
            </div>

            {/* Desktop Apply Now */}
            <div className="desktop-cta">
                {session ? (
                    <button
                        onClick={() => signOut()}
                        className="nav-cta"
                        style={{ background: 'var(--navy)', color: '#fff', border: 'none', cursor: 'pointer' }}
                    >
                        Sign Out
                    </button>
                ) : (
                    <button
                        className="nav-cta"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-apply-modal'))}
                        style={{ background: 'var(--gold)', color: '#fff', border: 'none', cursor: 'pointer' }}
                    >
                        Apply Now
                    </button>
                )}
            </div>

            {/* Overlay for mobile menu */}
            {mobileOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
        </nav>
    );
};

export default Navbar;
