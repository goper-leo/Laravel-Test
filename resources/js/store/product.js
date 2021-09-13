import axios from 'axios'
import { omit } from 'lodash'

export default {
    /**
     * Namespace module
     *
     * @type {Boolean}
     * @author {goper}
     */
    namespaced: true,

    /**
     * State
     *
     * @type {Object}
     * @author {goper}
     */
    state: {
        items: [],
        pagination: {}
    },

    /**
     * Mutations
     *
     * @type {Object}
     * @author {goper}
     */
    mutations: {
        /**
         * Fill items
         *
         * @param  {State} state                                the state to use
         * @param  {Object} payload                             the payload
         * @return {void}
         * @author {goper}
         */
        fill(state, { data, meta }) {
            state.items = data;
            state.pagination = meta
        }
    },

    /**
     * Actions
     *
     * @type {Object}
     * @author {goper}
     */
    actions: {
        async fetch({ commit }, payload) {
            const { data } = await axios.get("/api/product", payload);
            commit("fill", data);
        }
    },

    /**
     * Getters
     *
     * @type {Object}
     * @author {goper}
     */
    getters: {
        /**
         * Products getter
         *
         * @param  {State} state                            the state to use
         * @return {Array}
         * @author {goper}
         */
        items: (state) => state.items,

        pagination: (state) => state.pagination,
    }
};
