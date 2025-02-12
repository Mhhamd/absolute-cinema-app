import styled from 'styled-components';
import { IoSearch } from 'react-icons/io5';
import Header from '../components/Header/Header';
import { Card, MovieTitle } from '../shared/StyledComponents';
import {
    useGetTopRatedMoviesPageQuery,
    useGetTrendingMoviesPageQuery,
    useGetTrendingTvPageQuery,
} from '../state/apiSlice';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import SmoothScroll from '../components/ScrollingComponent/SmoothScroll';
import { FaArrowLeft, FaArrowRight, FaPlayCircle } from 'react-icons/fa';
import Footer from '../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { setInputValue } from '../state/inputSlice';
import { scrollToTop } from '../components/scrollToTop';

function ShowMorePage() {
    const inputValue = useSelector((state: RootState) => state.input.value);
    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputValue(event.target.value)); // Store input value in Redux
    };
    const [pageNumber, setPageNumber] = useState(1);
    const params = useParams<{ type: string }>();

    const { data: moviesData, refetch: refetchMovies } =
        useGetTrendingMoviesPageQuery(pageNumber);

    const { data: tvData, refetch: refetchTv } =
        useGetTrendingTvPageQuery(pageNumber);

    const { data: topRatedData, refetch: refetchTopRated } =
        useGetTopRatedMoviesPageQuery(pageNumber);

    const data = useMemo(() => {
        switch (params.type) {
            case 'movie':
                return moviesData;
            case 'tv':
                return tvData;
            case 'top_rated':
                return topRatedData;
        }
    }, [params.type, moviesData, tvData, topRatedData]);

    useEffect(() => {
        switch (params.type) {
            case 'movie':
                refetchMovies();
                break;
            case 'tv':
                refetchTv();
                break;
            case 'top_rated':
                refetchTopRated();
                break;
            default:
                break;
        }
    }, [pageNumber, params.type, refetchMovies, refetchTopRated, refetchTv]);

    const navigate = useNavigate();

    const handleIncrement = () => {
        scrollToTop();
        setPageNumber((prev) => prev + 1);
    };
    const handleDecrement = () => {
        if (pageNumber > 1) {
            scrollToTop();

            setPageNumber((prev) => prev - 1);
        }
    };

    const handleTitle = () => {
        return params.type === 'movie'
            ? 'Movies'
            : params.type === 'tv'
            ? 'TV Shows'
            : params.type === 'top_rated'
            ? 'TOP Rated'
            : 'Movies';
    };

    const getImageUrl = (
        path: string,
        size: 'w500' | 'w780' | 'w1280' = 'w780'
    ) => {
        return path
            ? `https://image.tmdb.org/t/p/${size}${path}`
            : 'https://via.placeholder.com/780x439'; // Adjust fallback image size
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        else {
            navigate(`/searched/${params.type}/${inputValue}`);
            dispatch(setInputValue(''));
        }
    };

    return (
        <SmoothScroll>
            <Banner>
                <Header />
            </Banner>
            <Main>
                <SearchBox>
                    <IoSearch />
                    <input
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        type="text"
                        placeholder="Search..."
                    />
                </SearchBox>
                <h1>{handleTitle()}</h1>
                <h3>Page: {pageNumber}</h3>
                <Grid>
                    {data?.results.map((item) => {
                        return (
                            <div key={item.id}>
                                <Card onClick={scrollToTop}>
                                    <img
                                        src={getImageUrl(
                                            item.poster_path,
                                            'w780'
                                        )}
                                        alt={item.title || item.name}
                                    ></img>
                                    <StyledLink
                                        to={`/info/${params.type}/${item.id}`}
                                        className="overlay"
                                    >
                                        <FaPlayCircle />
                                        <p>{item.title || item.name}</p>
                                    </StyledLink>
                                </Card>
                                <MovieTitle>
                                    {item.title || item.name}
                                </MovieTitle>
                            </div>
                        );
                    })}
                </Grid>
                <PageNavigation>
                    <FaArrowLeft
                        className={pageNumber === 1 ? 'inactive' : 'active'}
                        onClick={handleDecrement}
                    />
                    <h4>{pageNumber}</h4>
                    <FaArrowRight
                        className="increase"
                        onClick={handleIncrement}
                    />
                </PageNavigation>
            </Main>
            <Footer />
        </SmoothScroll>
    );
}

const PageNavigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    margin-top: 1em;
    gap: 1.5em;
    .increase {
        cursor: pointer;
        transition: 0.5s;
        &:hover {
            opacity: 0.5;
        }
    }
    .active {
        transition: 0.5s;
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
    }
    .inactive {
        cursor: not-allowed;
        opacity: 0.3;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    text-decoration: none;
    gap: 1.2em;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 2fr));
    width: 100vw;
    grid-gap: 2.5rem;
    padding: 2.5em;
`;

const SearchBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em;
    width: 500px;
    svg {
        position: absolute;
        right: 20px;
        margin: 20px;
        border-left: 1px solid white;
        padding-left: 10px;
        font-size: 1.5rem;
    }
    input {
        width: 100%;
        border-radius: 5px;
        background-color: transparent;
        border: 0.2px solid white;
        padding: 1em;
        text-transform: capitalize;
        letter-spacing: 2px;
        color: white;
        outline: none;
        &::placeholder {
            color: white;
        }
    }
`;

const Main = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    h3,
    h1 {
        letter-spacing: 2px;
    }
`;

const Banner = styled.div`
    position: relative;
    width: 100vw;
    height: 40vh;
    padding: 0 100px;
    overflow: hidden;
    background-image: url('/assets/FooterBanner.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 5rem;
    &::before {
        position: absolute;
        left: 0;
        content: '';
        width: 100vw;
        height: 100%;
        background: linear-gradient(to top, #1e1d23, transparent);
    }
    &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 100vw;
        height: 100%;
        background: linear-gradient(to bottom, #1e1d23, transparent);
    }
`;

export default ShowMorePage;
