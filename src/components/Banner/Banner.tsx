import { useState, useRef } from 'react';
import styled from 'styled-components';
import { IoPlay, IoClose } from 'react-icons/io5';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import {
    useGetBannerMoviesQuery,
    useGetBannerTrailerQuery,
} from '../../state/apiSlice';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import SmoothScroll from '../ScrollingComponent/SmoothScroll';
import { Link } from 'react-router-dom';

function Banner() {
    const trailer = useRef<HTMLDivElement | null>(null);
    const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
    const { data: trailerData } = useGetBannerTrailerQuery(
        selectedMovieId ?? ''
    );
    const { data } = useGetBannerMoviesQuery();

    const filteredTrailers = trailerData?.results.filter((trailer) => {
        return trailer.type === 'Trailer';
    });

    const getImageUrl = (path: string) => {
        return path ? `https://image.tmdb.org/t/p/original${path}` : ''; // Fallback image
    };

    const getPosterUrl = (
        path: string,
        size: 'original' | 'w560' = 'original'
    ) => {
        return path ? `https://image.tmdb.org/t/p/${size}${path}` : ''; // Fallback poster image
    };

    const handlePlayClick = (movieId: string) => {
        setIsTrailerPlaying(true);
        setSelectedMovieId(movieId);
        if (trailer.current) {
            trailer.current.style.visibility = 'visible';
        }
    };
    const handleCloseClick = () => {
        if (trailer.current) {
            trailer.current.style.visibility = 'hidden';
        }
        setIsTrailerPlaying(false);
        setSelectedMovieId(null);
    };

    return (
        <SmoothScroll>
            <TrailerContainer onClick={handleCloseClick} ref={trailer}>
                {filteredTrailers?.[0].key && isTrailerPlaying && (
                    <iframe
                        width="70%"
                        height="70%"
                        src={`https://www.youtube.com/embed/${filteredTrailers[0].key}`}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                )}

                <CloseTrailer onClick={handleCloseClick}>
                    <IoClose />
                </CloseTrailer>
            </TrailerContainer>
            {data?.results && (
                <Splide
                    options={{
                        type: 'loop',
                        perMove: 1,
                        perPage: 1,
                        arrows: false,
                        pagination: false,
                        autoplay: true,
                        interval: 11000,
                        speed: 1500,
                        pauseOnHover: false,
                        easing: 'ease-in-out',
                    }}
                >
                    {data?.results.map((item) => {
                        return (
                            <SplideSlide key={item.id}>
                                <Main>
                                    <div className="movie">
                                        <img
                                            src={getImageUrl(
                                                item.backdrop_path
                                            )}
                                            alt={item.title}
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                width: '100%',
                                            }}
                                        />
                                    </div>
                                </Main>
                                <Content>
                                    <h1>{item.title}</h1>
                                    <FlexContainer>
                                        <h3>
                                            <span className="quality">HD</span>
                                        </h3>
                                        <h3>
                                            <span className="rate">
                                                {' '}
                                                <img
                                                    src="/assets/Rating.webp"
                                                    alt=""
                                                />
                                                {Math.floor(item.vote_average)}
                                            </span>
                                        </h3>
                                        <h3>
                                            Original Language:
                                            <span className="language">
                                                {item.original_language}
                                            </span>
                                        </h3>
                                    </FlexContainer>
                                    <div className="story">
                                        <p>{item.overview}</p>
                                    </div>
                                    <ButtonGroup>
                                        <button
                                            className="watch"
                                            onClick={() => {
                                                handlePlayClick(
                                                    item.id.toString()
                                                );
                                            }}
                                        >
                                            <IoPlay />
                                            Watch Trailer
                                        </button>
                                        <Link
                                            to={`/info/movie/${item.id}`}
                                            className="info"
                                        >
                                            {' '}
                                            More Info
                                            <IoIosInformationCircleOutline />
                                        </Link>
                                    </ButtonGroup>
                                </Content>
                                <Poster>
                                    <img
                                        src={getPosterUrl(
                                            item.poster_path,
                                            'original'
                                        )}
                                        alt={item.title}
                                    />
                                </Poster>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            )}
        </SmoothScroll>
    );
}

export default Banner;

const CloseTrailer = styled.div`
    position: absolute;
    top: 10%;
    right: 10%;
    background-color: var(--primary);
    font-weight: 600;
    font-size: 1.2em;
    padding: 1em;
    width: 60px;
    height: 60px;
    text-align: center;
    border-radius: 50%;
    transition: background-color 0.5s;
    &:hover {
        cursor: pointer;
        background-color: var(--2ndPrimary);
    }
`;

const TrailerContainer = styled.div`
    visibility: hidden;
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3000;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.679);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 20px;
    button,
    a {
        font-size: 1.2rem;
        padding: 1em 1.7em;
        border-radius: 40px;
        border: none;
        transition: all 0.5s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        text-decoration: none;
        color: white;
        @media (max-width: 1267px) {
            padding: 1em 1.5em;
            font-size: 1.2rem;
            gap: 1rem;
        }
        @media (max-width: 1080px) {
            padding: 0.9em 1.5em;
            font-size: 1.1rem;
            gap: 1rem;
        }
        @media (max-width: 1005px) {
            padding: 0.9em 1.5em;
            font-size: 1rem;
            gap: 1rem;
        }
        @media (max-width: 931px) {
            padding: 1em 1.5em;
            font-size: 1rem;
            gap: 1rem;
        }
        @media (max-width: 536px) {
            padding: 1em 1.5em;
            font-size: 1.1rem;
            white-space: nowrap;
            width: 100%;
            gap: 0rem;
        }
    }
    .watch {
        background-color: var(--2ndPrimary);
        border: 2px solid transparent;
        cursor: pointer;
        &:hover {
            border: 2px solid var(--primary);
            background-color: transparent;
            transform: translateY(-5px);
            svg {
                transform: rotateZ(360deg);
                transition: 0.5s;
            }
        }
    }
    .info {
        background-color: transparent;
        border: 2px solid var(--primary);
        cursor: pointer;
        &:hover {
            transform: translateY(-5px);
            border: 2px solid transparent;
            background-color: var(--2ndPrimary);
        }
    }
`;

const Poster = styled.div`
    position: absolute;
    z-index: 2;
    right: 160px;
    bottom: 0;
    transform: translateY(-40%);

    img {
        box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.5);
        border-radius: 20px;
        width: 300px;
        object-fit: cover;
        object-position: center;
        max-width: 100%;
        transition: 0.5s;
    }
    @media (max-width: 1496px) {
        img {
            width: 270px;
        }
    }
    @media (max-width: 1410px) {
        img {
            width: 250px;
            transform: translateY(-10%);
        }
    }
    @media (max-width: 1293px) {
        img {
            width: 240px;
            transform: translateY(-15%);
        }
    }
    @media (max-width: 991px) {
        display: none;
    }
`;

const Content = styled.div`
    position: absolute;
    top: 30%;
    left: 5%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.5rem;
    max-width: 40%;
    p {
        line-height: 1.7;
        font-size: 0.9rem;
        color: #cbcaca;
        @media (max-width: 991px) {
            max-width: 100%;
            padding: 0 1.5em 0 0;
            line-height: 1.5;
        }
    }
    @media (max-width: 1496px) {
        h1 {
            font-size: 1.5rem;
        }
    }
    @media (max-width: 1267px) {
        gap: 1.5rem;
    }
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2.5rem;
    letter-spacing: 1px;
    width: 100%;
    @media (max-width: 1045px) {
        h3 {
            font-size: 1rem;
        }
    }
    @media (max-width: 655px) {
        h3 {
            font-size: 0.8rem;
        }
    }
    .quality,
    .language {
        background-color: var(--2ndPrimary);
        box-shadow: 0px 1px 20px var(--2ndPrimary);
        text-align: center;
        padding: 0.5rem;
        border-radius: 50%;
        margin-left: 5px;
        text-transform: uppercase;
        font-size: 1rem;
        white-space: nowrap;
        @media (max-width: 655px) {
            font-size: 0.8rem;
        }
    }
    .rate {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img {
        width: 30px;
        object-fit: cover;
        object-position: center;
        text-align: center;
        margin-right: 5px;
    }
`;

const Main = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    padding: 0 100px;
    overflow: hidden;
    transition: 0.5s;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        background: linear-gradient(to top, #1e1d23, transparent);
    }
    &::after {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .movie {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        object-position: center;
        object-fit: cover;
        img {
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
        }
    }
`;
