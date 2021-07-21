<template>
  <div class="container">
    <Form id="loginValidate" v-slot="{ errors }" @submit="login">
      <div
        class="
              page-center-wrapper
              d-flex
              align-items-center
              justify-content-center
            "
      >
        <div class="card card-login border-secondary bg-light">
          <div class="card-body login-card-body">
            <h1 class="text-uppercase m-0">Admin Login</h1>
          </div>
          <div
          class="input-group login-group border border-secondary border-start-0 border-end-0">
            <label for="email" class="form-label text-uppercase m-0 me-2">Email</label>
            <Field
              id="email"
              name="Email"
              type="email"
              class="form-control border-0 bg-light"
              :class="{ 'is-invalid': errors['Email'] }"
              placeholder="Email"
              aria-label="Email input"
              aria-describedby="emailLabel"
              rules="required"
              v-model="user.username"
            />
            <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="input-group login-group">
            <label for="password" class="form-label text-uppercase m-0 me-2"
              >Password</label
            >
            <Field
              id="password"
              name="Password"
              type="password"
              class="form-control border-0 bg-light"
              :class="{ 'is-invalid': errors['Password'] }"
              placeholder="Password"
              aria-label="Password input"
              aria-describedby="passwordLabel"
              rules="required"
              v-model="user.password"
            />
            <ErrorMessage name="Password" class="invalid-feedback"></ErrorMessage>
          </div>
          <button type="submit" id="login"
          class="btn btn-primary btn-lg text-uppercase">
            Login
          </button>
        </div>
      </div>
    </Form>
  </div>
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
    // 登入驗證
    login() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(url, this.user) // request
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data; // 解構寫法, 縮寫
            // 儲存 token 在 cookies
            document.cookie = `userToken=${token}; expires=${new Date(expired)}`;
            this.$router.push('/admin/products');// 更新頁面
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
