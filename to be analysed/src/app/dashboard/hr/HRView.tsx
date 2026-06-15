'use client';
import React, { useState, useEffect } from 'react';
import RevealScript from '@/components/layout/RevealScript';

type Application = {
    id: string;
    type: string;
    fullName: string;
    email: string;
    phone: string;
    nationalId: string;
    position: string;
    department: string;
    data: any;
    cvUrl: string;
    photoUrl: string;
    status: string;
    createdAt: string;
};

export default function HRView() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ type: 'ALL', status: 'ALL', department: 'ALL' });
    const [stats, setStats] = useState({ total: 0, academic: 0, admin: 0, shortlisted: 0 });
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchApplications();
    }, [filter]);

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams(filter);
            const res = await fetch(`/api/admin/careers?${params.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch applications');

            const data = await res.json();
            if (!Array.isArray(data)) throw new Error('Invalid data format');

            setApplications(data);

            if (filter.type === 'ALL' && filter.status === 'ALL' && filter.department === 'ALL') {
                setStats({
                    total: data.length,
                    academic: data.filter((a: any) => a.type === 'ACADEMIC').length,
                    admin: data.filter((a: any) => a.type === 'ADMINISTRATIVE').length,
                    shortlisted: data.filter((a: any) => a.status === 'SHORTLISTED').length,
                });
            }
        } catch (err) {
            console.error(err);
            setError('The recruitment database could not be reached. Please ensure migrations are complete.');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/admin/careers/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            fetchApplications();
            if (selectedApp?.id === id) setSelectedApp({ ...selectedApp, status });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteApplication = async (id: string) => {
        if (!confirm('Are you sure you want to delete this applicant record?')) return;
        try {
            await fetch(`/api/admin/careers/${id}`, { method: 'DELETE' });
            fetchApplications();
            setSelectedApp(null);
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'SHORTLISTED': return { bg: '#e3f2fd', color: '#1565c0' };
            case 'INTERVIEWED': return { bg: '#f3e5f5', color: '#7b1fa2' };
            case 'HIRED': return { bg: '#e8f5e9', color: '#2e7d32' };
            case 'REJECTED': return { bg: '#ffebee', color: '#c62828' };
            default: return { bg: '#f5f5f5', color: '#666' };
        }
    };

    return (
        <div style={{ paddingBottom: '100px', fontFamily: '"Lato", sans-serif' }}>
            <RevealScript />

            <style dangerouslySetInnerHTML={{
                __html: `
                .crm-container { max-width: 1400px; margin: 0 auto; }
                .crm-header { display: flex; justifyContent: space-between; align-items: flex-end; margin-bottom: 40px; }
                .crm-header h1 { color: #0a1f3c; fontSize: 36px; fontWeight: 900; margin: 0; letter-spacing: -0.5px; }
                .crm-header p { color: #64748b; fontSize: 16px; marginTop: 8px; }
                
                .crm-card {
                    background: #fff;
                    border: 1px solid #eef2f6;
                    border-radius: 20px;
                    padding: 24px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
                    transition: transform 0.2s;
                }
                .crm-card:hover { transform: translateY(-4px); }
                .stat-value { font-size: 32px; font-weight: 800; margin: 10px 0; color: #0a1f3c; }
                .stat-label { font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
                
                .crm-filters { display: flex; gap: 20px; margin-bottom: 30px; }
                .crm-filter-group { display: flex; flex-direction: column; gap: 8px; flex: 1; }
                .crm-filter-group label { font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; }
                .crm-filter-group select { padding: 12px 20px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; outline: none; background: #fff; }
                
                .crm-table-container { background: #fff; border-radius: 20px; border: 1px solid #eef2f6; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
                .crm-table { width: 100%; border-collapse: collapse; }
                .crm-table th { padding: 16px 24px; text-align: left; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; background: #f8fafc; border-bottom: 1px solid #eef2f6; }
                .crm-table td { padding: 20px 24px; border-bottom: 1px solid #f8fafc; vertical-align: middle; }
                
                .status-badge { padding: 6px 12px; border-radius: 100px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                
                .crm-btn-view { padding: 8px 16px; border-radius: 10px; background: #0a1f3c; color: #fff; fontSize: 12px; fontWeight: 700; border: none; cursor: pointer; transition: background 0.2s; }
                .crm-btn-view:hover { background: #1a3c6c; }
                
                .crm-modal-overlay { position: fixed; inset: 0; background: rgba(10,31,60,0.8); display: flex; alignItems: center; justifyContent: center; z-index: 1000; backdrop-filter: blur(10px); }
                .crm-modal-content { background: #fff; width: 90%; maxWidth: 1000px; maxHeight: 85vh; borderRadius: 30px; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,0.5); }
                .crm-modal-header { padding: 24px 32px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
                .crm-modal-header h2 { margin: 0; color: #0a1f3c; font-size: 20px; font-weight: 900; }
                .close-btn { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; }
                .crm-modal-body { padding: 32px; overflow-y: auto; max-height: calc(85vh - 80px); }

                .hr-profile-grid { display: grid; grid-template-columns: 280px 1fr; gap: 40px; }
                .hr-photo-container { background: #f8fafc; padding: 20px; border-radius: 20px; border: 1px solid #eef2f6; }
                .hr-profile-photo { width: 100%; border-radius: 15px; border: 4px solid #fff; box-shadow: 0 10px 20px rgba(0,0,0,0.05); margin-bottom: 20px; }
                .hr-status-selector label { display: block; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 8px; }
                .hr-status-selector select { width: 100%; padding: 12px; border-radius: 12px; font-weight: 700; border: 1px solid #ddd; outline: none; }
                
                .hr-detail-section { margin-bottom: 30px; }
                .hr-detail-section h3 { font-size: 14px; font-weight: 800; color: #0a1f3c; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid var(--gold); padding-left: 12px; margin-bottom: 20px; }
                .hr-json-view { background: #fdfdfd; padding: 20px; border-radius: 15px; border: 1px solid #f1f5f9; }
                .hr-data-row { display: flex; flex-direction: column; margin-bottom: 16px; border-bottom: 1px solid #f8fafc; padding-bottom: 12px; }
                .hr-data-key { font-weight: 800; color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
                .hr-data-value { color: #0a1f3c; margin-top: 6px; line-height: 1.6; font-weight: 500; font-size: 14px; }
                .hr-delete-btn { transition: all 0.2s; cursor: pointer; font-weight: 700; font-size: 12px; }
                .hr-delete-btn:hover { background: #fee2e2 !important; border-color: #ef4444 !important; color: #ef4444 !important; }
            `}} />

            <div className="crm-container">
                <header className="crm-header reveal">
                    <div>
                        <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '14px', marginBottom: '8px' }}>HR RECRUITMENT INTELLIGENCE</div>
                        <h1>Applicant Command Center</h1>
                        <p>Streamlined candidate management for UEC academic and administrative roles.</p>
                    </div>
                    <div>
                        <button onClick={fetchApplications} className="crm-btn-view" style={{ padding: '12px 24px', fontSize: '14px' }}>🔄 Sync Pipeline</button>
                    </div>
                </header>

                <div className="crm-stats-grid reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
                    <div className="crm-card">
                        <div className="stat-label">Total Pipeline</div>
                        <div className="stat-value">{stats.total}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Active records in archive</div>
                    </div>
                    <div className="crm-card">
                        <div className="stat-label">Academic Stream</div>
                        <div className="stat-value" style={{ color: 'var(--gold)' }}>{stats.academic}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Faculty positions</div>
                    </div>
                    <div className="crm-card">
                        <div className="stat-label">Administrative</div>
                        <div className="stat-value" style={{ color: '#0a1f3c' }}>{stats.admin}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Technical & staff rolls</div>
                    </div>
                    <div className="crm-card" style={{ background: 'linear-gradient(135deg, #0a1f3c 0%, #1a3c6c 100%)', border: 'none' }}>
                        <div className="stat-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Shortlisted</div>
                        <div className="stat-value" style={{ color: '#fff' }}>{stats.shortlisted}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Priority for interview</div>
                    </div>
                </div>

                <div className="crm-filters reveal">
                    <div className="crm-filter-group">
                        <label>Application Category</label>
                        <select value={filter.type} onChange={e => setFilter({ ...filter, type: e.target.value })}>
                            <option value="ALL">All Applications</option>
                            <option value="ACADEMIC">Academic / Faculty</option>
                            <option value="ADMINISTRATIVE">Administrative / Staff</option>
                        </select>
                    </div>
                    <div className="crm-filter-group">
                        <label>Recruitment Phase</label>
                        <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
                            <option value="ALL">All Pipeline Phases</option>
                            <option value="PENDING">Pending Review</option>
                            <option value="SHORTLISTED">Shortlisted</option>
                            <option value="INTERVIEWED">Interviewed</option>
                            <option value="HIRED">Accepted / Hired</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="crm-table-container reveal">
                    <table className="crm-table">
                        <thead>
                            <tr>
                                <th>Candidate</th>
                                <th>Assignment / Department</th>
                                <th>Filing Date</th>
                                <th>Phase</th>
                                <th>Assets</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '80px', color: '#94a3b8', fontWeight: 700 }}>
                                    <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
                                    Synchronizing Applicant Data...
                                </td></tr>
                            ) : error ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '80px', color: '#ef4444', fontWeight: 700 }}>
                                    <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️</div>
                                    {error}
                                    <div style={{ fontSize: '13px', marginTop: '10px', fontWeight: 400, color: '#64748b' }}>
                                        Check server console or run <code>npx prisma db push</code> on the production server.
                                    </div>
                                </td></tr>
                            ) : applications.length === 0 ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>
                                    No candidates match the current filter selection.
                                </td></tr>
                            ) : (
                                applications.map(app => (
                                    <tr key={app.id}>
                                        <td>
                                            <div style={{ fontWeight: 800, color: '#0a1f3c' }}>{app.fullName}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>{app.email}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0a1f3c' }}>{app.position}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{app.department}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: '13px', fontWeight: 600 }}>{new Date(app.createdAt).toLocaleDateString()}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td>
                                            <span className="status-badge" style={{
                                                backgroundColor: getStatusStyle(app.status).bg,
                                                color: getStatusStyle(app.status).color
                                            }}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <a href={app.cvUrl} target="_blank" rel="noreferrer" title="View CV" style={{ background: '#f1f5f9', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>📄</a>
                                                <a href={app.photoUrl} target="_blank" rel="noreferrer" title="View Photo" style={{ background: '#f1f5f9', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>📸</a>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="crm-btn-view" onClick={() => setSelectedApp(app)}>Analyze Profile</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {selectedApp && (
                    <div className="crm-modal-overlay" onClick={() => setSelectedApp(null)}>
                        <div className="crm-modal-content" onClick={e => e.stopPropagation()}>
                            <div className="crm-modal-header">
                                <h2>Recruitment Profile: {selectedApp.fullName}</h2>
                                <button className="close-btn" onClick={() => setSelectedApp(null)}>&times;</button>
                            </div>
                            <div className="crm-modal-body">
                                <div className="hr-profile-grid">
                                    <div className="hr-photo-container">
                                        <img src={selectedApp.photoUrl} alt="Applicant" className="hr-profile-photo" />
                                        <div className="hr-status-selector">
                                            <label>Pipeline Action</label>
                                            <select
                                                value={selectedApp.status}
                                                onChange={e => updateStatus(selectedApp.id, e.target.value)}
                                                style={{
                                                    backgroundColor: getStatusStyle(selectedApp.status).bg,
                                                    color: getStatusStyle(selectedApp.status).color,
                                                    border: 'none',
                                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                                }}
                                            >
                                                <option value="PENDING">Pending Review</option>
                                                <option value="SHORTLISTED">Shortlist for Interview</option>
                                                <option value="INTERVIEWED">Mark as Interviewed</option>
                                                <option value="HIRED">Approve for Hire</option>
                                                <option value="REJECTED">Reject Application</option>
                                            </select>
                                        </div>
                                        <div style={{ marginTop: '24px', padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #eef2f6' }}>
                                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>CONTACT PREVIEW</div>
                                            <div style={{ fontSize: '13px', fontWeight: 700, margin: '8px 0' }}>{selectedApp.phone}</div>
                                            <div style={{ fontSize: '13px', color: '#64748b' }}>{selectedApp.email}</div>
                                        </div>
                                        <button
                                            className="hr-delete-btn"
                                            onClick={() => deleteApplication(selectedApp.id)}
                                            style={{ marginTop: '20px', width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #fee2e2', color: '#ef4444', background: '#fff' }}
                                        >
                                            Purge Application Record
                                        </button>
                                    </div>
                                    <div className="hr-details-container">
                                        <div className="hr-detail-section">
                                            <h3>Primary Qualifications</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                <div>
                                                    <div className="hr-data-key">National Identifier</div>
                                                    <div className="hr-data-value">{selectedApp.nationalId}</div>
                                                </div>
                                                <div>
                                                    <div className="hr-data-key">Verification Links</div>
                                                    <div className="hr-data-value">
                                                        <a href={selectedApp.cvUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--gold)', fontWeight: 800, textDecoration: 'none' }}>
                                                            Download PDF Resume ↗
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hr-detail-section">
                                            <h3>Comprehensive Application Data</h3>
                                            <div className="hr-json-view">
                                                {Object.entries(selectedApp.data).map(([key, value]: [string, any]) => (
                                                    <div key={key} className="hr-data-row">
                                                        <span className="hr-data-key">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                                        <span className="hr-data-value">{value?.toString() || '—'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
