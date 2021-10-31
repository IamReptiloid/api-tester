<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'blue-custom-button',
    }
</script>

<style lang="scss" scoped>
    .btn {
        background-color: rgb(9, 123, 237);
        color: #fff;
        border-radius: 5px;
        &:hover {
            background-color: rgb(0, 104, 207);
        }
    }
</style>