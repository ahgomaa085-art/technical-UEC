"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackInteraction } from '@/utils/tracking';

export default function JourneyTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Track the current page view
        const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
        trackInteraction('PAGE_VIEW', fullPath);
    }, [pathname, searchParams]);

    return null; // This component doesn't render anything
}
