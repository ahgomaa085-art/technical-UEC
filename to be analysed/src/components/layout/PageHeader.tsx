import Image from 'next/image';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    bgImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, bgImage }) => {
    return (
        <section
            className="hero"
            style={{
                minHeight: bgImage ? 'unset' : '40vh',
                height: bgImage ? 'auto' : '40vh',
                aspectRatio: bgImage ? '16 / 9' : 'auto',
                justifyContent: bgImage ? 'flex-end' : 'center',
                overflow: 'hidden'
            }}
        >
            <div className="hero-bg">
                {bgImage ? (
                    <Image
                        src={bgImage}
                        alt={title}
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                        sizes="100vw"
                    />
                ) : (
                    <div className="hero-slide hero-slide-1"></div>
                )}
                {!bgImage && <div className="hero-overlay"></div>}
            </div>
            {!bgImage && (
                <div className="hero-content" style={{ padding: '40px 48px' }}>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(28px, 6vw, 48px)', wordBreak: 'break-word' }}>
                        {title}
                    </h1>
                    {subtitle && <p className="hero-sub" style={{ marginBottom: 0 }}>{subtitle}</p>}
                </div>
            )}
        </section>
    );
};

export default PageHeader;
