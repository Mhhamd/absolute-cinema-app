interface NavItem {
    id: number;
    link: string;
    name: string;
    active: boolean;
}

export const navListData: NavItem[] = [
    {
        id: 1,
        link: '/',
        name: 'HOME',
        active: false,
    },
    {
        id: 2,
        link: '/more/movie',
        name: 'MOVIES',
        active: false,
    },
    {
        id: 3,
        link: '/more/tv',
        name: 'TV SHOWS',
        active: false,
    },
];
