import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/nav/:slug",
    name: "Navigation",
    props: true,
    component: () => import("../views/Navigation.vue")
  },
  {
    path: "/",
    name: "Collection",
    component: () => import("../views/Collection.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
