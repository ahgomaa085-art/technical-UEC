'use client';
import React, { useState } from 'react';

interface Requirement {
    title: string;
    icon: string;
    criteria?: string[];
    qualifyingSubjects?: string[];
    requiredDocuments?: {
        inside: string[];
        outside: string[];
    };
    notes?: string[];
    accepted?: string;
}

interface RequirementsAccordionProps {
    requirements: Requirement[];
}

export default function RequirementsAccordion({ requirements }: RequirementsAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="req-accordion">
            {requirements.map((req, idx) => (
                <div key={idx} className="req-cert-item">
                    <button
                        className={`req-cert-header${openIndex === idx ? ' open' : ''}`}
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        aria-expanded={openIndex === idx}
                    >
                        <span className="req-cert-badge">{req.icon}</span>
                        <span className="req-cert-title">{req.title}</span>
                        <span className="req-cert-chevron">▼</span>
                    </button>
                    <div className={`req-cert-body${openIndex === idx ? ' open' : ''}`}>
                        {req.criteria && req.criteria.length > 0 && (
                            <div className="req-criteria-box">
                                <div className="req-cert-section-title">📋 Entry Criteria</div>
                                <ul>
                                    {req.criteria.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                            </div>
                        )}

                        {req.qualifyingSubjects && req.qualifyingSubjects.length > 0 && (
                            <div style={{ marginBottom: '25px' }}>
                                <div className="req-cert-section-title">📚 Qualifying Subjects</div>
                                <ul className="req-subject-list">
                                    {req.qualifyingSubjects.map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                        )}

                        {req.requiredDocuments && (
                            <div className="req-docs-container">
                                <div className="req-cert-section-title">📄 Mandatory Documents & Stamps</div>
                                <div className="req-docs-table-wrapper">
                                    <table className="req-docs-table">
                                        <thead>
                                            <tr>
                                                <th>Certificates from inside Egypt</th>
                                                <th>Certificates from outside Egypt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td data-label="Certificates from Inside Egypt">
                                                    <ul>
                                                        {req.requiredDocuments.inside.map((doc, i) => (
                                                            <li key={i}>{doc}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td data-label="Certificates from Outside Egypt">
                                                    <ul>
                                                        {req.requiredDocuments.outside.map((doc, i) => (
                                                            <li key={i}>{doc}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {req.notes && req.notes.map((note, i) => (
                            <div key={i} className="req-note-box">
                                <strong>Important Note:</strong> {note}
                            </div>
                        ))}

                        {req.accepted && (
                            <div className="req-accepted-note">{req.accepted}</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
