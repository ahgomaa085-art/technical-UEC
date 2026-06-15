// PURPOSE: Impactful homepage hero with brand tagline, campus background, and CTA buttons.
// KEY PARTS: Background image (WebP), Brand watermark (SVG), Title/Subtitles, Virtual Tour trigger.
// MODIFIABLE: Hero title (line 29), Hero subtext (line 33), Background image path (line 13).
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { resolveAsset } from '@/utils/assets';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-bg">
                {/* SECTION: Hero Asset (WebP) — Recommended: 1920x1080 */}
                <Image
                    src={resolveAsset('/images/hero/hero-2.webp')}
                    alt="UEC Campus"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                    className="hero-image"
                />
            </div>
            <div className="hero-pattern"></div>

            <svg className="hero-watermark" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 5L195 42V120C195 170 155 200 100 215C45 200 5 170 5 120V42L100 5Z" fill="white" stroke="white" />
            </svg>

            <div className="hero-content">
                <div className="reveal">
                    <h1 className="hero-title">University of<br /><em>East Capital</em></h1>
                    {/* STYLE: Desktop: 5px from bottom, Mobile: 10px from bottom with ribbon */}
                    <div className="hero-subtitle">Industry-Driven University</div>

                    <p className="hero-sub">
                        Providing high‑quality industry-driven education, cutting-edge research and innovation to empower students to become ethical and influential leaders through nine prestigious faculties.
                    </p>
                    <div className="hero-btns">
                        <Link href="#schools" className="btn-hero-primary">Explore Our Programs</Link>
                        <button
                            className="btn-hero-secondary"
                            onClick={() => window.dispatchEvent(new CustomEvent('open-virtual-tour'))}
                        >
                            Virtual Tour ▷
                        </button>
                    </div>
                </div>
            </div>


            <div className="scroll-hint">
                Scroll to explore
                <div className="scroll-line"></div>
            </div>
        </section>
    );
};

export default Hero;
