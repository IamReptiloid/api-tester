<template>
    <div class="workspaces">
        <div class="workspaces__history history">

        </div>

        <div class="workspaces__section">
            <div class="workspaces__url">{{URLWithData}}</div>
            <div v-if="!URLWithData" class="workspaces__url">URL</div>
            <div class="workspaces__input requests">
                <custom-select 
                    v-model="requestType" 
                    :option="requestOption" 
                    class="requests__select"/>
                <input 
                    v-model="requestURL" 
                    placeholder="Enter URL" 
                    class="requests__input"
                >
                <blue-custom-button 
                    class="requests__btn" 
                    @click="send()"
                >
                Send
                </blue-custom-button>
            </div>
            <params-request :data="data" class='workspaces__params'/>
        </div>
        
    </div>
</template>

<script>
    import {request} from '@/services/request';
    import {defineAsyncComponent} from 'vue';
    import URL from '@/services/URL';

    export default {
        components: { 
            ParamsRequest: defineAsyncComponent(() => import('../shared/components/ParamsRequest.vue')) 
        },

        setup() {

            const {requestURL, data, URLWithData} = URL();
            const {requestType, cons, requestOption} = request(URLWithData);

            return {
                requestOption,
                requestURL,
                data,
                URLWithData,
                requestType,
                cons,
            }
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