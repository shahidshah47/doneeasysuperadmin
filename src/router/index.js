import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/super-admin/login",
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
        path: "/super-admin/company-details/:companyId/info",
        component: () => import("../pages/CompanyDetails/Info.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            { label: "Details", link: "/super-admin/company-details/info" },
          ],
        },
      },
      {
        path: "/super-admin/company-details/info/authentication",
        component: () =>
          import("../pages/CompanyDetails/Info/Authentication.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            { label: "Details", link: "/super-admin/company-details/info" },
            {
              label: "Authentication",
              link: "/super-admin/company-details/info/authentication",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/appointment",
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
        path: "/super-admin/company-details/appointment/details",
        component: () =>
          import("../pages/CompanyDetails/Appointment/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Appointments",
              link: "/super-admin/company-details/appointment",
            },
            {
              label: "Details",
              link: "/super-admin/company-details/appointment/details",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/site-survey",
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
        path: "/super-admin/company-details/site-survey/details",
        component: () =>
          import("../pages/CompanyDetails/SiteSurvey/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Site Survey",
              link: "/super-admin/company-details/site-survey",
            },
            {
              label: "Details",
              link: "/super-admin/company-details/site-survey/details",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/offers",
        component: () => import("../pages/CompanyDetails/Offers.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            { label: "Offers", link: "/super-admin/company-details/offers" },
          ],
        },
      },
      {
        path: "/super-admin/company-details/offers/details",
        component: () => import("../pages/CompanyDetails/Offers/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Offers",
              link: "/super-admin/company-details/offers",
            },
            {
              label: "Details",
              link: "/super-admin/company-details/offers/details",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/employees",
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
        path: "/super-admin/company-details/employees/details",
        component: () =>
          import("../pages/CompanyDetails/Employees/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/employees",
            },
            {
              label: "Details",
              link: "/super-admin/company-details/employees/details",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/employees/appointment",
        component: () =>
          import("../pages/CompanyDetails/Employees/Appointment.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/employees",
            },
            {
              label: "Appointments",
              link: "/super-admin/company-details/employees/appointment",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/employees/site-survey",
        component: () =>
          import("../pages/CompanyDetails/Employees/SiteSurvey.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/employees",
            },
            {
              label: "Site Survey",
              link: "/super-admin/company-details/employees/site-survey",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/employees/chat-history",
        component: () =>
          import("../pages/CompanyDetails/Employees/ChatsHistory.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/employees",
            },
            {
              label: "Chats History",
              link: "/super-admin/company-details/employees/chat-history",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/employees/rating-reviews",
        component: () =>
          import("../pages/CompanyDetails/Employees/RatingReviews.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/employees",
            },
            {
              label: "Rating & Reviews",
              link: "/super-admin/company-details/employees/rating-reviews",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/verticals",
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
        path: "/super-admin/company-details/verticals/details",
        component: () =>
          import("../pages/CompanyDetails/Verticals/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Verticals",
              link: "/super-admin/company-details/verticals",
            },
            {
              label: "Details",
              link: "/super-admin/company-details/verticals/details",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/chat-history",
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
        path: "/super-admin/company-details/:companyId/finance",
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
