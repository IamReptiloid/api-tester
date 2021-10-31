<template>
  <div class="wrapper">
    <custom-nav class="custom-nav"/>
    <router-view/>
  </div>
</template>

<script>
import CustomNav from '@/shared/components/CustomNav'

export default({
  components: {
    CustomNav,
  }
})
</script>


<style src='@/styles/config.scss' lang="scss">
  body {
    font-size: 12px;
    font-family: 'Inter';
    font-style: normal;
  }
</style>
