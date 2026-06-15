"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid email or password');
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <PageHeader title="Staff Login" subtitle="Access the UEC portal and management system." />
            <section className="section" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <form className="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--navy)' }}>Email Address</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="staff@uec.edu.eg"
                            style={{ padding: '14px', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--navy)' }}>Password</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ padding: '14px', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none' }}
                        />
                    </div>

                    {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

                    <button
                        disabled={loading}
                        className="btn-apply-main"
                        type="submit"
                        style={{ cursor: 'pointer', border: 'none', textAlign: 'center', justifyContent: 'center' }}
                    >
                        {loading ? 'Authenticating...' : 'Sign In →'}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default LoginPage;
