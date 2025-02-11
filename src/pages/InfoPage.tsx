import styled from 'styled-components';
import Header from '../components/Header/Header';
import {
    useGetMovieDetailsQuery,
    useGetSelectedTrailerQuery,
    useGetSimilarMoviesQuery,
} from '../state/apiSlice';
import { Link, useParams } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {
    Card,
    CardContainer,
    Genre,
    SplideOptions,
} from '../shared/StyledComponents';
import { FaPlayCircle } from 'react-icons/fa';
import Footer from '../components/Footer/Footer';
import SmoothScroll from '../components/ScrollingComponent/SmoothScroll';
import { scrollToTop } from '../components/scrollToTop';

function InfoPage() {
    const params = useParams();
    const { data: trailerData } = useGetSelectedTrailerQuery({
        media: params?.type as string,
        id: params?.id?.toString() ?? '',
    });
    const { data: similarData } = useGetSimilarMoviesQuery({
        media: params?.type as string,
        id: params?.id?.toString() ?? '',
    });
    const { data } = useGetMovieDetailsQuery({
        media: params?.type as string,
        id: params?.id?.toString() ?? '',
    });
    const getPosterUrl = (
        path: string,
        size: 'original' | 'w560' = 'original'
    ) => {
        return path ? `https://image.tmdb.org/t/p/${size}${path}` : ''; // Fallback poster image
    };
    const getImageUrl = (
        path: string,
        size: 'w500' | 'w780' | 'w1280' = 'w780'
    ) => {
        return path
            ? `https://image.tmdb.org/t/p/${size}${path}`
            : 'https://via.placeholder.com/780x439'; // Adjust fallback image size
    };

    const newTrailers = trailerData?.results.filter((trailer) => {
        return trailer.type === 'Trailer';
    });
    return (
        <SmoothScroll>
            <Container>
                <Banner>
                    <div className="movie">
                        <img
                            src={getImageUrl(data?.backdrop_path ?? '')}
                            alt=""
                        />
                    </div>
                    <Header />
                </Banner>
                <Main>
                    <Poster>
                        <img
                            src={getPosterUrl(data?.poster_path ?? '')}
                            alt="poster"
                        />
                    </Poster>
                    <Details>
                        <Title>
                            <h1>{data?.title || data?.name}</h1>
                            <Genre>
                                {data?.genres.map((item) => {
                                    return <p key={item.name}>{item.name}</p>;
                                })}
                            </Genre>
                            <Story>
                                <p className="store">{data?.overview}</p>
                            </Story>
                            <Cast>
                                {data?.credits.cast.slice(0, 5).map((actor) => {
                                    return (
                                        <ActorsContainer
                                            key={actor.id}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <img
                                                src={
                                                    actor.profile_path
                                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                        : 'https://via.placeholder.com/185x278?text=No+Image'
                                                }
                                                alt={actor.name}
                                                loading="lazy"
                                            />
                                            <p>{actor.name}</p>
                                        </ActorsContainer>
                                    );
                                })}
                            </Cast>
                        </Title>
                    </Details>
                </Main>
                <TrailerContainer>
                    {newTrailers?.slice(0, 3).map((trailer) => {
                        return (
                            <Trailer key={trailer.id}>
                                <h1>{trailer.name}</h1>
                                <iframe
                                    width="70%"
                                    height="600vh"
                                    frameBorder="0"
                                    allowFullScreen
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                ></iframe>
                            </Trailer>
                        );
                    })}
                    <SimliarContainer>
                        <h1>Similar</h1>
                        <Splide options={SplideOptions}>
                            {similarData?.results.map((item) => {
                                return (
                                    <SplideSlide key={item.id}>
                                        <CardContainer onClick={scrollToTop}>
                                            <Card>
                                                <img
                                                    loading="lazy"
                                                    src={getImageUrl(
                                                        item.poster_path,
                                                        'w500'
                                                    )}
                                                    alt={
                                                        item.name || item.title
                                                    }
                                                />
                                                <StyledLink
                                                    to={`/info/${params.type}/${item.id}`}
                                                    className="overlay"
                                                >
                                                    <FaPlayCircle />
                                                    <p>
                                                        {item.title ||
                                                            item.name}
                                                    </p>
                                                </StyledLink>
                                            </Card>
                                        </CardContainer>
                                    </SplideSlide>
                                );
                            })}
                        </Splide>
                    </SimliarContainer>
                </TrailerContainer>
                <Footer />
            </Container>
        </SmoothScroll>
    );
}

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    text-decoration: none;
    gap: 1.2em;
