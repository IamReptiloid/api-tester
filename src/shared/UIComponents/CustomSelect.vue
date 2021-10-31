<template>
    <select v-model="modelValue" @change="changeOption">
        <!-- <option value="">{{ option[0].name }}</option> -->
        <option
            v-for="option in option"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>   
  </select>
</template>

<script>
    export default {
        name: 'custom-select',

        props: {
            modelValue: {
                type: String,
            },

            option: {
                type: Array,
                default: () => [],
            }
        },

        methods: {
            changeOption(event) {
                this.$emit('update:modelValue', event.target.value)
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>