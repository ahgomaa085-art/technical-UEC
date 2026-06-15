export interface FAQ {
    question: string;
    answer: string;
    category: string;
}

export const faqCategories = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'admissions', label: 'Admissions', icon: '🎓' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'faculties', label: 'Faculties', icon: '🏛️' },
    { id: 'tuition', label: 'Tuition', icon: '💰' },
    { id: 'campus', label: 'Campus', icon: '🏫' },
];

export const faqData: FAQ[] = [
    // Admissions & Application
    {
        category: 'admissions',
        question: 'Are UEC degrees accredited? Will I be able to register with the syndicate after graduation?',
        answer: 'Yes. All UEC bachelor\'s degrees are accredited by the Supreme Council of Egyptian Universities. Graduates are eligible to register with their respective professional syndicates and obtain their licenses upon graduation.'
    },
    {
        category: 'admissions',
        question: 'Who can apply to UEC?',
        answer: 'UEC accepts applicants holding a Thanaweya Amma certificate or equivalent foreign and Arab General Secondary School certificates in line with the regulations of the Egyptian Ministry of Higher Education.'
    },
    {
        category: 'admissions',
        question: 'Can international students apply to UEC?',
        answer: 'Yes. International students are welcome to apply through the Study in Egypt program.'
    },
    {
        category: 'admissions',
        question: 'Can I defer my studies for the first semester (Newcomers)?',
        answer: 'Please contact the Admissions Office for deferral requests.'
    },
    {
        category: 'admissions',
        question: 'Can I apply online?',
        answer: 'Yes. You can fill in the online application through the <a href="/requirements" class="faq-link">UEC Admissions Portal</a>.'
    },
    {
        category: 'admissions',
        question: 'Can I apply by visiting the Admissions Office in person?',
        answer: 'Yes, in-person applications are accepted at the Admissions Office on campus.'
    },
    {
        category: 'admissions',
        question: 'When does admission open?',
        answer: 'Early admissions usually begin at the end of November each year.'
    },
    {
        category: 'admissions',
        question: 'What are the benefits of early admission?',
        answer: 'Early admission helps applicants complete the admission process avoiding the peak period.'
    },
    {
        category: 'admissions',
        question: 'My high school certificate was issued several years ago. Can I still apply?',
        answer: 'Yes, abiding by the regulations set by the Supreme Council of Private Universities as well as all university requirements.'
    },
    {
        category: 'admissions',
        question: 'Do you accept transfer students?',
        answer: 'Yes, transfer students are accepted.'
    },
    {
        category: 'admissions',
        question: 'Can I apply for more than one faculty?',
        answer: 'Yes, you can apply for more than one faculty.'
    },
    {
        category: 'admissions',
        question: 'Does early admission guarantee final acceptance?',
        answer: 'Acceptance at UEC depends on fulfilling all admission requirements as stated by the Supreme Council of Private Universities as well as all university requirements.'
    },
    {
        category: 'admissions',
        question: 'What is the minimum admission score for each faculty?',
        answer: 'It is determined annually by the Supreme Council of Private Universities.'
    },
    {
        category: 'admissions',
        question: 'Can I pay more than the required fees to be accepted below the minimum score?',
        answer: 'No.'
    },
    {
        category: 'admissions',
        question: 'What happens if applicants score below the minimum required percentage for their chosen faculty?',
        answer: 'The Admissions Office will automatically consider the applicant\'s second or third faculty choice.'
    },
    {
        category: 'admissions',
        question: 'How can I edit my application or change major after submission?',
        answer: 'Applicants must submit their request to the Admissions Office on campus.'
    },
    {
        category: 'admissions',
        question: 'What should I do if I do not receive a confirmation email after submitting my application?',
        answer: 'Please contact the Admissions Office.'
    },
    {
        category: 'admissions',
        question: 'Does my guardian need to be present during the application process?',
        answer: 'Yes, a guardian must be present during the application process.'
    },
    {
        category: 'admissions',
        question: 'What if the guardian is not present?',
        answer: 'You will need to fill in the Guardian Absence Form, available from the Admissions Office.'
    },
    // Documents & Requirements
    {
        category: 'documents',
        question: 'What documents are required for admission?',
        answer: 'Required documents vary by certificate type. Please visit the <a href="/requirements" class="faq-link">Entry Requirements</a> page for your faculty to see the full list of mandatory documents and stamps for certificates from inside and outside Egypt.'
    },
    {
        category: 'documents',
        question: 'When should applicants submit their original stamped documents?',
        answer: 'Applicants must submit all original stamped documents to the Admissions Office on campus immediately upon receiving the final acceptance email.'
    },
    // Faculties & Academic Programs
    {
        category: 'faculties',
        question: 'What faculties are available for Science Division students?',
        answer: 'Faculty of Medicine, Faculty of Physical Therapy, Faculty of Dentistry, Faculty of Pharmacy, Faculty of Computer Science and Information Technology, Faculty of Business and Economics, Faculty of Mass Communications, and Faculty of Arts & Design.'
    },
    {
        category: 'faculties',
        question: 'What faculties are available for Math Division students?',
        answer: 'Faculty of Engineering, Faculty of Computer Science and Information Technology, Faculty of Business and Economics, Faculty of Mass Communications, and Faculty of Arts & Design.'
    },
    {
        category: 'faculties',
        question: 'What are the requirements for Science Division students applying to the Faculty of Computer Science?',
        answer: 'Students are required to study Advanced Mathematics during their first academic year and must pass the course. Otherwise, they have to transfer to another faculty.'
    },
    {
        category: 'faculties',
        question: 'What is the language of instruction at UEC?',
        answer: 'English language.'
    },
    {
        category: 'faculties',
        question: 'Which professional syndicates are graduates eligible to join?',
        answer: 'Medicine → Egyptian Medical Syndicate | Physical Therapy → General Physical Therapy Syndicate | Dentistry → Egyptian Dental Syndicate | Pharmacy → Egyptian Pharmacists Syndicate | Engineering → Egyptian Engineering Syndicate | Computer Science → Egyptian Syndicate of Scientific Professions | Economics & Business → Syndicate of Commercial Professions | Mass Communications → Media Syndicate | Arts & Design → Fine Artists Syndicate.'
    },
    {
        category: 'faculties',
        question: 'How many years is the Medicine program?',
        answer: 'Five years plus two years of compulsory internship. Visit the <a href="/requirements/medicine" class="faq-link">Faculty of Medicine</a> page for details.'
    },
    {
        category: 'faculties',
        question: 'How many years is the Physical Therapy program?',
        answer: 'Five years plus a compulsory internship year.'
    },
    {
        category: 'faculties',
        question: 'How many years is the Dentistry program?',
        answer: 'Five years plus a compulsory internship year.'
    },
    {
        category: 'faculties',
        question: 'How many years is the Pharmacy program?',
        answer: 'Five years plus a compulsory internship year.'
    },
    {
        category: 'faculties',
        question: 'How many years is the Computer Science program?',
        answer: 'Four years.'
    },
    {
        category: 'faculties',
        question: 'How many years is the Economics and Business program?',
        answer: 'Four years.'
    },
    {
        category: 'faculties',
        question: 'How many years is the Mass Communications program?',
        answer: 'Four years.'
    },
    {
        category: 'faculties',
        question: 'How many years is the Arts and Design program?',
        answer: 'Four years.'
    },
    // Tuition Fees, Scholarships & Refunds
    {
        category: 'tuition',
        question: 'How can I pay the fees?',
        answer: 'Payments for new applicants are accepted only after receiving a payment order from the Admissions Office.'
    },
    {
        category: 'tuition',
        question: 'Can tuition fees be paid in installments?',
        answer: 'Yes, installment plans are available.'
    },
    {
        category: 'tuition',
        question: 'What are the tuition fees for UEC faculties?',
        answer: 'Please visit the <a href="/tuition" class="faq-link">Tuition & Fees page</a> on the UEC website for detailed fee information.'
    },
    {
        category: 'tuition',
        question: 'Are there any scholarships?',
        answer: 'Yes. For more information, please contact the Admissions Office.'
    },
    {
        category: 'tuition',
        question: 'Are sports scholarships available?',
        answer: 'Yes. For more information, please contact the Admissions Office.'
    },
    {
        category: 'tuition',
        question: 'Is there a sibling discount?',
        answer: 'Yes. For more information, please contact the Admissions Office.'
    },
    {
        category: 'tuition',
        question: 'Are there special discounts for dependents of faculty members, syndicate members, police officers, military officers, and judges?',
        answer: 'Yes. For more information, please contact the Admissions Office.'
    },
    // Campus
    {
        category: 'campus',
        question: 'Is there a hospital on campus?',
        answer: 'Yes. The university educational hospital is available on campus. You can view the facility in our <a href="/campus-tour" class="faq-link">Virtual Campus Tour</a>.'
    },
];