`;

const SimliarContainer = styled.div`
    h1 {
        letter-spacing: 2px;
        font-weight: 600;
    }
    padding: 3.5em;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`;
const Trailer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2em;
    padding: 1em;
    width: 100%;
`;

const TrailerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    transform: translateY(-10%);
    gap: 5rem;
    width: 100%;
`;

const Main = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
    padding: 1.5em;
    width: 100vw;
    @media (max-width: 1020px) {
        flex-direction: column;
    }
`;

const ActorsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    img {
        border-radius: 10px;
    }
    p {
        width: 100%;
        white-space: pre-wrap;
    }
    @media (max-width: 1013px) {
        p {
            font-size: 0.9rem;
            width: 150px;
        }
    }
    @media (max-width: 903px) {
        p {
            width: 120px;
        }
    }
    @media (max-width: 764px) {
        p {
            width: 110px;
        }
    }
    @media (max-width: 692px) {
        p {
            width: 100px;
        }
    }
    @media (max-width: 660px) {
        p {
            width: 90px;
        }
    }
    @media (max-width: 586px) {
        p {
            width: 80px;
        }
    }
    @media (max-width: 558px) {
        p {
            width: 70px;
            font-size: 0.7rem;
        }
    }
    @media (max-width: 558px) {
        p {
            width: 65px;
        }
    }
`;

const Cast = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1.5em;
    width: 80%;

    img {
        object-fit: cover;
        object-position: center;
        width: 100px;
    }
    @media (max-width: 592px) {
        width: 90px;
        padding: 0 0.9em;
    }
`;

const Story = styled.div`
    min-width: 500px;
    max-width: 1000px;
    color: #bbb7b7;
    @media (max-width: 1045px) {
        font-size: 0.9rem;
    }
    @media (max-width: 592px) {
        width: 90px;
        padding: 0 1em;
    }
`;

const Title = styled.div`
    display: flex;
    padding: 1.5em;
    align-items: flex-start;
    flex-direction: column;
    text-align: left;

    gap: 2em;
    h1 {
        font-size: 2.5rem;
    }
    @media (max-width: 1020px) {
        h1 {
            position: absolute;
            top: -10%;
        }
    }
    @media (max-width: 592px) {
        h1 {
            left: 5%;
        }
    }
`;

const Poster = styled.div`
    margin-right: 2rem;
    img {
        border-radius: 20px;
        width: 300px;
        object-fit: cover;
        object-position: center;
    }
    @media (max-width: 1106px) {
        img {
            width: 250px;
        }
    }
    @media (max-width: 1045px) {
        img {
            width: 200px;
        }
    }

    @media (max-width: 1020px) {
        img {
            position: absolute;
            left: 2%;
            top: -10%;
            width: 150px;
        }
    }
    @media (max-width: 1012px) {
        img {
            display: none;
        }
    }
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    width: 70%;
    @media (max-width: 1106px) {
        img {
            width: 50%;
        }
        h1 {
            font-size: 1.7rem;
        }
    }
`;

const Banner = styled.div`
    position: relative;
    width: 100vw;
    height: 50vh;
    padding: 0 100px;
    overflow: hidden;
    background-image: url('/assets/FooterBanner.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 5rem;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100vw;
        background: linear-gradient(to top, #1e1d23, transparent);
    }
    .movie {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        object-fit: cover;
        object-position: center;
        img {
            object-fit: cover;
            object-position: center;
            width: 100vw;
            height: 100vh;
        }
    }
    &::after {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

export default InfoPage;
