<template>
  <div class="container-fluid px-5">
    <div class="row py-3">
      <div class="col-12 col-lg-8">
        <div class="card card-order border border-secondary">
          <Form v-slot="{ errors }" @submit="submitOrder">
            <div class="card-body text-start">
              <div class="card-title text-uppercase">
                Customer information
              </div>
              <div class="text-end">
                *compulsory field
              </div>
              <div class="input-group mb-3">
                <label for="customerName" class="w-100 mb-2">Name*</label>
                <Field
                  id="customerName"
                  name="Name"
                  type="text"
                  aria-label="Customer name input"
                  class="form-control"
                  :class="{ 'is-invalid': errors['Name'] }"
                  rules="required"
                  v-model="order.user.name"
                ></Field>
                <ErrorMessage name="Name" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="input-group mb-3">
                <label for="customerEmail" class="w-100 mb-2">Email*</label>
                <Field
                  id="customerEmail"
                  name="Email"
                  type="email"
                  aria-label="Customer email input"
                  class="form-control"
                  :class="{ 'is-invalid': errors['Email'] }"
                  rules="email|required"
                  v-model="order.user.email"
                ></Field>
                <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="input-group mb-3">
                <label for="customerPhone" class="w-100 mb-2">Phone*</label>
                <Field
                  id="customerPhone"
                  name="Phone"
                  type="tel"
                  placeholder="852-98765432"
                  aria-label="Customer phone input"
                  class="form-control"
                  :class="{ 'is-invalid': errors['Phone'] }"
                  :rules="isPhone"
                  v-model="order.user.tel"
                ></Field>
                <ErrorMessage name="Phone" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="input-group mb-3">
                <label for="customerAddress" class="w-100 mb-2">Address*</label>
                <Field
                  id="customerAddress"
                  name="Address"
                  type="text"
                  aria-label="Customer address input"
                  class="form-control"
                  :class="{ 'is-invalid': errors['Address'] }"
                  rules="required"
                  v-model="order.user.address"
                ></Field>
                <ErrorMessage name="Address" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="input-group mb-3">
                <label for="orderPickupDate" class="w-100 mb-2">Laundry Pickup Date *</label>
                <Field
                  id="orderPickupDate"
                  name="Pickup Date"
                  type="date"
                  aria-label="Customer laundry pickup date input"
                  class="form-control"
                  :class="{ 'is-invalid': errors['Pickup Date'] }"
                  rules="required"
                  v-model="order.pickupDate"
                ></Field>
                <ErrorMessage name="Pickup Date" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="input-group mb-3">
                <label for="orderDeliveryDate" class="w-100 mb-2">Laundry Delivery Date *</label>
                <Field
                  id="orderDeliveryDate"
                  name="Delivery Date"
                  type="date"
                  aria-label="Customer laundry delivery date input"
                  class="form-control"
                  :class="{ 'is-invalid': errors['Delivery Date'] }"
                  rules="required"
                  v-model="order.returnDate"
                ></Field>
                <ErrorMessage name="Delivery Date" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="input-group mb-3">
                <label for="orderMessage" class="w-100 mb-2">Message</label>
                <textarea
                  name="Order Message"
                  id="orderMessage"
                  class="w-100"
                  rows="5"
                  aria-label="Order message input"
                  required
                  v-model="order.message"
                ></textarea>
              </div>
            </div>
            <div class="card-footer border-top-0 bg-white p-3">
              <div class="row">
                <div class="col-12 col-lg-6">
                  <button
                    type="button"
                    class="d-flex align-items-center w-100 btn text-uppercase"
                    @click="backToCart"
                  >
                    <img src="../../assets/icon/arrow-left-circle.svg"
                    alt="" class="edit-bag-icon me-2" />
                    <span>edit bag</span>
                  </button>
                </div>
                <div class="col-12 col-lg-6">
                  <button
                    type="submit"
                    class="w-100 h-100 btn btn-primary text-uppercase"
                    :disabled="isLoading"
                  >
                    <div
                      class="spinner-grow spinner-grow-sm me-2"
                      role="status"
                      v-if="isLoading"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    check out
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card card-order-summary border border-secondary w-100">
          <div class="card-body text-start">
            <table class="table order-table">
              <tbody>
                <tr v-for="(item) in cart.carts" :key="item.id">
                  <td class="td-order-img">
                    <div class="orderImg-wrapper">
                      <img :src="item.product.imageUrl" alt="" class="w-100 h-100" />
                    </div>
                  </td>
                  <td>
                    <div class="product-title-wrapper">
                      <div class="order-product-content">
                        <strong>{{ item.product.title }}</strong>
                      </div>
                      <div class="color-label"></div>
                      <div
                        v-if="item.dryClean"
                        class="order-product-content text-uppercase text-muted"
                      >
                        dry clean service
                      </div>
                      <div
                        v-if="item.wetClean"
                        class="order-product-content text-uppercase text-muted"
                      >
                        wet clean service
                      </div>
                      <div
                        v-if="item.ironing"
                        class="order-product-content text-uppercase text-muted"
                      >
                        ironing service
                      </div>
                    </div>
                  </td>
                  <td class="td-order-qty">
                    <div class="order-product-content">x {{ item.qty }}</div>
                  </td>
                  <td class="text-end">
                    <div class="order-product-content">
                      {{ item.final_total }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer p-3 border-top-0 bg-white">
            <table class="w-100">
              <tbody class="">
                <tr>
                  <td class="text-uppercase text-start">subtotal</td>
                  <td class="text-end">$ {{ cart.total }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase text-start">discount</td>
                  <td class="text-end">$ 0</td>
                </tr>
                <tr>
                  <td class="text-uppercase text-start">shipping</td>
                  <td class="text-end">$ 0</td>
                </tr>
                <tr>
                  <td class="text-uppercase text-start">total</td>
                  <td class="text-end">$ {{ cart.final_total }}</td>
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
      cart: {},
      order: {
        user: {},
      },
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.cart = res.data.data;
          } else {
            alert(res.data.message);
          }
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    backToCart() {
      this.$router.push({ name: 'Cart' });
    },
    isPhone(value) {
      const phoneNumber = /^[0-9]{3}-[0-9]{8}$/;
      return phoneNumber.test(value) ? true : 'Invalid phone number';
    },
    submitOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http
        .post(url, { data: this.order })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$router.push(`/order/${res.data.orderId}`);
          } else {
            alert(res.data.message);
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
