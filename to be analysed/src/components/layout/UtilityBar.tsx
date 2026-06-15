import React from 'react';

const UtilityBar = () => {
    return (
        <div className="util-bar">
            <div className="util-left">
                <a href="mailto:Admissions@uec.edu.eg" className="util-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Admissions@uec.edu.eg
                </a>
                <a href="tel:17523" className="util-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Hotline: 17523
                </a>
            </div>
            <div className="util-right">
                <span className="util-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    KM 31, Cairo–Ismailia Desert Road, East Cairo, Egypt
                </span>
                <div className="util-social">
                    <a href="https://www.facebook.com/univofeastcapital" title="Facebook">f</a>
                    <a href="https://www.instagram.com/univofeastcapital" title="Instagram">ig</a>
                    <a href="https://x.com/EastCapitalUni" title="X / Twitter">𝕏</a>
                    <a href="https://www.linkedin.com/company/universityofeastcapital/" title="LinkedIn">in</a>
                    <a href="https://www.tiktok.com/@univofeastcapital" title="TikTok">tt</a>
                </div>
            </div>
        </div>
    );
};

export default UtilityBar;
