<template>
  <NavTop></NavTop>
  <router-view></router-view>
</template>

<script>
// import HomeSideBar from '@/components/customer/HomeSideBar.vue';
import NavTop from '@/components/customer/NavTop.vue';

export default {
  name: 'Front Layout',
  components: {
    NavTop,
  },
};
</script>

<style lang="scss">
@import '../../assets/all';
</style>
