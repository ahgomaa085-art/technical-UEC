import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import Link from 'next/link';
import { Metadata } from 'next';
import RequirementsAccordion from '../RequirementsAccordion';

export const metadata: Metadata = {
    title: 'Faculty of Business & Economics — Entry Requirements | UEC',
    description: 'Entry requirements for the UEC Faculty of Business & Economics across all accepted certificate types.',
};

const requirements = [
    {
        title: 'Egyptian General Secondary Certificate "Thanaweya Amma"',
        icon: '🇪🇬',
        criteria: ['Scientific or Literary (Humanities) section certificates are accepted.'],
        requiredDocuments: {
            inside: ['Original Secondary school certificate.'],
            outside: ['Original Secondary school certificate stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.']
        }
    },
    {
        title: 'STEM Certificate',
        icon: '🔬',
        criteria: ['STEM certificates are accepted for the Faculty of Business & Economics.'],
        requiredDocuments: {
            inside: ['Original Secondary school certificate.'],
            outside: ['Original Secondary school certificate stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.']
        }
    },
    {
        title: 'Azharian Certificate',
        icon: '📖',
        criteria: ['Both Science and Humanities sections are accepted.'],
        requiredDocuments: {
            inside: ['Original Secondary school certificate.'],
            outside: ['Original Secondary school certificate stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.']
        }
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
            'Any Business, Economics, or Accounting subject (strongly recommended)',
            '+ 5 more different subjects from the list approved by the Egyptian Ministry for Higher Education',
        ],
        requiredDocuments: {
            inside: [
                'Original Statements OR Certificates Stamped by the British Council in Cairo, the Egyptian Ministry of Foreign Affairs, & the General Administration of Examinations.',
                'Original enrollment letter of 12 years of schooling Stamped by the school & the Educational Zone.',
                'Original Arabic & religion certificate approved by the General Administration of Examinations (Amin Sami St).'
            ],
            outside: [
                'Original Statements OR Certificates Stamped by the British Council and the Egyptian Ministry of Foreign Affairs.',
                'Original enrollment letter of 12 years of schooling Stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.',
                'Original Arabic & religion certificate Stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.'
            ]
        }
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
            'Any Social Science, Business, or Economics subject',
            '+ 5 more subjects from the Egyptian Ministry approved list',
        ],
        requiredDocuments: {
            inside: [
                'Original GPA approved by the General Administration of Examinations.',
                'SAT Stamped by AMIDEAST-Egypt & the Egyptian Ministry of Foreign Affairs.',
                'ACT OR EST Stamped by the General Administration of Examinations in Egypt.',
                'Username & password for the S.A.T, ACT OR EST.',
                'Letter of Private Education (certified copy).',
                'Original enrollment letter of 12 years of schooling Stamped by the school & the Educational Zone.',
                'Original Arabic/religion certificate approved by the General Administration of Examinations (Amin Sami St).'
            ],
            outside: [
                'An original GPA Stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.',
                'SAT Stamped by AMIDEAST-Egypt & the Egyptian Ministry of Foreign Affairs.',
                'ACT OR EST Stamped by the General Administration of Examinations in Egypt.',
                'Username/password for the S.A.T, ACT OR EST.',
                'Accreditation Letter from AMIDEAST-Egypt.',
                'Original enrollment letter of 12 years of schooling Stamped by the Egyptian Embassy OR MoFA.',
                'Original Arabic & religion certificate Stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.'
            ]
        },
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
            'Any Business Management or Economics subject (HL or SL)',
        ],
        requiredDocuments: {
            inside: [
                'Original high school diploma (Transcript & Certificate) authenticated by the Egyptian Consulate in Genève & the General Administration of Examinations.',
                'Original enrollment letter of 12 years of schooling Stamped by the school & the Educational Zone.',
                'Original Arabic & religion certificate approved by the General Administration of Examinations (Amin Sami St).'
            ],
            outside: [
                'Original high school diploma (Transcript & Certificate) Stamped by the Egyptian Consulate in Genève.',
                'Original enrollment letter of 12 years of schooling Stamped by the Egyptian Embassy OR MoFA.',
                'Original Arabic & religion certificate Stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.'
            ]
        }
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
            'Any Business or Economics subject',
            '+ 5 more subjects from the approved list',
        ],
        requiredDocuments: {
            inside: [
                'Original GPA Stamped by the General Administration of Examinations & the Egyptian Consulate in Canada.',
                'Original enrollment letter of 12 years of schooling Stamped by the school & the Educational Zone.',
                'Original Arabic & religion certificate approved by the General Administration of Examinations (Amin Sami St).'
            ],
            outside: [
                'Original GPA Stamped by the Egyptian Consulate in Canada.',
                'Original enrollment letter of 12 years of schooling Stamped by the Egyptian Consulate in Canada OR the Ministry of Foreign Affairs in Egypt.',
                'Original Arabic & religion certificate Stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.'
            ]
        }
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
            'Any Social Science or Economics subject',
            '+ 4 more subjects from the approved list',
        ],
        requiredDocuments: {
            inside: [
                'Abitur-Certificate Stamped by MoFA Egypt and translated.',
                'Original enrollment letter of 12 years of schooling Stamped by the school and the Educational Zone.',
                'Original Arabic & religion certificate approved by the General Administration of Examinations (Amin Sami St).'
            ],
            outside: [
                'Abitur-Certificate Stamped by the Egyptian Embassy OR MoFA Egypt and translated.',
                'Original enrollment letter of 12 years of schooling Stamped by the Egyptian Embassy.',
                'Original Arabic & religion certificate Stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.'
            ]
        }
    },
    {
        title: 'Nigerian Secondary Certificate',
        icon: '🇳🇬',
        criteria: ['Students must study the following obligatory subjects:'],
        qualifyingSubjects: [
            'English',
            'Mathematics',
            'Any Commerce, Economics, or Accounting subject',
            '+ 5 more subjects from the approved list',
        ],
        requiredDocuments: {
            inside: ['Not Applicable'],
            outside: [
                'Computerized certificate Stamped by the Egyptian Ministry of Foreign Affairs.',
                'Original enrollment letter of 12 years of schooling Stamped by the Egyptian Embassy OR MoFA.'
            ]
        },
        accepted: 'Other foreign and Arab General Secondary School certificates are accepted in line with the regulations of the Egyptian Ministry of Higher Education.',
    },
];

export default function BusinessEconomicsRequirementsPage() {
    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Faculty of Business & Economics"
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
                            The Faculty of Business & Economics at UEC accepts applications from holders of the following certificate types.
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
