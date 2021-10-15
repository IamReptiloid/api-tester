<template>
    <nav class="nav">
        <div class="nav__content">
            <button @click="$router.push('/')" class="nav__btn">Home</button>
            <button @click="$router.push('/Workspaces')" class="nav__btn">Workspaces</button>
        </div>
    </nav>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .nav {
        width: 100%;
        color: rgb(131, 131, 131);
        font-weight: 600;
        font-size: 14px;
        &::after {
            content: '';
            border-bottom: 1px solid rgb(230,230,230);
            height: 1px;
            display: block;
            width: 100%;
        };
        &__content {
            display: flex;
        };
        &__btn {
            padding: 12px;
            background-color: rgb(255,255,255);
        };
    }
</style>