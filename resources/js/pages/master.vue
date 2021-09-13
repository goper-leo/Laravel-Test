<template>
    <div class="w-full grid grid-cols-5">
        <div class="col-span-1 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
            <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
                <a href="#" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Filter</a>
                <button class="md:hidden rounded-lg focus:outline-none focus:shadow-outline" @click="open = !open">
                    <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                    <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <nav :class="{'block': open, 'hidden': !open}" class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
                <div class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    Price (Min-Max)
                    <div class="flex flex-row">
                        <div class="mr-1">
                            <label for="">Min</label>
                            <t-input v-model="filter.priceMin" 
                                @keyup="fetch()"
                                type="number"
                                name="price-min" />
                        </div>
                        <div class="ml-1">
                            <label for="">Max</label>
                            <t-input v-model="filter.priceMax" 
                                @keyup="fetch()"
                                type="number"
                                name="price-max" />
                        </div>
                    </div>
                    <div class="mt-2 flex justify-end">
                        <t-button>Apply filter</t-button>
                    </div>
                </div>
                <div class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    Category
                    <t-radio-group 
                        name="category" 
                        @change="fetch()"
                        value-attribute="id"
                        text-attribute="name"
                        v-model="filter.category"
                        :options="categories"></t-radio-group>

                </div>
                <div class="flex flex-col px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    In Store Availability
                    <div class="flex w-full text-right">
                        <t-radio-group name="available"
                            v-model="filter.available" 
                            @change="fetch()"
                            :options="[
                                { value: 'all', label: 'All' },
                                { value: 1, label: 'Available' },
                                { value: 0, label: 'Not Available' },
                            ]"></t-radio-group>

                    </div>
                </div>
                
            </nav>
        </div>
        <div class="col-span-4 h-auto flex flex-col w-full text-gray-700 dark-mode:text-gray-200 dark-mode:bg-gray-800 px-6 py-8 bg-gray-100">
            <div class="text-lg mb-4">Products</div>
            <t-table
                :responsive="true"
                :responsive-breakpoint="768"
                :data="products"
                :headers="headers"
            >
                <template v-if="!products.length" v-slot:tbody="props">
                    <tbody :class="props.tbodyClass">
                    <tr :class="[props.trClass, 'text-center']">
                        <td :class="props.tdClass" colspan="5">
                        <t-alert show :dismissible="false" variant="error">
                            No product was found!
                        </t-alert>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </t-table>
            <div class="mt-2 self-end">
                <t-pagination :total-items="pagination.total"
                    :per-page="pagination.per_page"
                    :limit="20"
                    @change="paginate"
                    :value="pagination.current_page" />
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import { isNull } from 'lodash'

export default {

    data: () => ({
        open: true,
        categories: [],
        filter: {
            available: 'all',
            priceMin: null,
            priceMax: null,
            category: null
        }
    }),

    computed: {

        products() {
            return this.$store.getters['product/items']
        },

        pagination() {
            return this.$store.getters['product/pagination']
        },

        headers() {
            return [
                {
                    value: 'name', 
                    text: 'Name'
                }, 
                {
                    value: 'price', 
                    text: 'Price'
                },
                {
                    value: 'description', 
                    text: 'Description'
                },
                {
                    value: 'category_name', 
                    text: 'Category'
                }, 
                {
                    value: 'available', 
                    text: 'In Store Availability'
                },
            ]
        }
    },

    methods: {

        fetch(page = 1) {
            let { priceMin, priceMax } = this.filter
            let params = { 
                page: page,
                available: this.filter.available,
                category: this.filter.category,
                price: `${priceMin ?? ''}${!isNull(priceMax) ? `-${priceMax}` : ''}`
            }
            this.$store.dispatch('product/fetch', { params })
        },

        paginate(page) {
            if (page > 1)
                this.fetch(page)
        }
    },

    async created() {
        const {data} = await axios.get('/api/category')
        this.categories = data
        this.fetch()
    },
}

</script>
