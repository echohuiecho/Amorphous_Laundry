<template>
  <nav class="navbar  navbar-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Amorphous Laundry</router-link>
      <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarText" aria-controls="navbarText"
      aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-lg-none" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">Cart</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-8"></div>
    </div>
    <MenuNav
    >
    </MenuNav>
  </div>
  <router-view></router-view>
</template>

<script>
import MenuNav from '@/components/customer/MenuNav.vue';

export default {
  name: 'Front Layout',
  components: {
    MenuNav,
  },
};
</script>

<style lang="scss">
@import '../../assets/all';
</style>
