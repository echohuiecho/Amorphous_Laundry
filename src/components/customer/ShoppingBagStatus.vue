<template>
  <router-link
    to="/cart"
    class="shopping-bag-icon-wrapper position-relative d-inline"
  >
    <div class="shopping-bag-num-wrapper bg-primary text-gray-700
    position-absolute rounded-circle
    d-flex align-items-center justify-content-center">
      <span class="num">
        {{ cart }}
      </span>
    </div>
    <img
      src="../../assets/icon/machine_wash.svg"
      alt=""
      class="machine-wash-label"
    />
  </router-link>
</template>

<script>
export default {
  props: ['cart'],
};
</script>
