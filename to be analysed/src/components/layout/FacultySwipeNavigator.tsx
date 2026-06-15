'use client';
import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const FACULTY_ORDER = [
    'medicine',
    'dentistry',
    'pharmacy',
    'physical-therapy',
    'engineering',
    'computer-science',
    'business-economics',
    'art-design',
    'mass-communication',
];

interface FacultySwipeNavigatorProps {
    currentSlug: string;
    children: React.ReactNode;
}

export default function FacultySwipeNavigator({ currentSlug, children }: FacultySwipeNavigatorProps) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const isNavigating = useRef(false);
    const wheelAccumulator = useRef(0);
    const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

    const currentIndex = FACULTY_ORDER.indexOf(currentSlug);

    const navigateTo = useCallback((direction: 'prev' | 'next') => {
        if (isNavigating.current || currentIndex === -1) return;

        const targetIndex = direction === 'next'
            ? (currentIndex + 1) % FACULTY_ORDER.length
            : (currentIndex - 1 + FACULTY_ORDER.length) % FACULTY_ORDER.length;

        isNavigating.current = true;
        router.push(`/departments/${FACULTY_ORDER[targetIndex]}`);

        // Reset after navigation completes
        setTimeout(() => { isNavigating.current = false; }, 1000);
    }, [currentIndex, router]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || currentIndex === -1) return;

        // --- Touch swipe handlers ---
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            touchEndX.current = e.changedTouches[0].screenX;
            const diff = touchStartX.current - touchEndX.current;
            const MIN_SWIPE = 60;

            if (Math.abs(diff) > MIN_SWIPE) {
                navigateTo(diff > 0 ? 'next' : 'prev');
            }
        };

        // --- Trackpad horizontal scroll handler ---
        const handleWheel = (e: WheelEvent) => {
            // Only respond to horizontal scroll (trackpad gesture)
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
            if (Math.abs(e.deltaX) < 5) return;

            e.preventDefault();
            wheelAccumulator.current += e.deltaX;

            if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
            wheelTimeout.current = setTimeout(() => {
                const THRESHOLD = 80;
                if (Math.abs(wheelAccumulator.current) > THRESHOLD) {
                    navigateTo(wheelAccumulator.current > 0 ? 'next' : 'prev');
                }
                wheelAccumulator.current = 0;
            }, 150);
        };

        el.addEventListener('touchstart', handleTouchStart, { passive: true });
        el.addEventListener('touchend', handleTouchEnd, { passive: true });
        el.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            el.removeEventListener('touchstart', handleTouchStart);
            el.removeEventListener('touchend', handleTouchEnd);
            el.removeEventListener('wheel', handleWheel);
            if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
        };
    }, [currentIndex, navigateTo]);

    if (currentIndex === -1) {
        return <>{children}</>;
    }

    const prevIndex = (currentIndex - 1 + FACULTY_ORDER.length) % FACULTY_ORDER.length;
    const nextIndex = (currentIndex + 1) % FACULTY_ORDER.length;

    const formatName = (slug: string) =>
        slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            {children}

            {/* Navigation arrows */}
            <button
                onClick={() => navigateTo('prev')}
                aria-label={`Previous: ${formatName(FACULTY_ORDER[prevIndex])}`}
                style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(10, 31, 60, 0.65)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(10, 31, 60, 0.9)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(10, 31, 60, 0.65)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
            >
                ‹
            </button>

            <button
                onClick={() => navigateTo('next')}
                aria-label={`Next: ${formatName(FACULTY_ORDER[nextIndex])}`}
                style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'rgba(10, 31, 60, 0.65)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(10, 31, 60, 0.9)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(10, 31, 60, 0.65)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
            >
                ›
            </button>

        </div>
    );
}
