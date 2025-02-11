import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2, // Duration of the scroll animation
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
            smoothWheel: true, // Enable smooth scrolling
            touchMultiplier: 2, // Multiplier for touch scroll speed
        });

        // Update Lenis on each frame
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Clean up Lenis on unmount
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
