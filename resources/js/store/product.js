import axios from 'axios'

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
    },

    /**
     * Mutations
     *
     * @type {Object}
     * @author {goper}
     */
    mutations: {

        
    },

    /**
     * Actions
     *
     * @type {Object}
     * @author {goper}
     */
    actions: {

        
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
        items(state) {
            return state.items
        },
    }
}
