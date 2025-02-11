import { FaPlayCircle } from 'react-icons/fa';
import { useGetSearchDataQuery } from '../state/apiSlice';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SmoothScroll from '../components/ScrollingComponent/SmoothScroll';
import Header from '../components/Header/Header';
import { Card, MovieTitle } from '../shared/StyledComponents';
import Footer from '../components/Footer/Footer';
import { scrollToTop } from '../components/scrollToTop';
function SearchedPage() {
    const params = useParams();
    const { data } = useGetSearchDataQuery({
        media: params?.type || '', // Ensure `media` is always a string
        searchName: params?.query || '',
    });
    const getImageUrl = (
        path: string,
        size: 'w500' | 'w780' | 'w1280' = 'w780'
    ) => {
        return path
            ? `https://image.tmdb.org/t/p/${size}${path}`
            : 'https://via.placeholder.com/780x439'; // Adjust fallback image size
    };
    return (
        <SmoothScroll>
            <Banner>
                <Header />
            </Banner>
            <Main>
                <h1>
                    Results For{' '}
                    {params?.query
                        ? params.query.charAt(0).toUpperCase() +
                          params.query.slice(1)
                        : ''}
                </h1>
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
            </Main>
            <Footer />
        </SmoothScroll>
    );
}

export default SearchedPage;

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
