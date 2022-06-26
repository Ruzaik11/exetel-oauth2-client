import {
  createWebHistory,
  createRouter
} from "vue-router";
import Home from "@/views/Home.vue";


const routes = [{
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/oauth",
    name: "oauth",
    component: () => import('../components/auth/AuthComponent.vue'),
  },
  {
    path: "/callback",
    name: "callback",
    component: () => import('../components/auth/CallbackComponent.vue'),
  },
  {
    path: "/customers",
    name: "customers",
    component: () => import('../components/customer/IndexComponent.vue'),
  },
  {
    path: "/customers/create",
    name: "customers.create",
    component: () => import('../components/customer/CreateComponent.vue'),
  },
  {
    path: "/customers/edit",
    name: "customers.edit",
    component: () => import('../components/customer/EditComponent.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const openRoutes = ["Home", "oauth", "callback"];

router.beforeEach((to, from) => {
  if (openRoutes.includes(to.name)) {
    return true;
  } else {
    if (window.localStorage.getItem("accessToken")) {
      return true;
    } else {
      return { name: 'Home' }
    }
  }
})

export default router;