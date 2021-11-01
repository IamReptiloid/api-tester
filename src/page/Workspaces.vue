<template>
    <div class="workspaces">
        <div class="workspaces__history history">

        </div>

        <div class="workspaces__section">
            <div class="workspaces__url">{{URLWithData}}</div>
            <div v-if="!URLWithData" class="workspaces__url">URL</div>
            <div class="workspaces__input requests">
                <select @change="changeOption" class="requests__select">
                    <option
                        v-for="(option, index) in requestOption"
                        :key="index"
                        :value="option"
                    >
                        {{ option }}
                    </option>   
                </select>
                <input 
                    v-model="requestURL" 
                    placeholder="Enter URL" 
                    class="requests__input"
                >
                <button 
                    class="requests__btn blue-btn" 
                    @click="send()"
                >
                Send
                </button>
            </div>
            <params-request :data="data" class='workspaces__params'/>
        </div>
        
    </div>
</template>

<script>
    import {defineAsyncComponent} from 'vue';
    import axios from 'axios';

    export default {
        data: () => ({
            requestType: '',
            requestOption: [
                'Get', 'Post'
            ],
            requestURL: '',
            data: [{key: '', value: '', disable: false}],
        }),

        methods: {
            send() {
                console.log(axios[this.requestType](this.URLWithData))
            },

            changeOption(event) {
                this.requestType = event.target.value.toLowerCase()
            },
        },

        computed: {
            URLWithData() {
                let temp = this.requestURL

                if(!this.data.length == 0) {
                    temp = temp + '?'
                    this.data.forEach(element => {
                        if(element.disable){
                            temp  = temp + element.key + '=' + element.value + '&'
                        }
                });
                    temp = temp.slice(0, temp.length - 1);
                }
                
                return temp;  
            },
        },
        
        mounted() {
            this.requestType = this.requestOption[0].toLowerCase();
        },

        components: { 
            ParamsRequest: defineAsyncComponent(() => import('../shared/components/ParamsRequest.vue')) 
        },
    }
</script>

<style lang="scss" scoped>
    .workspaces {
        display: flex;
        &__section {
            flex: 1 1 auto;
        };
        &__history {
            flex-basis: 300px;
            background-color: #f2f2f2;
            height: 100vh;
        };
        &__url {
            margin: 5px;
        };
        &__params {
            margin: 0 0 0 5px;
        }
    }
    .requests {
        display: flex;
        margin: 0 0 10px 0;
        &__input {
            flex: 1 1 auto;
            border-radius: 0 5px 5px 0;
            padding: 0 0 0 5px;
            border: 1px solid #d1d1d1;
            border-left: 0px;
            background-color: #f2f2f2;
        };
        &__btn {
            margin: 0 0 0 5px;
            padding: 10px;
            font-size: 14px;
        };
        &__select {
            background-color: #f2f2f2;
            border-radius: 5px 0 0 5px;
            margin: 0 0 0 5px;
            border: 1px solid #d1d1d1;
            border-right: 0px;
        }
    }
</style>