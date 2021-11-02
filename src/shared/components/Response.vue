<template>
    <div v-if="data">
        <perfect-scrollbar>
            <vue-json-pretty :path="'res'" :data="data" class="output">
            </vue-json-pretty>
        </perfect-scrollbar>

    </div>
    <div v-if="!data" class="output"></div>

</template>

<script>
import {defineAsyncComponent} from 'vue';
import 'vue-json-pretty/lib/styles.css';

export default {
    props: {
        data: {
            type: Object,
        }
    },

    components: {
        VueJsonPretty: defineAsyncComponent(() => import('vue-json-pretty')),
    },
}
</script>

<style lang="scss" scoped>
    .output {
        min-height: 500px;
    }
    .ps {
        height: 500px;
        overflow-y: auto;
    }
</style>