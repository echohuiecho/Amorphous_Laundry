<template>
  <div class="position-absolute nav-sidebar d-flex flex-column align-items-end">
    <!-- Menu sidebar -->
    <MenuNav></MenuNav>
    <!-- About sidebar -->
    <div class="about-sidebar mt-3">
      <a
        class="nav-sidebar-toggler cursor-pointer px-5 py-3 bg-gray-800 text-uppercase
        d-flex justify-content-between"
        @click.prevent="toggleAboutCollapse"
      >
        <span class="">About</span>
        <i
          class="material-icons md-36 nav-sidebar-toggler-icon"
          :class="aboutOpened ? 'rotate' : ''"
          >add</i
        >
      </a>
      <div class="collapse" ref="AboutCollapse">
        <div class="card card-body bg-gray-800 position-relative px-5">
          <p>
            Amorphous Laundry is a professional laundry services provider providing comprehensive
            washing and dry-cleaning services. It is under Amorphous Hotel which is a virtual hotel
            is a 'virtual hotel' that discusses human needs, particularly its relation to
            architecture and sensory.
          </p>
          <p>
            If you love your items to be clean and white, we provide the best laundry service and
            bleaching service under our care. We are surely the laundry shop of choice.
          </p>
        </div>
      </div>
    </div>
    <!-- Expore our service card -->
    <div
      class="service-sidebar
      card card-body bg-gray-800
      text-uppercase position-relative px-5 mt-3"
    >
      <div class="service-label-wrapper d-flex justify-content-between align-items-center p-3">
        <img
          src="../../assets/icon/machine_wash.svg"
          alt=""
          class="machine-wash-label"
        />
        <img src="../../assets/icon/dry_clean.svg" alt="" class="dry-clean-label" />
        <img src="../../assets/icon/tumble-dry.svg" alt="" class="tumble-dry-label" />
        <img src="../../assets/icon/bleach.svg" alt="" class="bleach-label" />
      </div>
      <hr class="line-gray-600" />
      <div class="small text-uppercase mt-3">we provide</div>
      <div class="h5">machine wash</div>
      <div class="small text-uppercase mt-3">we provide</div>
      <div class="h5">dry cleaning</div>
      <div class="small text-uppercase mt-3">we provide</div>
      <div class="h5">tumble dry</div>
      <div class="small text-uppercase mt-3">we provide</div>
      <div class="h5">bleaching</div>
      <hr class="line-gray-600" />
      <router-link
        class="cursor-pointer text-uppercase
        d-flex justify-content-between align-items-center"
        to="/products"
      >
        <span class="h5 m-0">explore our service</span>
        <i
          class="material-icons md-36 nav-sidebar-toggler-icon"
          >chevron_right</i
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import MenuNav from '@/components/customer/MenuNav.vue';
// import MenuKnob from '@/components/customer/MenuKnobP5.vue';

export default {
  data() {
    return {
      collapse: '',
      aboutCollapse: '',
      menuOpened: false,
      aboutOpened: false,
    };
  },
  components: {
    MenuNav,
    // MenuKnob,
  },
  methods: {
    // toggleCollapse() {
    //   this.collapse.toggle();
    //   this.menuOpened = !this.menuOpened;
    // },
    toggleAboutCollapse() {
      this.aboutCollapse.toggle();
      this.aboutOpened = !this.aboutOpened;
    },
  },
  mounted() {
    // this.collapse = new Collapse(this.$refs.MenuCollapse, {
    //   toggle: false,
    // });
    this.aboutCollapse = new Collapse(this.$refs.AboutCollapse, {
      toggle: false,
    });
  },
};
</script>
