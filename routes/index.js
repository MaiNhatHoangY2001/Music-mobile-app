import { Home, ListMusic } from '../components/pages';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/list-music', component: ListMusic },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
