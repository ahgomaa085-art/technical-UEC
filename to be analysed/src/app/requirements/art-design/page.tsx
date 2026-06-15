import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import Link from 'next/link';
import { Metadata } from 'next';
import RequirementsAccordion from '../RequirementsAccordion';

export const metadata: Metadata = {
    title: 'Faculty of Art & Design — Entry Requirements | UEC',
    description: 'Entry requirements for the UEC Faculty of Art & Design. Accepted certificates: Egyptian Secondary, IGCSE, American Diploma, IB, Canadian, Abitur, French Baccalauréat, Nigerian, and more.',
};

const requirements = [
    {
        title: 'Egyptian General Secondary Certificate "Thanaweya Amma"',
        icon: '🇪🇬',
        criteria: ['Scientific and Art (Humanities) section certificates are accepted.'],
        requiredDocuments: {
            inside: ['Original Secondary school certificate.'],
            outside: ['Original Secondary school certificate stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.']
        }
    },
    {
        title: 'STEM Certificate',
        icon: '🔬',
        criteria: ['Scientific sections (Science & Math branches) are accepted.'],
        requiredDocuments: {
            inside: ['Original Secondary school certificate.'],
            outside: ['Original Secondary school certificate stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.']
        }
    },
    {
        title: 'Azharian Certificate',
        icon: '📖',
        criteria: ['Both Science and Art certificates are accepted.'],
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
            'Accepted scores must be taken during not more than 4 successive years with no maximum IGCSE sittings.',
        ],
        qualifyingSubjects: [
            '— Scientific Sections:',
            'English Language or Literature',
            'Mathematics',
            '(A.S.L. or A.L. Mathematics) OR Biology',
            'Chemistry',
            'Physics',
            '+ In case of A.S.L./A.L. Mathematics: 4 more subjects; in case of Biology: 3 more subjects from the approved list',
            '— Art Section:',
            'English Language or Literature',
            '+ 7 more different subjects from the list approved by the Egyptian Ministry',
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
            '8 subjects are required with at least 1 credit hour with an official transcript.',
            'Subjects can be calculated from Grade 12, 11 or 10. Minimum from G12 is 4, maximum from G11 is 4, maximum from G10 is 2.',
            'Minimum score for SAT1 / EST1 certificates is 800 degrees; ACT1 passing grade is 14.',
            'Minimum score for SAT2 / EST2 / ACT2 is 900 degrees (optional but recommended for bonus percentage).',
        ],
        qualifyingSubjects: [
            '— Scientific Sections:',
            'English Language or Literature',
            'Mathematics',
            'Advanced Mathematics OR Biology',
            'Chemistry',
            'Physics',
            '+ In case of Advanced Mathematics: 4 more subjects; in case of Biology: 3 more subjects from the approved list',
            '— Art Section:',
            'English Language or Literature',
            '+ 7 more different subjects from the list approved by the Egyptian Ministry',
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
            'The rules regarding the validity and accepted dates for SAT / ACT / EST are set and announced by the Egyptian Ministry of Higher Education.',
        ],
    },
    {
        title: 'International Baccalaureate (IB)',
        icon: '🌐',
        criteria: [
            'Achieving 6 subjects including 3 higher level subjects.',
            'Minimum score is 24 out of 45.',
            'The Extended Essay and Theory of Knowledge are required.',
        ],
        qualifyingSubjects: [
            '— Scientific Sections:',
            'English Language or Literature',
            'Biology (HL) & Chemistry (HL) — OR — Mathematics (HL) & Physics (HL)',
            '+ 3 more different subjects',
            '— Art Section:',
            'English Language or Literature',
            '+ 5 more different subjects',
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
            'Applicants should pass 8 subjects.',
            'Subjects are calculated from Grade 12 & 11 only.',
            'Minimum from G12 is 5 subjects; maximum from G11 is 3 subjects.',
            'Subjects less than one credit are not accepted.',
        ],
        qualifyingSubjects: [
            '— Scientific Sections:',
            'English Language or Literature',
            'Mathematics',
            'Advanced Mathematics OR Biology',
            'Chemistry',
            'Physics',
            '+ In case of Advanced Mathematics: 4 more subjects; in case of Biology: 3 more subjects from the approved list',
            '— Art Section:',
            'English Language or Literature',
            '+ 7 more different subjects from the list approved by the Egyptian Ministry',
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
            'Official transcript must include 7 subjects, one of which is English language, with a minimum score of 3.',
            'ONLY 1 subject can be calculated from Grade 10 if (Biology / Chemistry / Physics / Mathematics).',
        ],
        qualifyingSubjects: [
            '— Scientific Sections:',
            'English Language or Literature',
            'Mathematics OR Biology',
            'Chemistry',
            'Physics',
            '+ 3 more different subjects from the list approved by the Egyptian Ministry of Higher Education',
            '— Art Section:',
            'English Language or Literature',
            '+ 6 more different subjects from the list approved by the Egyptian Ministry',
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
        title: 'French Baccalauréat',
        icon: '🇫🇷',
        criteria: [
            'The total number of subjects to be calculated are 7.',
            'Passing mark is 10.',
            'Français Oral & Français Écrit are calculated as one subject.',
            'Sciences de la vie et de la Terre, Mathématiques, OR Physique-Chimie can be calculated from year 11 or 12.',
        ],
        qualifyingSubjects: [
            '— Scientific Sections:',
            'Français',
            'Anglais',
            'Mathématiques OR Sciences de la vie et de la Terre',
            'Chimie-Physique',
            '+ 3 more different subjects from the approved list',
            '— Art Section:',
            'Français',
            'Anglais',
            '+ 5 more different subjects from the approved list',
        ],
        requiredDocuments: {
            inside: [
                'Original Baccalauréat certificate Stamped by the French Embassy & the Egyptian Ministry of Foreign Affairs.',
                'Original enrollment letter of 12 years of schooling Stamped by the school & the Educational Zone.',
                'Original Arabic & religion certificate approved by the General Administration of Examinations (Amin Sami St).'
            ],
            outside: [
                'Original Baccalauréat certificate Stamped by the French Embassy & the Egyptian Ministry of Foreign Affairs.',
                'Original enrollment letter of 12 years of schooling Stamped by the Egyptian Embassy OR MoFA.',
                'Original Arabic & religion certificate Stamped by the Egyptian Embassy OR the Egyptian Ministry of Foreign Affairs.'
            ]
        }
    },
    {
        title: 'Nigerian Secondary Certificate',
        icon: '🇳🇬',
        criteria: ['Students must study the following obligatory subjects:'],
        qualifyingSubjects: [
            '— Scientific Sections:',
            'English Language or Literature',
            'Mathematics',
            'Advanced Mathematics OR Biology',
            'Chemistry',
            'Physics',
            '+ In case of Advanced Mathematics: 4 more subjects; in case of Biology: 3 more subjects from the approved list',
            '— Art Section:',
            'English Language or Literature',
            '+ 7 more different subjects from the list approved by the Egyptian Ministry',
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

export default function ArtDesignRequirementsPage() {
    return (
        <main>
            <RevealScript />
            <PageHeader
                title="Faculty of Art & Design"
                subtitle="Entry Requirements — Academic Year 2026–2027"
            />
            <section className="section">
                <div className="container">
                    <div className="reveal">
                        <div style={{ marginBottom: '10px' }}>
                            <Link href="/requirements" style={{ color: 'var(--muted)', fontSize: '0.95rem', textDecoration: 'none' }}>← All Faculties</Link>
                        </div>
                        <div className="section-tag">Admissions</div>
                        <h2 className="section-title">Certificates &amp; Entry Criteria</h2>
                        <p className="section-sub" style={{ maxWidth: '780px' }}>
                            The Faculty of Art &amp; Design at UEC accepts applications from holders of the following certificate types.
                            Select a certificate to view the detailed qualifying subjects and entry criteria.
                        </p>
                    </div>
                    <div className="reveal">
                        <RequirementsAccordion requirements={requirements} />
                    </div>
                    <div className="reveal" style={{ marginTop: '60px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <Link href="/tuition" style={{ background: 'var(--navy)', color: 'white', padding: '14px 30px', borderRadius: '10px', fontWeight: '700', textDecoration: 'none', fontSize: '1rem' }}>
                            View Tuition &amp; Fees →
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
