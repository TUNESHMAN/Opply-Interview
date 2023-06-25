import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/DashboardView.vue";
import SuppliersView from "@/views/dashboard/SupplierView.vue";
import QuotesView from "@/views/dashboard/QuotesView.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
 
  {
    path: "/dashboard",
    component: Dashboard,

    children: [
      {
        path: "suppliers",
        component: SuppliersView,
      },
      {
        path: "quotes",
        component: QuotesView,
      },
    ],
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("token");

  const check = to.matched.some((record) => record.meta.requiresAuth);
  if (check && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
export default router;
