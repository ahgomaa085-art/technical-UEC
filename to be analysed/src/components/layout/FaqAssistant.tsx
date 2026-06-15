'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { faqData, faqCategories, FAQ } from '@/data/faqData';

const FaqAssistant = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    const filteredFaqs = useMemo(() => {
        let results = faqData;
        if (activeCategory !== 'all') {
            results = results.filter(f => f.category === activeCategory);
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            results = results.filter(f =>
                f.question.toLowerCase().includes(q) ||
                f.answer.toLowerCase().includes(q)
            );
        }
        return results;
    }, [search, activeCategory]);

    if (!isVisible) return null;

    return (
        <div ref={panelRef} className={`faq-assistant-wrapper${isOpen ? ' open' : ''}`}>
            {/* Floating Button */}
            <button
                className="faq-float-btn"
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (isOpen) {
                        setSelectedFaq(null);
                        setSearch('');
                    }
                }}
                title="Have a question?"
                aria-label="Open FAQ Assistant"
            >
                <div className="faq-float-tooltip">Have a question?</div>
                <div className="faq-float-btn-content">
                    <span className={`faq-float-icon${isOpen ? ' active' : ''}`}>
                        {isOpen ? (
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                                <path d="M12 2C6.48 2 2 6.03 2 10.92c0 2.58 1.2 4.9 3.15 6.53.15.13.25.35.22.57l-.44 2.47c-.12.63.52 1.15 1.1.88l2.77-1.27c.23-.1.49-.12.73-.06.86.22 1.78.34 2.73.34H12c5.52 0 10-4.03 10-8.92S17.52 2 12 2z" />
                                <circle cx="8" cy="11" r="1.2" fill="var(--navy)" />
                                <circle cx="12" cy="11" r="1.2" fill="var(--navy)" />
                                <circle cx="16" cy="11" r="1.2" fill="var(--navy)" />
                            </svg>
                        )}
                    </span>
                    {!isOpen && <span className="faq-float-text">Have a Question?</span>}
                </div>
            </button>

            {/* Panel */}
            <div className={`faq-panel${isOpen ? ' open' : ''}`}>
                {/* Header */}
                <div className="faq-panel-header">
                    <div className="faq-panel-header-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                            <path d="M12 2C6.48 2 2 6.03 2 10.92c0 2.58 1.2 4.9 3.15 6.53.15.13.25.35.22.57l-.44 2.47c-.12.63.52 1.15 1.1.88l2.77-1.27c.23-.1.49-.12.73-.06.86.22 1.78.34 2.73.34H12c5.52 0 10-4.03 10-8.92S17.52 2 12 2z" />
                        </svg>
                    </div>
                    <div>
                        <div className="faq-panel-title">UEC Smart Assistant</div>
                        <div className="faq-panel-subtitle">Find answers instantly</div>
                    </div>
                </div>

                {/* Search */}
                <div className="faq-search-box">
                    <svg className="faq-search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your question..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setSelectedFaq(null); }}
                        className="faq-search-input"
                    />
                    {search && (
                        <button className="faq-search-clear" onClick={() => { setSearch(''); setSelectedFaq(null); }}>×</button>
                    )}
                </div>

                {/* Categories */}
                <div className="faq-categories">
                    {faqCategories.map(cat => (
                        <button
                            key={cat.id}
                            className={`faq-cat-btn${activeCategory === cat.id ? ' active' : ''}`}
                            onClick={() => { setActiveCategory(cat.id); setSelectedFaq(null); }}
                        >
                            <span>{cat.icon}</span> {cat.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="faq-content">
                    {selectedFaq ? (
                        <div className="faq-answer-view">
                            <button className="faq-back-btn" onClick={() => setSelectedFaq(null)}>
                                ← Back to questions
                            </button>
                            <div className="faq-answer-q">
                                <span className="faq-q-icon">Q</span>
                                {selectedFaq.question}
                            </div>
                            <div className="faq-answer-a">
                                <span className="faq-a-icon">A</span>
                                <div dangerouslySetInnerHTML={{ __html: selectedFaq.answer }} />
                            </div>
                        </div>
                    ) : (
                        <>
                            {filteredFaqs.length === 0 ? (
                                <div className="faq-empty">
                                    <div className="faq-empty-icon">🔍</div>
                                    <p>No matching questions found.</p>
                                    <p className="faq-empty-hint">Try a different search term or category.</p>
                                </div>
                            ) : (
                                <div className="faq-list">
                                    {filteredFaqs.map((faq, i) => (
                                        <button key={i} className="faq-item" onClick={() => setSelectedFaq(faq)}>
                                            <span className="faq-item-icon">
                                                {faqCategories.find(c => c.id === faq.category)?.icon || '❓'}
                                            </span>
                                            <span className="faq-item-text">{faq.question}</span>
                                            <span className="faq-item-arrow">›</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="faq-panel-footer">
                    Still need help?{' '}
                    <a href="https://wa.me/201505123555" target="_blank" rel="noopener noreferrer">
                        Chat with Admissions
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FaqAssistant;
