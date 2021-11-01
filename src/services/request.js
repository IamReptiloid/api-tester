import {ref, onMounted, reactive, computed} from 'vue'
import axios from 'axios';

export function request() {
    const requestType = ref('');
    const requestOption = [ 'Get', 'Post'];
    const requestURL = ref('');
    const data = reactive([{key: '', value: '', disable: false}]);

    const URLWithData = computed(() => {
        let temp = requestURL.value;

        if(!data.length == 0) {
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
            console.log(await axios[requestType.value](URLWithData.value))
        } catch(error) {
            console.log('error')
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
    }
}