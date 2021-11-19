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
                    @click="send(this)"
                    :disabled="!parseToJSONBool"
                    :class="{disable: (!parseToJSONBool)}"
                >
                    Send
                </button>
            </div>
            
            <div class="workspaces__nav">
                <button 
                    class="workspaces__nav-btn" 
                    v-for="(tab, index) in tabs"
                    :key="index"
                    @click="changeParam(index)" 
                    :class="{active: (activeId === index)}"
                >
                 {{tab}}
                </button>
            </div>
            <params-request 
                :data="data" 
                class='workspaces__params' 
                @add="addData"
                v-if="activeId === 0"
            />
            <textarea 
                ref="textarea"
                @keydown="enterTab(this.$refs.textarea, $event)" 
                v-if="activeId === 1" 
                class="workspaces__body textarea" 
                v-model="dataBody"
                @keyup="parseToJSON()"
            >
            </textarea>

            <div class="workspaces__space"></div>
            <p class="workspaces__response">Response</p>
            <response 
                v-if="answer.value" 
                :data="answer.value" 
                class="workspaces__answer"
            />
            <div v-else class="workspaces__answer-empty"></div>
        </div>
        <notifications position="bottom right"/>
    </div>
</template>

<script>
import {defineAsyncComponent} from 'vue';
import {ref, onMounted, reactive, computed} from 'vue';
import axios from 'axios';

export default {
    methods: {
    },
    setup() {
        const requestType = ref('');
        const requestOption = [ 'GET', 'POST', 'PUT', 'PATCH'];
        const requestURL = ref('');
        const data = reactive([{key: '', value: '', disable: false}]);
        const answer = reactive({});
        const activeId = ref(0);
        const tabs = reactive(['Params', 'Body']);
        const dataBody = ref('');
        const parseToJSONBool = ref(false)

        const addData = (event) => {
            console.log(data)
            data.push({
                key: event.placeholder === 'KEY'? event.value : '',
                value: event.placeholder === 'VALUE'? event.value : '',
                disable: false,
            });
            data[data.length - 1].key = '';
            data[data.length - 1].value = '';
            data[data.length - 2].disable = true;
        }

        const URLWithData = computed(() => {
            let temp = requestURL.value;

            if(!data.length === 0 && temp) {
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

        const parseDataBody = () => {
            return dataBody.value.split('\n').join('');
        };

        const parseToJSON = () => {
            try {
                JSON.parse(parseDataBody());
                parseToJSONBool.value = true
            } catch {
                parseToJSONBool.value = false
            } 
        }

        const send = async(th) => {
            let data
            try {
                if(requestType.value === 'get') {
                    answer.value = await axios[requestType.value](URLWithData.value);
                } else {
                    try {
                        data = JSON.parse(parseDataBody());
                    } catch {
                        data = {};
                    }
                    answer.value = await axios[requestType.value](URLWithData.value, data);
                }
                answer.value = answer.value.data;
            } catch(error) {
                th.$notify({
                    title: "Error",
                    text: "404",
                    type: 'error'
                });
            }
        };

        const changeParam = (index) => {
            activeId.value = index;
        };

        const enterTab = (ref, event) => {
            if (event.key === 'Tab') {
                event.preventDefault();
                let start = ref.selectionStart;
                let end = ref.selectionEnd;

                ref.value = ref.value.substring(0, start) +
                "\t" + ref.value.substring(end);

                ref.selectionEnd = start + 1;
            }
        };

        onMounted(() => {requestType.value = requestOption[0].toLowerCase()})

        return {
            parseToJSONBool,
            parseToJSON,
            enterTab,
            dataBody,
            activeId,
            tabs,
            changeParam,
            requestType,
            requestOption,
            requestURL,
            data,
            URLWithData,
            changeOption,
            send,
            answer,
            addData,
        }
    },

    components: { 
        ParamsRequest: defineAsyncComponent(() => import('../shared/components/ParamsRequest.vue')),
        Response: defineAsyncComponent(() => import('@/shared/components/Response')),
    },
}
</script>

<style lang="scss" scoped>
    .workspaces {
        display: flex;
        &__answer {
            margin: 0 0 8px 5px;
        };
        &__answer-empty {
            min-height: 500px;
        };
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
        };
        &__nav {
            margin: 0 0 5px 6px;
            display: flex;
            column-gap: 24px;
        }
        &__nav-btn {
            background-color: #fff;
        };
        &__body {
            flex: 10 10 auto;
        };
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
    .active {
        &::after {
            content: '';
            border-bottom: 1px solid rgb(255, 108, 55);
            height: 1px;
            display: block;
            width: 100%;
        }
    }
    .textarea {
        resize: none;
        margin: 0  5px 0 5px;
        letter-spacing: 1px;
        padding: 10px;
        line-height: 1.5;
        border-radius: 5px;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 1px #999;
    }

    .disable {
        background-color: #c7c7c7;
    }
</style>