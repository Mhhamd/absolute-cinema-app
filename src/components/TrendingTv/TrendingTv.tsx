/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    Card,
    Wrapper,
    FlexContainer,
    CardContainer,
    MovieTitle,
    SplideOptions,
} from '../../shared/StyledComponents';
import { Splide, SplideSlide } from '@splidejs/react-splide';
//@ts-ignore
import '@splidejs/react-splide/css';
import { useGetTrendingTvQuery } from '../../state/apiSlice';
import { FaPlayCircle } from 'react-icons/fa';
import { StyledLink } from '../../shared/StyledComponents';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../scrollToTop';

function TrendingTv() {
    const { data } = useGetTrendingTvQuery();
    const getImageUrl = (
        path: string,
        size: 'w500' | 'w780' | 'w1280' = 'w780'
    ) => {
        return path
            ? `https://image.tmdb.org/t/p/${size}${path}`
            : 'https://via.placeholder.com/780x439'; // Adjust fallback image size
    };

    return (
        <Wrapper>
            <FlexContainer>
                <h2>Trending TV</h2>
                <StyledLink onClick={scrollToTop} to={'/more/tv'}>
                    Show More
                </StyledLink>
            </FlexContainer>
            {data?.results && (
                <Splide options={SplideOptions}>
                    {data?.results.map((item) => {
                        return (
                            <SplideSlide key={item.id}>
                                <CardContainer>
                                    <Card>
                                        <img
                                            src={getImageUrl(
                                                item.poster_path,
                                                'w780'
                                            )}
                                            alt={item.title || item.name}
                                        />
                                        <Link
                                            onClick={scrollToTop}
                                            to={`/info/${item.media_type}/${item.id}`}
                                            className="overlay"
                                        >
                                            <FaPlayCircle />
                                        </Link>
                                    </Card>
                                    <MovieTitle>
                                        {item.title || item.name}
                                    </MovieTitle>
                                </CardContainer>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            )}
        </Wrapper>
    );
}

export default TrendingTv;
