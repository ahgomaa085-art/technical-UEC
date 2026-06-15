import HRView from './HRView';

export const metadata = {
    title: 'HR Recruitment Pipeline | UEC Dashboard',
    description: 'Manage academic and administrative job applications.',
};

export default function HRPage() {
    return (
        <main className="dashboard-content">
            <HRView />
        </main>
    );
}
