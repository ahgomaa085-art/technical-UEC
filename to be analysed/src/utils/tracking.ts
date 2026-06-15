
/**
 * Simple behavioral tracking utility for UEC
 * Stores interaction history in session storage to be synced with lead capture
 */

const STORAGE_KEY = 'uec_visitor_journey';

export const trackInteraction = (type: string, value: string) => {
    try {
        if (typeof window === 'undefined') return;

        const journey = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
        const interaction = {
            type,
            value,
            timestamp: new Date().toISOString()
        };

        // Keep only last 20 interactions to avoid bloating
        const updatedJourney = [...journey, interaction].slice(-20);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJourney));
    } catch (e) {
        console.error('Tracking interaction failed', e);
    }
};

export const getVisitorJourney = () => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
};

export const clearVisitorJourney = () => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(STORAGE_KEY);
};
