import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Options } from '@splidejs/splide';

const SplideOptions: Options = {
    type: 'loop', // Enable infinite loop
    perPage: 6, // Show 5 slides at a time (change to 6 if needed)
    perMove: 1, // Move only 1 slide per transition
    arrows: false,
    pagination: false,
    interval: 10000, // Time between slides (10 seconds)
    autoplay: true,
    speed: 800, // Smooth transition duration (800ms)
    pauseOnHover: true, // Don't pause on hover
    easing: 'ease-in-out', // Smooth transition effect
    gap: '1rem',
    mediaQuery: 'max', // Ensures responsiveness works properly
    breakpoints: {
        1432: { perPage: 5, gap: '0.5rem' }, // Show 4 slides at a time for screens <= 1200px
        1315: { perPage: 4, gap: '0rem' },
        1066: { perPage: 3 },
        816: { perPage: 2 },
        635: { perPage: 1 },
    },
};

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    h2 {
        font-size: 1.5rem;
    }
    @media (max-width: 655px) {
        h2 {
            font-size: 1rem;
        }
    }
`;

const Wrapper = styled.div`
    padding: 2rem;
    width: 100%;
    h2 {
        letter-spacing: 2px;
        font-weight: 600;
    }
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7em;
    margin-top: 50px;
    width: 100%;
    @media (max-width: 1432px) {
        width: 90%;
    }
`;

const Card = styled.div`
    position: relative;
    width: 100%;
    height: 375px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        img {
            transform: scale(1.2);
        }
    }
    img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        transition: 0.5s;

        object-fit: cover;
        object-position: center;
        display: block;
    }

    .overlay {
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translateX(-50%);
        width: 0%;
        height: 0%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        border-radius: 10px;
        transition: 0.5s;
        svg {
            transform: scale(0);
            transition: 0.7s;
        }
    }

    &:hover .overlay {
        opacity: 1;
        width: 100%;
        height: 100%;
        &:hover svg {
            transform: scale(1.05);
        }
    }

    .overlay svg {
        color: white;
        font-size: 40px;
    }
`;

const MovieTitle = styled.p`
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 18px;
    text-align: center;
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    padding: 1em 2.5em;
    font-size: 1rem;
    border-radius: 40px;
    border: none;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;

    gap: 5px;
    color: white;
    background-color: transparent;
    &:hover {
        cursor: pointer;
        background-color: var(--2ndPrimary);
        transform: translateY(-5px);
    }
    @media (max-width: 655px) {
        padding: 1em 1.2em;
    }
`;

const Genre = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    white-space: nowrap;
    gap: 3em;
    letter-spacing: 2px;

    p {
        border: 1px solid var(--primary);
        padding: 0.5em 1em;
        border-radius: 20px;
    }
    margin-left: 1em;
    @media (max-width: 903px) {
        gap: 1em;
    }
    @media (max-width: 592px) {
        white-space: pre-wrap;
    }
    @media (max-width: 360px) {
        font-size: 0.9em;
        margin-left: 5rem;
    }
`;

export {
    Card,
    Wrapper,
    FlexContainer,
    MovieTitle,
    CardContainer,
    StyledLink,
    Genre,
    SplideOptions,
};
