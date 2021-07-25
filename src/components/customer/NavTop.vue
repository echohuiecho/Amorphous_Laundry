<template>
  <nav class="navbar navbar-dark fixed-top" :class="navClassList.navbarTop" id="navbar-top">
    <div class="container-fluid">
      <div class="logo-wrapper">
        <img src="../../assets/icon/logo.png" alt="" class="logo" />
        <router-link class="ms-2" to="/">Amorphous Laundry</router-link>
      </div>
      <button
        class="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
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
</template>

<script>
import emitter from '@/components/tools/emitter';

export default {
  data() {
    return {
      navClassList: {
        navbarTop: '',
      },
    };
  },
  created() {
    emitter.on('updateNav', (data) => {
      this.navClassList = data;
    });
  },
};
</script>
