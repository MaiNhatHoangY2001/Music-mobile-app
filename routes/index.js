import { Home, ListMusic, PlayingNow } from '../components/pages';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/list-music', component: ListMusic },
    { path: '/playing-now', component: PlayingNow },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
