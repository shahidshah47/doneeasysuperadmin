import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
    {
        path: '/',
        component: AuthLayout,
        children: [
            { path: '', redirect: '/signin' },
            { path: '/signin', component: () => import('../components/SignIn.vue') },
            { path: '/signup', component: () => import('../components/SignUp.vue') }
        ]
    },
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '/project', component: () => import('../pages/Project.vue') },
            { path: '/dashboard', component: () => import('../pages/Dashboard.vue') }
        ],
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// You can uncomment and adjust the beforeEach hook to handle authentication redirects
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = localStorage.getItem('user');
//     if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//         next('/signin');
//     } else {
//         next();
//     }
// });

export default router;
