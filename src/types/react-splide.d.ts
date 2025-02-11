declare module '@splidejs/react-splide' {
    import { ComponentType } from 'react';
    import { Options } from '@splidejs/splide';

    export interface SplideProps {
        options?: Options;
        extensions?: Record<string, unknown>; // Add the extensions property
        children?: React.ReactNode;
    }

    export const Splide: ComponentType<SplideProps>;
    export const SplideSlide: ComponentType<{ children?: React.ReactNode }>;
}
