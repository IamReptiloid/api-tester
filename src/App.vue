<template>
  <div class="wrapper">
    <custom-nav class="custom-nav"/>
    <router-view/>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue';

export default({
  components: {
    CustomNav: defineAsyncComponent(() => import('@/shared/components/CustomNav')) 
  }
})
</script>


<style src='@/styles/config.scss' lang="scss">
  
</style>
