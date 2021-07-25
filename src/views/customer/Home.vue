<template>
  <div class="container-fluid landing-container position-fixed w-100">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="d-flex flex-column justify-content-between h-lg-85">
          <div class="landing-pill mt-5">
            <div class="pill-msg rounded-pill py-3 px-4">
              <span class="h2 en text-uppercase">The Guide to</span>
            </div>
            <div class="pill-msg rounded-pill py-3 px-4 mt-2">
              <span class="h2 en text-uppercase">Not Getting Dirty</span>
            </div>
          </div>
          <div class="content-wrapper">
            <h1 class="text-uppercase">Stop Letting The<br>Tint Bother You</h1>
            <span class="en">Premium Laundry Service and Clothes Bleaching Service</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <HomeSideBar>
  </HomeSideBar>
</template>

<script>
import HomeSideBar from '@/components/customer/HomeSideBar.vue';

export default {
  name: 'Home',
  components: {
    HomeSideBar,
  },
};
</script>

<style lang="scss">
@import '../../assets/all';
</style>
