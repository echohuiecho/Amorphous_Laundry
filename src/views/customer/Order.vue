<template>
  <div class="main-content-wrapper container-fluid">
    <div class="row py-3">
      <div class="col-12 col-lg-7">
        <div class="card card-body bg-gray-800">
          <div class="h3 text-uppercase">thank for your order, {{ order.name }}!</div>
          <div class="small font-regular text-uppercase">order number #{{ id }}</div>
          <div class="text-light-green mt-3">Name</div>
          <div>{{ order.name }}</div>
          <div class="text-light-green mt-3">Email</div>
          <div>{{ order.email }}</div>
          <div class="text-light-green mt-3">Phone</div>
          <div>{{ order.tel }}</div>
          <div class="text-light-green mt-3">Address</div>
          <div>{{ order.address }}</div>
        </div>
        <router-link
          to="/products"
          class="btn btn-primary rounded-0 text-uppercase mt-5"
        >
          I have more thing to wash
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      id: '',
    };
  },
  methods: {
    getOrder() {
      const loader = this.$loading.show();
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          loader.hide();
          if (res.data.success) {
            // console.log(res.data.order.user);
            this.order = res.data.order.user;
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // created() {
  //   this.getOrder();
  // },
  mounted() {
    this.getOrder();
    this.id = this.$route.params.id;
  },
};
</script>
