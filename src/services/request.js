import {ref} from "vue";
import axios from 'axios';


export function request(URLWithData) {
    const requestType = ref('');
    const requestOption = [
        {name: 'Get', value: 'get'},
        {name: 'Post', value: 'post'},
    ];

    const send = () => {
        console.log(axios[requestType.value](URLWithData.value));
    };

    return {
        requestType,
        send,
        requestOption
    };
}