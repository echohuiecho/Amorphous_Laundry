<template>
  <div class="footer-wrapper bg-dark mt-8" id="footer">
    <div class="container-fluid py-2 d-flex justify-content-between ">
      <div class="footer-link-wrapper">
        <router-link to="/about" class="text-uppercase">About</router-link>
        <a href="https://www.instagram.com/amorphous_hotel/" target="_blank" class="text-uppercase ms-2">Instagram</a>
      </div>
      <span class="en text-uppercase">amorphous hotel all rights reserved.</span>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const footer = document.getElementById('footer');
    console.dir(footer.offsetTop);
    this.$emit('footer-position', footer.offsetTop);
  },
};
</script>
