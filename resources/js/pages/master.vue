<template>
    <div class="text-app-gray">
        <nav class="bg-app-red sm:mb-32 mb-8">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative flex items-center justify-center text-white h-16 uppercase">
                    Calculator
                </div>
            </div>
        </nav>
        <div class="justify-center flex">
            <div class="grid grid-cols-3 mx-4 form-container py-4 px-8 sm:py-7 sm:px-14 justify-center content-center text-center">
                <div class="sm:col-start-2 sm:col-span-1 col-start-1 col-end-4">
                    <div>Enter the numbers</div>
                    <div class="mt-4">
                        <t-input v-model="form.first_addend" 
                            placeholder="number 1"
                            type="number"/>
                    </div>
                    <div class="mt-2">
                        <t-input v-model="form.second_addend" 
                            placeholder="number 2"
                            type="number"/>
                    </div>
                    
                    <div class="mt-4">
                        <t-button @click="submit" 
                            :disabled="form.isBusy"
                            class="w-full">
                            Sum
                        </t-button>
                    </div>
                </div>
                <div class="separator col-start-1 col-end-4 mt-8 flex content-center my-8 sm:my-6"></div>
                <div class="sm:col-start-2 col-start-1 col-end-4 sm:col-end-2">
                    <div>Results</div>
                    <div class="mt-4">
                        <t-input v-model="sum" 
                            :readonly="true"
                            type="number"/>
                    </div>
                </div>
                <div class="col-start-1 col-end-4 mt-8">
                    <div class="mt-5">Result history</div>
                        <t-table
                            :responsive="true"
                            :responsive-breakpoint="768"
                            :data="histories"
                            :headers="headers"
                        >
                            <template v-if="!histories.length" v-slot:tbody="props">
                                <tbody :class="props.tbodyClass">
                                <tr :class="[props.trClass, 'text-center']">
                                    <td :class="props.tdClass" colspan="5">
                                    <t-alert show :dismissible="false" variant="error">
                                        No history!
                                    </t-alert>
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </t-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import { isNull } from 'lodash'

export default {

    data: () => ({
        form: {
            first_addend: '',
            second_addend: '',
            isBusy: false
        },
        sum: '',
        histories: [],
    }),

    computed: {

        headers() {
            return [
                {
                    value: 'first_addend', 
                    text: 'First addend'
                }, 
                {
                    value: 'second_addend', 
                    text: 'Second addend'
                }, 
                {
                    value: 'sum', 
                    text: 'Sum'
                }, 
            ]
        }
    },

    methods: {

        async fetch() {
            const { data } = await axios.get('/api/calculate/history')
            this.histories = data
        },

        async submit() {
            this.form.isBusy = true
            const { data: { sum } } = await axios.post(`/api/calculate`, this.form)
                .catch((err) => {
                    console.log('err', err);
                })
                .finally(() => {
                    this.form.isBusy = false
                })
                this.sum = sum
                this.fetch() 
            
        }
    },

    async created() {
        this.fetch()
    },
}

</script>
<style lang="scss" scoped>
    .form-container {
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 2px 6px 10px #00000029;
        border: 0.5px solid #A4A4A4;
        border-radius: 4px;
        width: 740px;
        opacity: 1;
    }

    .separator {
        border: 1px solid #C10708;
        opacity: 1;
    }
</style>