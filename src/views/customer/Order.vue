<template>
  <div class="container-fluid px-5">
    <!-- product label -->
    <div class="card product-label border border-secondary ms-5 mb-3 position-fixed">
      <div class="card-footer border-secondary bg-white p-0">
        <div class="laundry-label-wrapper d-flex justify-content-between p-3">
          <a href="#" class="cart-icon" @click="$emit('list-status', 'cartList')">
            <img src="../../assets/icon/machine_wash.svg" alt="" />
          </a>
          <img src="../../assets/icon/dry_clean.svg" alt="" class="dry-clean-label" />
          <img src="../../assets/icon/ironing_low.svg" alt="" class="iron-label" />
        </div>
        <router-link class="w-100 btn btn-primary px-4 text-uppercase" to="/products">
          I have more things to wash
        </router-link>
      </div>
    </div>

    <div class="row py-3">
      <div class="col-12 col-lg-8">
        <h1 class="text-start text-uppercase">thank for your order, {{ order.name }}!</h1>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card card-order-success border border-secondary w-100">
          <div class="card-body">
            <table class="table order-table">
              <thead class="text-uppercase">
                <tr>
                  <th colspan="2" class="text-start">your order has been confirmed!</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-start td-order-success">Name</td>
                  <td class="text-start">{{ order.name }}</td>
                </tr>
                <tr>
                  <td class="text-start td-order-success">Contact</td>
                  <td>
                    <div class="text-start order-contact-wrapper">
                      <div class="order-contact">{{ order.email }}</div>
                      <div class="order-contact">{{ order.tel }}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
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
  created() {
    this.getOrder();
  },
};
</script>
