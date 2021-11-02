<template>
    <div class="workspaces">
        <div class="workspaces__history history">
            
        </div>

        <div class="workspaces__section">
            <div v-if="URLWithData" class="workspaces__url">{{URLWithData}}</div>
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
            <div class="workspaces__space"></div>
            <p class="workspaces__response">Response</p>
            <test-g :data="answer" class="workspaces__answer"/>
        </div>
        
    </div>
</template>

<script>
import {defineAsyncComponent} from 'vue';
import {ref, onMounted, reactive, computed} from 'vue'
import axios from 'axios';

export default {
    setup() {
        const requestType = ref('');
        const requestOption = [ 'GET', 'POST'];
        const requestURL = ref('');
        const data = reactive([{key: '', value: '', disable: false}]);
        const answer = reactive({})

        const URLWithData = computed(() => {
            let temp = requestURL.value;

            if(!data.length == 0 && temp) {
                temp = temp + '?';
                data.forEach(element => {
                    if(element.disable){
                        temp  = temp + element.key + '=' + element.value + '&';
                    };
            });
                temp = temp.slice(0, temp.length - 1);
            }
            
            return temp;
        });

        const changeOption = (event) => {
            requestType.value = event.target.value.toLowerCase()
        };

        const send = async() => {
            try {
                answer.value = await axios[requestType.value](URLWithData.value);
                answer.value = answer.value.data;
            } catch(error) {
                alert('error')
            }
        }

        onMounted(() => {requestType.value = requestOption[0].toLowerCase()})

        return {
            requestType,
            requestOption,
            requestURL,
            data,
            URLWithData,
            changeOption,
            send,
            answer,
        }
    },

    components: { 
        ParamsRequest: defineAsyncComponent(() => import('../shared/components/ParamsRequest.vue')),
        TestG: defineAsyncComponent(() => import('@/shared/components/TestG')),
    },
}
</script>

<style lang="scss" scoped>
    .workspaces {
        display: flex;
        &__answer {
            margin: 0 0 8px 5px;
        }
        &__section {
            padding: 40px 0 0 0;
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
        };
        &__space {
            flex: 1 1 auto;
        }
        &__history {
            padding: 40px 0 0 0;
            min-width: 300px;
            background-color: #f2f2f2;
            min-height: 100vh;
        };
        &__url {
            margin: 5px;
        };
        &__params {
            margin: 0 0 0 5px;
        };
        &__response {
            margin: 0 0 0 5px;
            &::after {
                padding: 8px 0 0 0;
                content: '';
                border-bottom: 1px solid rgb(230,230,230);
                height: 1px;
                display: block;
                width: 100%;
            }
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
            margin: 0 5px 0 5px;
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