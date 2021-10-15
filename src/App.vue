<template>
  <div class="wrapper">
    <custom-nav/>
    <custom-input/>
    <router-view/>
  </div>
</template>

<script>
import CustomNav from '@/components/CustomNav'

export default({
  components: {
    CustomNav,
  }
})
</script>


<style src='@/styles/config.scss' lang="scss">

</style>
