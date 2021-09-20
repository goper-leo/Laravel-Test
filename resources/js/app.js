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
        component: TButton,
        props: {
            fixedClasses:
                "block px-4 py-2 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
            classes:
                "text-white bg-app-red border border-transparent shadow-sm rounded hover:bg-red-900",
            variants: {
                secondary:
                    "text-gray-800 bg-white border border-gray-300 shadow-sm hover:text-gray-600",
                error:
                    "text-white bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600",
                success:
                    "text-white bg-green-500 border border-transparent rounded shadow-sm hover:bg-green-600",
                link: "text-blue-500 underline hover:text-blue-600"
            }
        }
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
