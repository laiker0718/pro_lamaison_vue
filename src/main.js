// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import "lib-flexible/flexible";
import html2canvas from "html2canvas";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import i18n from "./utils/locales/index";
import "./assets/css/tailwind.css";
import store from "./store";
import animated from "animate.css";

Vue.use(animated);
Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$html2canvas = window.html2canvas || html2canvas;

/*
router.beforeEach((to, from, next) => {
    if (to.query.jump === "mail_info") {
        localStorage.setItem("code", to.query.token);
    }
    let token = localStorage.getItem("code");
    if (token) {
        if (to.path === "/") {
            router.replace("/home");
            return;
        }
        next();
    } else {
        if (to.path === "/" || to.path === "/privacy") {
            next();
        } else {
            router.replace("/");
        }
    }
});
*/

new Vue({
    i18n,
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");