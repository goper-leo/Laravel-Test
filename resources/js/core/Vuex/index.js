import Vue from 'vue'
import Vuex from 'vuex'
// Modules
import product from "@store/product";


Vue.use(Vuex)

const Store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        product,
    }
});

export default Store


