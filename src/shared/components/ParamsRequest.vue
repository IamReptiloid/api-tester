<template>
    <table>
        <tr>
            <th>#</th>
            <th>KEY</th>
            <th>VALUE</th>
        </tr>
        <tr 
            v-for="(item, index) in data" 
            :key="index" 
            @input="updateCustomInput"
        >
            <td>
                <input 
                    type="checkbox" 
                    :checked="item.disable" 
                    @click="item.disable = !item.disable">
            </td>
            <td>
                <input 
                    v-model="item.key"  
                    placeholder="KEY" 
                    class="KEY"
                    @input="addParams(index, $event)"
                />
            </td>
            <td>
                <input 
                    v-model="item.value"  
                    placeholder="VALUE" 
                    lass="VALUE" 
                    @input="addParams(index, $event)"
                />
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
            }
        },

        methods: {
            addParams(index, event) {
                if(index === this.data.length - 1) {
                    this.data.push({
                        key: event.target.placeholder == 'KEY'? event.target.value : '',
                        value: event.target.placeholder == 'VALUE'? event.target.value : '',
                        disable: false,
                    });
                    // console.log(this.data[this.data.length - 1].key)
                    this.data[this.data.length - 1].key = '';
                    this.data[this.data.length - 1].value = '';
                    this.data[this.data.length - 2].disable = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    table {
        width: 100%;
    }
    th {
        text-align: left;
        padding: 5px;
        background-color: #f2f2f2;
    }
    td {
        border-bottom: 1px solid #f2f2f2;
        padding: 5px;
    }
</style>