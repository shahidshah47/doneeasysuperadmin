import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', redirect: '/signin' },
    { path: '/signin', component: () => import('../components/SignIn.vue') },
    { path: '/signup', component: () => import('../components/SignUp.vue') },
    { path: '/dashboard', component: () => import('../layouts/DashboardLayout.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    // Check for requiresAuth guard
    const isAuthenticated = localStorage.getItem('user'); // Simplified check
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/signin');
    } else {
        next();
    }
});

export default router;
