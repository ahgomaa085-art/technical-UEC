'use client';

import React from 'react';

interface TourTriggerProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const TourTrigger: React.FC<TourTriggerProps> = ({ children, className, style }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-virtual-tour'));
    };

    return (
        <div
            onClick={handleClick}
            className={className}
            style={{ ...style, cursor: 'pointer' }}
        >
            {children}
        </div>
    );
};

export default TourTrigger;
