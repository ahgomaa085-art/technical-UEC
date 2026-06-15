'use client';
import React, { useState, useRef } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import RevealScript from '@/components/layout/RevealScript';
import Link from 'next/link';

const DEPARTMENTS = [
    'Finance & Accounting',
    'Human Resources',
    'Student Affairs',
    'IT & Technical Services',
    'Facilities & Maintenance',
    'Marketing & Communications',
    'Library Services',
    'Admissions & Registration',
    'Legal Affairs',
    'Procurement & Supply Chain',
    'Quality Assurance',
    'Other',
];

export default function AdministrativeApplicationPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        nationalId: '',
        dateOfBirth: '',
        nationality: '',
        gender: '',
        maritalStatus: '',
        address: '',
        phone: '',
        email: '',
        currentEmployer: '',
        currentTitle: '',
        yearsExperience: '',
        departmentInterest: '',
        expectedSalary: '',
        noticePeriod: '',
        highestDegree: '',
        university: '',
        graduationYear: '',
        gpa: '',
        major: '',
        whyUEC: '',
        challengingSituation: '',
        valueYouBring: '',
        codeOfConduct: false,
        declaration: false,
    });

    const [cvFile, setCvFile] = useState<File | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [referenceId, setReferenceId] = useState('');
    const cvRef = useRef<HTMLInputElement>(null);
    const photoRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    };

    const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            setErrors(prev => ({ ...prev, cv: 'Only PDF files are accepted.' }));
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, cv: 'File size must not exceed 5MB.' }));
            return;
        }
        setCvFile(file);
        setErrors(prev => { const n = { ...prev }; delete n.cv; return n; });
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            setErrors(prev => ({ ...prev, photo: 'Only JPG or PNG files are accepted.' }));
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, photo: 'File size must not exceed 2MB.' }));
            return;
        }
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
        setErrors(prev => { const n = { ...prev }; delete n.photo; return n; });
    };

    const validate = (): boolean => {
        const e: Record<string, string> = {};
        const required: [string, string][] = [
            ['fullName', 'Full name is required'],
            ['nationalId', 'National ID is required'],
            ['dateOfBirth', 'Date of birth is required'],
            ['nationality', 'Nationality is required'],
            ['gender', 'Gender is required'],
            ['maritalStatus', 'Marital status is required'],
            ['address', 'Address is required'],
            ['phone', 'Phone number is required'],
            ['email', 'Email address is required'],
            ['yearsExperience', 'Years of experience is required'],
            ['departmentInterest', 'Please select a department'],
            ['highestDegree', 'Highest degree is required'],
            ['university', 'University name is required'],
            ['graduationYear', 'Graduation year is required'],
            ['major', 'Major/field of study is required'],
        ];

        for (const [key, msg] of required) {
            if (!formData[key as keyof typeof formData]) e[key] = msg;
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            e.email = 'Please enter a valid email address';
        }

        if (formData.whyUEC.length < 100) e.whyUEC = `Minimum 100 characters required (${formData.whyUEC.length}/100)`;
        if (formData.challengingSituation.length < 150) e.challengingSituation = `Minimum 150 characters required (${formData.challengingSituation.length}/150)`;
        if (formData.valueYouBring.length < 100) e.valueYouBring = `Minimum 100 characters required (${formData.valueYouBring.length}/100)`;

        if (!formData.codeOfConduct) e.codeOfConduct = 'You must agree to the Code of Conduct';
        if (!formData.declaration) e.declaration = 'You must confirm the declaration';
        if (!cvFile) e.cv = 'CV/Resume upload is required';
        if (!photoFile) e.photo = 'Professional photo is required';

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                const submitData = new FormData();
                submitData.append('type', 'ADMINISTRATIVE');
                submitData.append('fullName', formData.fullName);
                submitData.append('email', formData.email);
                submitData.append('phone', formData.phone);
                submitData.append('nationalId', formData.nationalId);
                submitData.append('position', 'Staff'); // Default for admin
                submitData.append('department', formData.departmentInterest);
                if (cvFile) submitData.append('cv', cvFile);
                if (photoFile) submitData.append('photo', photoFile);

                Object.entries(formData).forEach(([key, value]) => {
                    if (!['fullName', 'email', 'phone', 'nationalId', 'departmentInterest'].includes(key)) {
                        submitData.append(key, value.toString());
                    }
                });

                const response = await fetch('/api/careers/apply', {
                    method: 'POST',
                    body: submitData
                });

                const result = await response.json();
                if (result.success) {
                    setReferenceId(result.reference);
                    setSubmitted(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    alert('Submission failed. Please try again.');
                }
            } catch (err) {
                console.error(err);
                alert('An error occurred. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            const firstError = document.querySelector('.career-field-error');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    if (submitted) {
        return (
            <main>
                <RevealScript />
                <PageHeader title="Application Submitted" subtitle="Administrative Positions" />
                <section className="section">
                    <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
                        <div className="reveal" style={{ background: 'rgba(10,31,60,0.03)', padding: '60px 40px', borderRadius: '20px', border: '1px solid rgba(10,31,60,0.08)' }}>
                            <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
                            <h2 style={{ color: 'var(--navy)', marginBottom: '15px' }}>Thank You for Your Application</h2>
                            <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '30px' }}>
                                Your application for an Administrative position at the University of East Capital
                                has been received and forwarded to our HR department (Rnabil@uec.edu.eg).
                                Our team will review your application and only shortlisted candidates will be contacted.
                            </p>
                            <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '30px', fontWeight: 700 }}>
                                Reference ID: {referenceId}
                            </p>
                            <Link href="/careers" style={{ background: 'var(--navy)', color: 'white', padding: '14px 30px', borderRadius: '10px', fontWeight: '700', textDecoration: 'none' }}>
                                ← Back to Careers
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <RevealScript />
            <PageHeader title="Administrative Positions" subtitle="Career Application — University of East Capital" />

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="reveal" style={{ marginBottom: '10px' }}>
                        <Link href="/careers" style={{ color: 'var(--muted)', fontSize: '0.95rem', textDecoration: 'none' }}>← Back to Careers</Link>
                    </div>

                    <div className="reveal career-form-intro">
                        <h2>Application for Administrative &amp; Support Staff Positions</h2>
                        <p>
                            Please complete all sections of this application form carefully.
                            Incomplete or improperly filled applications will not be considered.
                            All fields marked with <span className="career-required-star">*</span> are mandatory.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* ─── SECTION 1: Personal Information ─── */}
                        <div className="reveal career-form-section">
                            <div className="career-section-header">
                                <span className="career-section-number">01</span>
                                <div>
                                    <h3>Personal Information</h3>
                                    <p>Provide your full legal details as they appear on your official documents.</p>
                                </div>
                            </div>
                            <div className="career-form-grid">
                                <div className="career-field career-field-full">
                                    <label>Full Name (as per National ID) <span className="career-required-star">*</span></label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full legal name" />
                                    {errors.fullName && <div className="career-field-error">{errors.fullName}</div>}
                                </div>
                                <div className="career-field">
                                    <label>National ID Number <span className="career-required-star">*</span></label>
                                    <input type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} placeholder="14-digit national ID" maxLength={14} />
                                    {errors.nationalId && <div className="career-field-error">{errors.nationalId}</div>}
                                </div>
                                <div className="career-field">
                                    <label>Date of Birth <span className="career-required-star">*</span></label>
                                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                                    {errors.dateOfBirth && <div className="career-field-error">{errors.dateOfBirth}</div>}
                                </div>
                                <div className="career-field">
                                    <label>Nationality <span className="career-required-star">*</span></label>
                                    <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="e.g. Egyptian" />
                                    {errors.nationality && <div className="career-field-error">{errors.nationality}</div>}
                                </div>
                                <div className="career-field">
                                    <label>Gender <span className="career-required-star">*</span></label>
                                    <select name="gender" value={formData.gender} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && <div className="career-field-error">{errors.gender}</div>}
                                </div>
                                <div className="career-field">
                                    <label>Marital Status <span className="career-required-star">*</span></label>
                                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="widowed">Widowed</option>
                                    </select>
                                    {errors.maritalStatus && <div className="career-field-error">{errors.maritalStatus}</div>}
                                </div>
                                <div className="career-field career-field-full">
                                    <label>Residential Address <span className="career-required-star">*</span></label>
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Full address including city and governorate" />
                                    {errors.address && <div className="career-field-error">{errors.address}</div>}
                                </div>
                                <div className="career-field">
                                    <label>Mobile Phone <span className="career-required-star">*</span></label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 01xxxxxxxxx" />
                                    {errors.phone && <div className="career-field-error">{errors.phone}</div>}
                                </div>
                                <div className="career-field">
                                    <label>Email Address <span className="career-required-star">*</span></label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" />
                                    {errors.email && <div className="career-field-error">{errors.email}</div>}
                                </div>
                            </div>
                        </div>

                        {/* ─── SECTION 2: Professional Background ─── */}
                        <div className="reveal career-form-section">
                            <div className="career-section-header">
                                <span className="career-section-number">02</span>
                                <div>
                                    <h3>Professional Background</h3>
                                    <p>Detail your current or most recent employment and career objectives.</p>
                                </div>
                            </div>
                            <div className="career-form-grid">
                                <div className="career-field">
                                    <label>Current / Most Recent Employer</label>
                                    <input type="text" name="currentEmployer" value={formData.currentEmployer} onChange={handleChange} placeholder="Company or academic entity name" />
                                </div>
                                <div className="career-field">
                                    <label>Current Job Title</label>
                                    <input type="text" name="currentTitle" value={formData.currentTitle} onChange={handleChange} placeholder="e.g. Senior Accountant" />
                                </div>
                                <div className="career-field">
                                    <label>Total Years of Experience <span className="career-required-star">*</span></label>
                                    <select name="yearsExperience" value={formData.yearsExperience} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option value="0-1">Less than 1 year</option>
                                        <option value="1-3">1 – 3 years</option>
                                        <option value="3-5">3 – 5 years</option>
                                        <option value="5-10">5 – 10 years</option>
                                        <option value="10+">10+ years</option>
                                    </select>
                                    {errors.yearsExperience && <div className="career-field-error">{errors.yearsExperience}</div>}
                                </div>
                                <div className="career-field">
                                    <label>Department of Interest <span className="career-required-star">*</span></label>
                                    <select name="departmentInterest" value={formData.departmentInterest} onChange={handleChange}>
                                        <option value="">Select Department</option>
                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    {errors.departmentInterest && <div className="career-field-error">{errors.departmentInterest}</div>}
                                </div>
                                <div className="career-field">
                                    <label>Expected Monthly Salary (EGP)</label>
                                    <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} placeholder="e.g. 15,000" />
                                </div>
                                <div className="career-field">
                                    <label>Notice Period</label>
                                    <select name="noticePeriod" value={formData.noticePeriod} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option value="immediate">Immediately available</option>
                                        <option value="2-weeks">2 weeks</option>
                                        <option value="1-month">1 month</option>
                                        <option value="2-months">2 months</option>
                                        <option value="3-months">3+ months</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* ─── SECTION 3: Education ─── */}
                        <div className="reveal career-form-section">
                            <div className="career-section-header">
                                <span className="career-section-number">03</span>
                                <div>
                                    <h3>Educational Qualifications</h3>
                                    <p>Provide details of your highest academic qualification.</p>
                                </div>
                            </div>
                            <div className="career-form-grid">
                                <div className="career-field">
                                    <label>Highest Degree Obtained <span className="career-required-star">*</span></label>
                                    <select name="highestDegree" value={formData.highestDegree} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option value="high-school">High School Diploma</option>
                                        <option value="diploma">Technical Diploma</option>
                                        <option value="bachelor">Bachelor&apos;s Degree</option>
                                        <option value="master">Master&apos;s Degree</option>
                                        <option value="doctorate">Doctorate (PhD)</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.highestDegree && <div className="career-field-error">{errors.highestDegree}</div>}
                                </div>
                                <div className="career-field">
                                    <label>University / Academic Entity <span className="career-required-star">*</span></label>
                                    <input type="text" name="university" value={formData.university} onChange={handleChange} placeholder="Name of university" />
                                    {errors.university && <div className="career-field-error">{errors.university}</div>}
                                </div>
                                <div className="career-field">
                                    <label>Graduation Year <span className="career-required-star">*</span></label>
                                    <input type="text" name="graduationYear" value={formData.graduationYear} onChange={handleChange} placeholder="e.g. 2020" maxLength={4} />
                                    {errors.graduationYear && <div className="career-field-error">{errors.graduationYear}</div>}
                                </div>
                                <div className="career-field">
                                    <label>GPA / Grade</label>
                                    <input type="text" name="gpa" value={formData.gpa} onChange={handleChange} placeholder="e.g. 3.5 / 4.0 or Very Good" />
                                </div>
                                <div className="career-field career-field-full">
                                    <label>Major / Field of Study <span className="career-required-star">*</span></label>
                                    <input type="text" name="major" value={formData.major} onChange={handleChange} placeholder="e.g. Business Administration" />
                                    {errors.major && <div className="career-field-error">{errors.major}</div>}
                                </div>
                            </div>
                        </div>

                        {/* ─── SECTION 4: Screening Questions ─── */}
                        <div className="reveal career-form-section">
                            <div className="career-section-header">
                                <span className="career-section-number">04</span>
                                <div>
                                    <h3>Professional Assessment</h3>
                                    <p>Answer the following questions thoughtfully. These responses are critical to your evaluation.</p>
                                </div>
                            </div>
                            <div className="career-form-grid">
                                <div className="career-field career-field-full">
                                    <label>Why do you want to work at the University of East Capital? <span className="career-required-star">*</span></label>
                                    <textarea name="whyUEC" value={formData.whyUEC} onChange={handleChange} rows={4} placeholder="Provide a detailed response explaining your motivation for joining UEC (minimum 100 characters)..." />
                                    <div className="career-char-count" style={{ color: formData.whyUEC.length >= 100 ? '#2e7d32' : '#999' }}>
                                        {formData.whyUEC.length} / 100 characters minimum
                                    </div>
                                    {errors.whyUEC && <div className="career-field-error">{errors.whyUEC}</div>}
                                </div>
                                <div className="career-field career-field-full">
                                    <label>Describe a challenging situation you faced in a previous role and how you resolved it. <span className="career-required-star">*</span></label>
                                    <textarea name="challengingSituation" value={formData.challengingSituation} onChange={handleChange} rows={5} placeholder="Demonstrate your problem-solving skills and professional maturity (minimum 150 characters)..." />
                                    <div className="career-char-count" style={{ color: formData.challengingSituation.length >= 150 ? '#2e7d32' : '#999' }}>
                                        {formData.challengingSituation.length} / 150 characters minimum
                                    </div>
                                    {errors.challengingSituation && <div className="career-field-error">{errors.challengingSituation}</div>}
                                </div>
                                <div className="career-field career-field-full">
                                    <label>What value can you bring to the University of East Capital? <span className="career-required-star">*</span></label>
                                    <textarea name="valueYouBring" value={formData.valueYouBring} onChange={handleChange} rows={4} placeholder="Explain the unique skills, experience, or perspective you would contribute (minimum 100 characters)..." />
                                    <div className="career-char-count" style={{ color: formData.valueYouBring.length >= 100 ? '#2e7d32' : '#999' }}>
                                        {formData.valueYouBring.length} / 100 characters minimum
                                    </div>
                                    {errors.valueYouBring && <div className="career-field-error">{errors.valueYouBring}</div>}
                                </div>
                            </div>
                        </div>

                        {/* ─── SECTION 5: Uploads ─── */}
                        <div className="reveal career-form-section">
                            <div className="career-section-header">
                                <span className="career-section-number">05</span>
                                <div>
                                    <h3>Document Uploads</h3>
                                    <p>Upload your CV/Resume and a recent professional photograph.</p>
                                </div>
                            </div>
                            <div className="career-upload-grid">
                                <div className="career-upload-zone" onClick={() => cvRef.current?.click()}>
                                    <input ref={cvRef} type="file" accept=".pdf" onChange={handleCvUpload} style={{ display: 'none' }} />
                                    <div className="career-upload-icon">📄</div>
                                    <div className="career-upload-title">CV / Resume</div>
                                    <div className="career-upload-hint">PDF only · Max 5MB</div>
                                    {cvFile && <div className="career-upload-filename">✅ {cvFile.name}</div>}
                                    {errors.cv && <div className="career-field-error">{errors.cv}</div>}
                                </div>
                                <div className="career-upload-zone career-upload-photo" onClick={() => photoRef.current?.click()}>
                                    <input ref={photoRef} type="file" accept=".jpg,.jpeg,.png" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Preview" className="career-photo-preview" />
                                    ) : (
                                        <>
                                            <div className="career-upload-icon">📸</div>
                                            <div className="career-upload-title">Professional Photo</div>
                                            <div className="career-upload-hint">JPG or PNG · Max 2MB</div>
                                        </>
                                    )}
                                    {errors.photo && <div className="career-field-error">{errors.photo}</div>}
                                </div>
                            </div>
                        </div>

                        {/* ─── SECTION 6: Declaration ─── */}
                        <div className="reveal career-form-section">
                            <div className="career-section-header">
                                <span className="career-section-number">06</span>
                                <div>
                                    <h3>Declaration &amp; Commitment</h3>
                                    <p>Please read and confirm the following before submitting.</p>
                                </div>
                            </div>
                            <div className="career-declaration-box">
                                <label className="career-checkbox-label">
                                    <input type="checkbox" name="codeOfConduct" checked={formData.codeOfConduct} onChange={handleChange} />
                                    <span>I confirm that I am willing to comply with the University of East Capital&apos;s Code of Conduct, academic based policies, and professional standards. <span className="career-required-star">*</span></span>
                                </label>
                                {errors.codeOfConduct && <div className="career-field-error">{errors.codeOfConduct}</div>}
                                <label className="career-checkbox-label" style={{ marginTop: '15px' }}>
                                    <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} />
                                    <span>I hereby declare that all information provided in this application is accurate and complete to the best of my knowledge. I understand that any false information may result in disqualification or termination. <span className="career-required-star">*</span></span>
                                </label>
                                {errors.declaration && <div className="career-field-error">{errors.declaration}</div>}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="reveal" style={{ textAlign: 'center', marginTop: '40px' }}>
                            {Object.keys(errors).length > 0 && (
                                <div className="career-error-summary">
                                    ⚠️ Please correct {Object.keys(errors).length} error(s) above before submitting.
                                </div>
                            )}
                            <button type="submit" className="career-submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                            <p style={{ marginTop: '15px', color: '#999', fontSize: '0.85rem' }}>
                                By submitting, you agree to UEC&apos;s data protection and privacy policies.
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
