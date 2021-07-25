<template>
  <div class="position-absolute nav-sidebar d-flex flex-column align-items-end">
    <!-- Menu sidebar -->
    <MenuNav></MenuNav>
    <!-- About sidebar -->
    <div class="about-sidebar mt-3">
      <a
        class="nav-sidebar-toggler cursor-pointer px-5 py-3 bg-gray-800 text-uppercase
        d-flex justify-content-between"
        @click.prevent="toggleDetailCollapse"
      >
        <span class="">Product Details</span>
        <i
          class="material-icons md-36 nav-sidebar-toggler-icon"
          :class="detailOpened ? 'rotate' : ''"
          >add</i
        >
      </a>
      <div class="collapse" ref="DetailCollapse">
        <div class="card card-body bg-gray-800 position-relative px-5">
          <p>
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>
    <!-- Price card -->
    <div
      class="price-sidebar
      card card-body bg-gray-800
      text-uppercase position-relative px-5 mt-3"
    >
      <div class="h3">Price</div>
      <span class="en">hkd {{ product.price }} / item</span>
    </div>
    <!-- Service card -->
    <div
      class="service-sidebar
      card card-body bg-gray-800
      text-uppercase position-relative px-5 mt-3"
    >
      <div class="h3">service provided</div>
      <div class="small">machine wash</div>
      <div class="small">dry cleaning</div>
      <div class="small">tumble dry</div>
      <div class="small">bleaching</div>
      <hr class="line-gray-600" />
      <div class="service-label-wrapper d-flex justify-content-between align-items-center p-3">
        <img
          v-if="product.wetCleaning"
          src="../../assets/icon/machine_wash.svg"
          alt=""
          class="machine-wash-label"
        />
        <img
          v-if="product.dryCleaning"
          src="../../assets/icon/dry_clean.svg"
          alt=""
          class="dry-clean-label"
        />
        <img
          v-if="product.ironing"
          src="../../assets/icon/ironing_low.svg"
          alt=""
          class="dry-clean-label"
        />
        <!-- <img
          v-if="product.tumbleDry"
          src="../../assets/icon/tumble-dry.svg"
          alt=""
          class="tumble-dry-label"
        />
        <img
          v-if="product.bleach"
          src="../../assets/icon/bleach.svg"
          alt=""
          class="bleach-label"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import MenuNav from '@/components/customer/MenuNav.vue';

export default {
  props: ['product'],
  data() {
    return {
      detailCollapse: '',
      detailOpened: false,
    };
  },
  components: {
    MenuNav,
  },
  methods: {
    toggleDetailCollapse() {
      this.detailCollapse.toggle();
      this.detailOpened = !this.detailOpened;
    },
  },
  mounted() {
    this.detailCollapse = new Collapse(this.$refs.DetailCollapse, {
      toggle: false,
    });
  },
};
</script>
