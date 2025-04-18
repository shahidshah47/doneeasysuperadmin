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
        path: "/super-admin/order",
        component: () => import("../pages/Order.vue"),
        meta: {
          breadcrumb: [{ label: "Vendor", link: "/super-admin/vendor" }],
        },
      },

      {
        path: "/super-admin/order/:id/details",
        component: () => import("../pages/OrderDetails/Details/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Orders", link: "/super-admin/order" },
            { label: "Details", link: "/super-admin/order/:id/details" },
          ],
        },
      },
      {
        path: "/super-admin/order/:id/details/hot-orders",
        component: () => import("../pages/OrderDetails/HotOrder/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Orders", link: "/super-admin/order" },
            { label: "Details", link: "/super-admin/order/:id/details" },
          ],
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
        path: "/super-admin/company-details/:companyId/appointment/:appointmentId/details",
        component: () =>
          import("../pages/CompanyDetails/Appointment/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Appointments",
              link: "/super-admin/company-details/:companyId/appointment",
            },
            {
              label: "Details",
              link: "/super-admin/company-details/appointment/details",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/appointment/:appointmentId/reoccurring/details",
        component: () =>
          import("../pages/CompanyDetails/Appointment/Reoccurring/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Appointments",
              link: "/super-admin/company-details/:companyId/appointment",
            },
            {
              label: "Reoccurring Details",
              link: "/super-admin/company-details/appointment/reoccurring/details",
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
              link: "/super-admin/company-details/:companyId/site-survey",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/site-survey/:siteSurveyId/details",
        component: () =>
          import("../pages/CompanyDetails/SiteSurvey/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Site Survey",
              link: "/super-admin/company-details/:companyId/site-survey",
            },
            {
              label: "Details",
              link: "/super-admin/company-details/site-survey/:siteSurveyId/details",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/site-survey/SurveyDetails/:siteSurveyId/details",
        component: () =>
          import(
            "../pages/CompanyDetails/SiteSurvey/SurveyDetails/Details.vue"
          ),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Site Survey",
              link: "/super-admin/company-details/:companyId/site-survey",
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
            {
              label: "Offers",
              link: "/super-admin/company-details/:companyId/offers",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/offers/:offerId/details",
        component: () => import("../pages/CompanyDetails/Offers/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Offers",
              link: "/super-admin/company-details/:companyId/offers",
            },
            {
              label: "Details",
              link: "/super-admin/company-details/:companyId/offers/:offerId/details",
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
        path: "/super-admin/company-details/:companyId/employees/:employeeId/details",
        component: () =>
          import("../pages/CompanyDetails/Employees/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/:companyId/employees",
            },
            {
              label: "Details",
              link: "/super-admin/company-details/:companyId/employees/:employeeId/details",
            },
          ],
        },
      },

      {
        path: "/super-admin/company-details/:companyId/employees/:employeeId/appointment",
        component: () =>
          import("../pages/CompanyDetails/Employees/Appointment.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/:companyId/employees",
            },
            {
              label: "Appointments",
              link: "/super-admin/company-details/:companyId/employees/:employeeId/appointment",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/employees/appointment/:appointmentId/details",
        component: () =>
          import(
            "../pages/CompanyDetails/Employees/AppointmentDetails/Detail.vue"
          ),
      },
      {
        path: "/super-admin/company-details/:companyId/employees/:employeeId/site-survey",
        component: () =>
          import("../pages/CompanyDetails/Employees/SiteSurvey.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/:companyId/employees",
            },
            {
              label: "Site Survey",
              link: "/super-admin/company-details/:companyId/employees/:employeeId/site-survey",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/employees/:employeeId/chat-history",
        component: () =>
          import("../pages/CompanyDetails/Employees/ChatsHistory.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/:companyId/employees",
            },
            {
              label: "Chats History",
              link: "/super-admin/company-details/:companyId/employees/:employeeId/chat-history",
            },
          ],
        },
      },
      {
        path: "/super-admin/company-details/:companyId/employees/:employeeId/rating-reviews",
        component: () =>
          import("../pages/CompanyDetails/Employees/RatingReviews.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Employees",
              link: "/super-admin/company-details/:companyId/employees",
            },
            {
              label: "Rating & Reviews",
              link: "/super-admin/company-details/:companyId/employees/:employeeId/rating-reviews",
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
        path: "/super-admin/company-details/:companyId/verticals/:verticalId/details",
        component: () =>
          import("../pages/CompanyDetails/Verticals/Details.vue"),
        meta: {
          breadcrumb: [
            { label: "Vendor", link: "/super-admin/vendor" },
            {
              label: "Verticals",
              link: "/super-admin/company-details/:companyId/verticals",
            },
            {
              label: "Details",
              link: "/super-admin/company-details/:companyId/verticals/:verticalId/details",
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
