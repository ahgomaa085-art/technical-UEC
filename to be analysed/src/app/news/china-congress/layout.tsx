import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UEC at the Heart of the Global Digital Education Landscape | University of East Capital',
    description: 'Participation of the University of East Capital in the World Digital Education Alliance (WDEA) Annual Conference.',
};

export default function ChinaCongressLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
