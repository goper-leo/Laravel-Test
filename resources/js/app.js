import "./bootstrap"
import Vue from "vue"
import VueTailwind from "vue-tailwind"

import store from "@core/Vuex"
import App from "@pages/master"

import "@core/Request"
import {
    TPagination,
    TTable,
    TButton,
    TCheckboxGroup,
    TCheckbox,
    TToggle,
    TInput,
    TDropdown,
    TRadioGroup,
    TAlert
} from "vue-tailwind/dist/components";

const settings = {
    "t-table": {
        component: TTable
    },
    "t-pagination": {
        component: TPagination
    },
    "t-button": {
        component: TButton
    },
    "t-checkbox-group": {
        component: TCheckboxGroup
    },
    "t-checkbox": {
        component: TCheckbox
    },
    "t-toggle": {
        component: TToggle
    },
    "t-input": {
        component: TInput
    },
    "t-dropdown": {
        component: TDropdown
    },
    "t-radio-group": {
        component: TRadioGroup
    },
    "t-alert": {
        component: TAlert
    }
};

Vue.use(VueTailwind, settings);
window.app = new Vue({
    el: "#app",
    store,
    ...App
})
