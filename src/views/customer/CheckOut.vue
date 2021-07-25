<template>
  <div class="main-content-wrapper container-fluid px-5">
    <div class="row py-3">
      <div class="col-12 col-lg-7">
        <Form v-slot="{ errors }" @submit="submitOrder">
            <div class="h3 card-title text-uppercase">
              check out - Customer information
            </div>
            <div class="edit-bag-wrapper d-flex align-items-center">
              <button
                type="button"
                class="btn btn-secondary btn-sm btn-narrow rounded-0 text-gray-400 text-uppercase
                d-flex align-items-center"
                @click="backToCart"
              >
                <i class="material-icons">chevron_left</i>
              </button>
              <span class="ms-2 text-uppercase">edit bag</span>
            </div>
            <div class="text-end">
              *compulsory field
            </div>
            <div class="input-group mb-3">
              <label for="customerName" class="w-100 mb-2 text-light-green">Name*</label>
              <Field
                id="customerName"
                name="Name"
                type="text"
                aria-label="Customer name input"
                class="form-control rounded-0 bg-gray-700 border border-gray-600"
                :class="{ 'is-invalid': errors['Name'] }"
                rules="required"
                v-model="order.user.name"
              ></Field>
              <ErrorMessage name="Name" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="customerEmail" class="w-100 mb-2 text-light-green">Email*</label>
              <Field
                id="customerEmail"
                name="Email"
                type="email"
                aria-label="Customer email input"
                class="form-control rounded-0 bg-gray-700 border border-gray-600"
                :class="{ 'is-invalid': errors['Email'] }"
                rules="email|required"
                v-model="order.user.email"
              ></Field>
              <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="customerPhone" class="w-100 mb-2 text-light-green">Phone*</label>
              <Field
                id="customerPhone"
                name="Phone"
                type="tel"
                placeholder="852-98765432"
                aria-label="Customer phone input"
                class="form-control rounded-0 bg-gray-700 border border-gray-600"
                :class="{ 'is-invalid': errors['Phone'] }"
                :rules="isPhone"
                v-model="order.user.tel"
              ></Field>
              <ErrorMessage name="Phone" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="customerAddress" class="w-100 mb-2 text-light-green">Address*</label>
              <Field
                id="customerAddress"
                name="Address"
                type="text"
                aria-label="Customer address input"
                class="form-control rounded-0 bg-gray-700 border border-gray-600"
                :class="{ 'is-invalid': errors['Address'] }"
                rules="required"
                v-model="order.user.address"
              ></Field>
              <ErrorMessage name="Address" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="orderPickupDate"
              class="w-100 mb-2 text-light-green">Laundry Pickup Date *</label>
              <Field
                id="orderPickupDate"
                name="Pickup Date"
                type="date"
                aria-label="Customer laundry pickup date input"
                class="form-control rounded-0 bg-gray-700 border border-gray-600"
                :class="{ 'is-invalid': errors['Pickup Date'] }"
                rules="required"
                v-model="order.pickupDate"
              ></Field>
              <ErrorMessage name="Pickup Date" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="orderDeliveryDate"
              class="w-100 mb-2 text-light-green">Laundry Delivery Date *</label>
              <Field
                id="orderDeliveryDate"
                name="Delivery Date"
                type="date"
                aria-label="Customer laundry delivery date input"
                class="form-control rounded-0 bg-gray-700 border border-gray-600"
                :class="{ 'is-invalid': errors['Delivery Date'] }"
                rules="required"
                v-model="order.returnDate"
              ></Field>
              <ErrorMessage name="Delivery Date" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="orderMessage" class="w-100 mb-2 text-light-green">Message</label>
              <textarea
                name="Order Message"
                id="orderMessage"
                class="w-100 rounded-0 bg-gray-700 border border-gray-600"
                rows="5"
                aria-label="Order message input"
                required
                v-model="order.message"
              ></textarea>
            </div>
          <div class="text-end">
            <button
              type="submit"
              class="btn btn-primary btn-wide rounded-0 text-uppercase"
              :disabled="isLoading"
            >
              <div
                class="spinner-grow spinner-grow-sm me-2"
                role="status"
                v-if="isLoading"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              Next
            </button>
          </div>
        </Form>
      </div>
      <div class="col-12 col-lg-4 offset-lg-1">
        <div class="card card-order-summary pt-5 bg-gray-800 w-100">
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
                      <div class="order-product-content text-uppercase">
                        {{ item.product.title }}
                      </div>
                      <div class="color-label"></div>
                      <div
                        v-if="item.dryClean"
                        class="order-product-content text-uppercase small"
                      >
                        dry clean service
                      </div>
                      <div
                        v-if="item.wetClean"
                        class="order-product-content text-uppercase small"
                      >
                        wet clean service
                      </div>
                      <div
                        v-if="item.ironing"
                        class="order-product-content text-uppercase small"
                      >
                        ironing service
                      </div>
                      <div class="order-product-content text-uppercase num small mt-3">
                        hkd {{ item.final_total }}
                      </div>
                    </div>
                  </td>
                  <td class="td-order-qty">
                    <div class="order-product-content">x {{ item.qty }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer bg-gray-800 p-3 border-top-0 mt-8">
            <table class="w-100">
              <tbody class="">
                <tr>
                  <td class="text-uppercase text-start">subtotal</td>
                  <td class="text-end num">$ {{ cart.total }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase text-start">discount</td>
                  <td class="text-end num">$ 0</td>
                </tr>
                <tr>
                  <td class="text-uppercase text-start">shipping</td>
                  <td class="text-end num">$ 0</td>
                </tr>
                <tr>
                  <td class="text-uppercase text-start">total</td>
                  <td class="text-end num">$ {{ cart.final_total }}</td>
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
