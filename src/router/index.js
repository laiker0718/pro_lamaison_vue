import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "index",
            component: () => import("../views/index/index.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/home",
            name: "home",
            component: () => import("../views/home/index.vue"),
            meta: {
                keepAlive: false,
            },
        },
        /*
        {
            path: "/result",
            name: "result",
            component: () => import("../views/result/index.vue"),
            meta: {
                keepAlive: false,
            },
        },
        {
            path: "/question",
            name: "question",
            component: () => import("../views/question/index.vue"),
            meta: {
                keepAlive: false,
            },
        },
        {
            path: "/loading",
            name: "loading",
            component: () => import("../views/loading/index.vue"),
            meta: {
                keepAlive: false,
            },
        },
        {
            path: "/blank",
            name: "blank",
            component: () => import("../views/blank/index.vue"),
            meta: {
                keepAlive: false,
            },
        },
        */
        {
            path: "/privacy",
            name: "privacy",
            component: () => import("../views/privacy/index.vue"),
            meta: {
                keepAlive: false,
            },
        },
    ],
});