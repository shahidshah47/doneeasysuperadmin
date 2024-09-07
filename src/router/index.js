import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "/admin/signin",
        component: () => import("../pages/auth/admin/SignIn.vue"),
      },
      {
        path: "/admin/signup",
        component: () => import("../pages/auth/admin/SignUp.vue"),
      },
      {
        path: "/admin/email-confirmation",
        component: () => import("../pages/auth/admin/EmailConfirmation.vue"),
      },
      {
        path: "/signin",
        component: () => import("../pages/auth/client/SignIn.vue"),
      },
      {
        path: "/signup",
        component: () => import("../pages/auth/client/SignUp.vue"),
      },
      {
        path: "/company/register",
        component: () => import("../pages/auth/client/company/register.vue"),
      },
    ],
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/project", component: () => import("../pages/Project.vue") },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    component: () => import("../pages/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/vendor",
    component: () => import("../pages/Vendor.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/company-details",
    component: () => import("../pages/CompanyDetails.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Uncomment the beforeEach hook if you want to enforce authentication
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = localStorage.getItem('user');
//     if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//         next('/signin');
//     } else {
//         next();
//     }
// });

export default router;
