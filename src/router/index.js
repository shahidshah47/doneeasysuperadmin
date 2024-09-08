import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/super-admin/dashboard",
  },
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "/super-admin/login",
        component: () => import("../pages/auth/Login.vue"),
      },
      {
        path: "/super-admin/register",
        component: () => import("../pages/auth/Register.vue"),
      },
      {
        path: "/super-admin/email-confirmation",
        component: () => import("../pages/auth/Email.vue"),
      },
      {
        path: "/super-admin/verify",
        component: () => import("../pages/auth/Verify.vue"),
      },
      {
        path: "/super-admin/google-2fa-enrollment",
        component: () => import("../pages/auth/GoogleEnrollment.vue"),
      },
    ],
  },
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "/super-admin/dashboard",
        component: () => import("../pages/Dashboard.vue"),
        meta: {
          breadcrumb: [{ label: "Dashboard", link: "/super-admin/dashboard" }],
        },
      },
      {
        path: "/super-admin/vendor",
        component: () => import("../pages/Vendor.vue"),
        meta: {
          breadcrumb: [{ label: "Vendor", link: "/super-admin/vendor" }],
        },
      },
      {
        path: "/super-admin/company-details/info",
        component: () => import("../pages/CompanyDetails/Info.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            { label: "Details", link: "/super-admin/company-details/info" },
          ],
        },
      },
      {
        path: "/super-admin/company-details/appointment",
        component: () => import("../pages/CompanyDetails/Appointment.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Appointments",
              link: "/super-admin/company-details/appointment",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/site-survey",
        component: () => import("../pages/CompanyDetails/SiteSurvey.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Site Survey",
              link: "/super-admin/company-details/site-survey",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/offers",
        component: () => import("../pages/CompanyDetails/Offers.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            { label: "Offers", link: "/super-admin/company-details/offers" },
          ],
        },
      },
      {
        path: "/super-admin/company-details/employees",
        component: () => import("../pages/CompanyDetails/Employees.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/employees",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/verticals",
        component: () => import("../pages/CompanyDetails/Verticals.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Verticals",
              link: "/super-admin/company-details/verticals",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/chat-history",
        component: () => import("../pages/CompanyDetails/ChatHistory.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Chats History",
              link: "/super-admin/company-details/chat-history",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/finance",
        component: () => import("../pages/CompanyDetails/Finance.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            { label: "Finance", link: "/super-admin/company-details/finance" },
          ],
        },
      },
    ],
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
