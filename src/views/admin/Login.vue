<template>
  <div class="container">
    <Form id="loginValidate" v-slot="{ errors }" @submit="login">
      <div
        class="
              page-center-wrapper
              d-flex
              flex-column
              align-items-center
              justify-content-center
            "
      >
        <h1 class="h2 text-uppercase m-0">Admin Login</h1>
        <div class="card card-login card-shadow rounded-0 mt-3">
          <div
          class="input-group login-group mt-6">
            <Field
              id="email"
              name="Email"
              type="email"
              class="form-control border-0 rounded-0"
              :class="{ 'is-invalid': errors['Email'] }"
              placeholder="Email"
              aria-label="Email input"
              aria-describedby="emailLabel"
              rules="required"
              v-model="user.username"
            />
            <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="input-group login-group mb-6">
            <Field
              id="password"
              name="Password"
              type="password"
              class="form-control border-0 rounded-0"
              :class="{ 'is-invalid': errors['Password'] }"
              placeholder="Password"
              aria-label="Password input"
              aria-describedby="passwordLabel"
              rules="required"
              v-model="user.password"
            />
            <ErrorMessage name="Password" class="invalid-feedback"></ErrorMessage>
          </div>
          <button
            type="submit"
            id="login"
            class="btn btn-dark btn-lg rounded-0 text-uppercase"
          >
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
