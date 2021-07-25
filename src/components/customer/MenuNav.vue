<template>
  <!-- Menu sidebar -->
  <nav class="menu-sidebar text-uppercase" :class="menuOpened ? 'expand' : ''">
    <div class="menu-sidebar-wrapper">
      <a
        class="nav-sidebar-toggler cursor-pointer px-5 py-3 bg-gray-800 text-uppercase
        d-flex justify-content-between"
        @click.prevent="toggleCollapse"
      >
        <span class="">Menu</span>
        <i class="material-icons md-36 nav-sidebar-toggler-icon" :class="menuOpened ? 'rotate' : ''"
          >add</i
        >
      </a>
      <div class="collapse" ref="MenuCollapse">
        <div class="card card-body bg-gray-800 position-relative">
          <MenuKnob></MenuKnob>
          <ul class="list-unstyled position-absolute top-50 start-0 translate-middle-y">
            <li class="ps-5 mb-3">
              <router-link class="" to="/products">Services</router-link>
            </li>
            <li class="ps-5 mb-3">
              <router-link class="" to="/cart">Cart</router-link>
            </li>
            <li class="ps-5 mb-3">
              <router-link class="" to="/about">About</router-link>
            </li>
            <li class="ps-5">
              <router-link class="" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import MenuKnob from '@/components/customer/MenuKnobP5.vue';

export default {
  data() {
    return {
      collapse: '',
      menuOpened: false,
    };
  },
  components: {
    MenuKnob,
  },
  methods: {
    toggleCollapse() {
      this.collapse.toggle();
      this.menuOpened = !this.menuOpened;
    },
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.MenuCollapse, {
      toggle: false,
    });
  },
};
</script>
