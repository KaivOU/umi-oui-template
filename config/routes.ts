const routes = [
    {
        path: '/',
        component: '@/pages/login',
        name: 'login'
    },
    {
        path: '/login',
        component: '@/pages/login',
        name: 'login'
    },
    {
        // path: '/',
        component: '@/layouts/base-layout',
        routes: [
            {
                path: '/',
                component: '@/pages/overview'
            },
            {
                path: '/overview',
                component: '@/pages/overview',
                name: 'overview'
            }
        ]
    }
];
export default routes;
