import {ref, computed} from 'vue';

export default function URL() {
    const requestURL = ref('');
    const data = ref([{key: '', value: '', disable: false}]);

    const URLWithData = computed(() => {
        let temp = requestURL.value

        if(!data.value.length == 0) {
            temp = temp + '?'
            data.value.forEach(element => {
                if(element.disable){
                    temp  = temp + element.key + '=' + element.value + '&'
                }
        });
            temp = temp.slice(0, temp.length - 1);
        }
        
        return temp;
    })

    return {
        requestURL,
        data,
        URLWithData,
    }
}