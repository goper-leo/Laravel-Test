import "./bootstrap"
import Vue from "vue"
import VueTailwind from "vue-tailwind"

import store from "@core/Vuex"
import App from "@pages/master"

import "@core/Request"

Vue.use(VueTailwind)
window.app = new Vue({
    el: "#app",
    store,
    ...App
})
