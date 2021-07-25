<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="logo-wrapper me-3">
        <img src="../../assets/icon/logo.png" alt="" class="logo" />
        <router-link class="ms-2" to="/admin/products">Amorphous Laundry Dashboard</router-link>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarText" aria-controls="navbarText"
      aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons">Coupons</router-link>
          </li>
          <li class="nav-item">
            <button class="btn text-white" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // 確認是否已登入
    checkLogin() {
      const url = `${process.env.VUE_APP_API}api/user/check`;
      // 取得 Token
      // eslint-disable-next-line no-useless-escape
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;
      this.$http
        .post(url)
        .then((res) => {
          if (!res.data.success) {
            alert('Please log in again');
            this.$router.push('/login');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 登出
    logout() {
      const url = `${process.env.VUE_APP_API}logout`;
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            // 刪除 cookie
            document.cookie = 'userToken=; expires=; path=/;';
            this.$router.push('/login');
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>

<style lang="scss">
@import '../../assets/all';
</style>
