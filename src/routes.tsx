import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import ShowMorePage from './pages/ShowMorePage';
import InfoPage from './pages/InfoPage';
import SearchedPage from './pages/SearchedPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/trendingmovies',
        element: <ShowMorePage />,
    },
    {
        path: '/tvshows',
        element: <ShowMorePage />,
    },
    {
        path: '/movies',
        element: <ShowMorePage />,
    },
    {
        path: '/more/:type/',
        element: <ShowMorePage />,
    },
    {
        path: '/info/:type/:id',
        element: <InfoPage />,
    },
    {
        path: '/searched/:type/:query',
        element: <SearchedPage />,
    },
]);
