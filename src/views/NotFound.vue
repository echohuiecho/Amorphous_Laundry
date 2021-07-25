<template>
  <NavTop></NavTop>
  <div class="main-content-wrapper container-fluid">
    <h1 class="mt-5 text-uppercase">oops, the page is not found.</h1>
    <router-link
      class="btn btn-primary btn-wide rounded-0 text-uppercase mt-4"
      to="/products"
    >
      explore our service
    </router-link>
  </div>
</template>

<script>
import NavTop from '@/components/customer/NavTop.vue';

export default {
  components: {
    NavTop,
  },
};
</script>

<style lang="scss">
@import '../assets/all';
</style>
