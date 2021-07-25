<template>
  <div class="position-absolute nav-sidebar d-flex flex-column align-items-end">
    <!-- Menu sidebar -->
    <MenuNav></MenuNav>
  </div>
  <div class="main-content-wrapper container-fluid">
    <div class="row">
      <div class="col-12 col-lg-7">
        <p class="h2 font-regular mt-5">
          Amorphous Laundry is a professional laundry services provider providing comprehensive
          washing and dry-cleaning services. It is under Amorphous Hotel which is a virtual hotel is
          a 'virtual hotel' that discusses human needs.<br /><br />If you love your items to be
          clean and white, we provide the best laundry service and bleaching service under our care.
          We are surely the laundry shop of choice.
        </p>
      </div>
    </div>
  </div>
  <div class="about-pill position-absolute bottom-0 mb-7">
    <div class="pill-msg rounded-pill py-3 px-4">
      <span class="h2 en text-uppercase">about The laundry</span>
    </div>
  </div>
  <div class="position-absolute bottom-0 w-100">
    <Footer></Footer>
  </div>
</template>

<script>
import MenuNav from '@/components/customer/MenuNav.vue';
import Footer from '@/components/customer/Footer.vue';

export default {
  components: {
    MenuNav,
    Footer,
  },
};
</script>
