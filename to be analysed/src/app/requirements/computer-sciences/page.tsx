import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import Link from 'next/link';
import { Metadata } from 'next';
import RequirementsAccordion from '../RequirementsAccordion';

export const metadata: Metadata = {
    title: 'Faculty of Computer Sciences — Entry Requirements | UEC',
    description: 'Entry requirements for the UEC Faculty of Computer Sciences across all accepted certificate types.',
};

const requirements = [
    {
        title: 'Egyptian General Secondary Certificate "Thanaweya Amma"',
        icon: '🇪🇬',
        criteria: ['Scientific (Science or Mathematics) section is accepted.'],
    },
    {
        title: 'STEM Certificate',
        icon: '🔬',
        criteria: ['STEM certificates are accepted for the Faculty of Computer Sciences.'],
    },
    {
        title: 'Azharian Certificate',
        icon: '📖',
        criteria: ['Science section is accepted.'],
    },
    {
        title: 'IGCSE',
        icon: '🌍',
        criteria: [
            '8 subjects are required with minimum grade of "C" or "4" for O.L., A.S.L., and A.L. subjects.',
            'Accepted scores must be taken during not more than 4 successive years.',
        ],
        qualifyingSubjects: [
            'English Language or Literature',
            'Any branch of Mathematics',
            'Physics or Computer Science',
            '+ 5 more different subjects from the list approved by the Egyptian Ministry for Higher Education',
        ],
    },
    {
        title: 'American Diploma',
        icon: '🇺🇸',
        criteria: [
            '8 subjects required with at least 1 credit hour with an official transcript.',
            'Subjects can be from Grade 12, 11, or 10. Minimum 4 from G12.',
            'Minimum SAT1 / EST1 score: 800; ACT1 passing grade: 14.',
        ],
        qualifyingSubjects: [
            'English Language or Literature',
            'Any branch of Mathematics',
            'Any Science subject (Physics, Chemistry, or Computer)',
            '+ 5 more subjects from the list approved by the Egyptian Ministry for Higher Education',
        ],
        notes: [
            'Rules on SAT / ACT / EST validity dates are set by the Egyptian Ministry of Higher Education.',
        ],
    },
    {
        title: 'International Baccalaureate (IB)',
        icon: '🌐',
        criteria: [
            'Achieving 6 subjects including 3 higher level subjects.',
            'Minimum score is 24 out of 45.',
        ],
        qualifyingSubjects: [
            'English Language or Literature',
            'Mathematics (HL or SL)',
            'Any Science subject at HL or SL',
        ],
    },
    {
        title: 'Canadian High School Diploma',
        icon: '🍁',
        criteria: [
            'Applicants must pass 8 subjects from Grade 12 & 11 only.',
            'Minimum 5 from G12; maximum 3 from G11.',
        ],
        qualifyingSubjects: [
            'English Language, Literature, or Composition',
            'Any branch of Mathematics',
            'Physics or Computer Science',
            '+ 5 more subjects from the approved list',
        ],
    },
    {
        title: 'Abitur Certificate',
        icon: '🇩🇪',
        criteria: [
            'Grade 12 must be completed.',
            '7 subjects required in the transcript, including English language, with minimum score 3.',
        ],
        qualifyingSubjects: [
            'English Language, Literature, or Composition',
            'Any branch of Mathematics',
            'Physics or Computer Science',
            '+ 4 more subjects from the approved list',
        ],
    },
    {
        title: 'Nigerian Secondary Certificate',
        icon: '🇳🇬',
        criteria: ['Students must study the following obligatory subjects:'],
        qualifyingSubjects: [
            'English',
            'Mathematics',
            'Physics or Computer Science',
            '+ 5 more subjects from the approved list',
        ],
        accepted: 'Other foreign and Arab General Secondary School certificates are accepted in line with the regulations of the Egyptian Ministry of Higher Education.',
    },
];

export default function ComputerSciencesRequirementsPage() {
    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Faculty of Computer Sciences"
                subtitle="Entry Requirements — Academic Year 2026–2027"
            />
            <section className="section">
                <div className="container">
                    <div className="reveal">
                        <div style={{ marginBottom: '10px' }}>
                            <Link href="/requirements" style={{ color: 'var(--muted)', fontSize: '0.95rem', textDecoration: 'none' }}>← All Faculties</Link>
                        </div>
                        <div className="section-tag">Admissions</div>
                        <h2 className="section-title">Certificates & Entry Criteria</h2>
                        <p className="section-sub" style={{ maxWidth: '780px' }}>
                            The Faculty of Computer Sciences at UEC accepts applications from holders of the following certificate types.
                            Select a certificate to view the detailed qualifying subjects and entry criteria.
                        </p>
                    </div>
                    <div className="reveal">
                        <RequirementsAccordion requirements={requirements} />
                    </div>
                    <div className="reveal" style={{ marginTop: '60px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <Link href="/tuition" style={{ background: 'var(--navy)', color: 'white', padding: '14px 30px', borderRadius: '10px', fontWeight: '700', textDecoration: 'none', fontSize: '1rem' }}>
                            View Tuition & Fees →
                        </Link>
                        <Link href="https://apply.uec.edu.eg" style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '14px 30px', borderRadius: '10px', fontWeight: '700', textDecoration: 'none', fontSize: '1rem' }}>
                            Apply Now →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
