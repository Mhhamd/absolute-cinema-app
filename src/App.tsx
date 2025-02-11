import './App.css';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import TopRatedMovies from './components/TopRatedMovies/TopRatedMovies';
import TrendingMovies from './components/TrendingMovies/TrendingMovies';
import TrendingTv from './components/TrendingTv/TrendingTv';
import SmoothScroll from './components/ScrollingComponent/SmoothScroll';
import Footer from './components/Footer/Footer';
function App() {
    return (
        <SmoothScroll>
            <Header />
            <main>
                <Banner />
                <TrendingMovies />
                <TopRatedMovies />
                <TrendingTv />
            </main>
            <Footer />
        </SmoothScroll>
    );
}

export default App;
