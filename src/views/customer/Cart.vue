<template>
  <div class="container-fluid px-5">
    <!-- product label -->
    <div class="card product-label border border-secondary ms-5 mb-3 position-fixed">
      <div class="card-footer border-secondary bg-white p-0">
        <div class="laundry-label-wrapper d-flex justify-content-between p-3">
          <a href="#" class="cart-icon d-flex">
            <img src="../../../public/icon/machine_wash.svg" alt="" />
            <!-- <div class="cart-counter text-center">{{ cart.carts.length }}</div> -->
          </a>
          <img src="../../../public/icon/dry_clean.svg" alt="" class="dry-clean-label" />
          <img src="../../../public/icon/ironing_low.svg" alt="" class="iron-label" />
        </div>
        <a
          href="#"
          class="w-100 btn btn-primary px-4 text-uppercase"
          @click.prevent="backToProducts"
          >back to products</a
        >
      </div>
    </div>

    <!-- 判斷購物車陣列是否有資料 -->
    <template v-if="cart.total !== 0">
      <div class="row py-3">
        <div class="col-12 col-lg-8">
          <!-- 購物車 table -->
          <table class="table cart-table">
            <thead>
              <tr>
                <th class="table-title text-start"></th>
                <th class="table-title text-start">product title</th>
                <th class="table-title text-start">service</th>
                <th class="table-title text-start">qty</th>
                <th class="table-title text-end">total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cart.carts" :key="item.id">
                <td class="td-cart-img">
                  <div class="cartImg-wrapper">
                    <img :src="item.product.imageUrl" alt="" class="w-100 h-100" />
                  </div>
                </td>
                <td>
                  <div class="product-title-wrapper text-start">
                    <div class="cart-product-content">
                      {{ item.product.title }}
                    </div>
                    <div class="color-label"></div>
                  </div>
                </td>
                <td>
                  <div class="service-wrapper text-start">
                    <div v-if="item.dryClean" class="cart-product-content text-uppercase">
                      dry clean service
                    </div>
                    <div v-if="item.wetClean" class="cart-product-content text-uppercase">
                      wet clean service
                    </div>
                    <div v-if="item.ironing" class="cart-product-content text-uppercase">
                      ironing service
                    </div>
                  </div>
                </td>
                <td class="td-cart-qty">
                  <div class="input-group inline-group justify-content-between">
                    <div class="quantity d-flex align-items-center border border-secondary">
                      <button class="btn btn-minus" @click="changeQty('minus', index)">
                        <i class="material-icons">remove</i>
                      </button>
                      {{ item.qty }}
                      <button class="btn btn-plus" @click="changeQty('add', index)">
                        <i class="material-icons">add</i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="td-cart-price text-end">
                  <div class="d-flex flex-column justify-content-between cart-price-btn-wrapper">
                    <div class="cart-product-content">
                      {{ item.final_total }}
                    </div>
                    <button
                      type="button"
                      id="cartRemove"
                      class="btn btn-cart-remove p-0 ms-auto d-flex align-items-center"
                      data-action="remove"
                      :data-id="item.id"
                      @click="deleteCart('single', item.id)"
                    >
                      <i class="material-icons">close</i>
                      <span class="ms-2">remove</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="">
            <button
              class="btn btn-secondary d-flex align-items-center ms-auto"
              @click="deleteCart('all')"
            >
              <i class="material-icons">close</i>
              <span class="ms-2">remove all</span>
            </button>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="card card-cart border border-secondary w-100">
            <div class="card-body">
              <div class="h-100 d-flex flex-row align-items-end">
                <table class="w-100">
                  <tbody class="">
                    <tr>
                      <td class="text-start text-uppercase">
                        <label for="cartCoupon">I have a coupon code</label>
                      </td>
                      <td class="text-end">
                        <input
                          type="text"
                          id="cartCoupon"
                          class="form-control ms-auto"
                          placeholder="e.g. BUYNOW0x"
                          aria-label="check out coupon input"
                          aria-describedby="cartCouponLabel"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start text-uppercase">subtotal</td>
                      <td class="text-end">$ {{ cart.total }}</td>
                    </tr>
                    <tr>
                      <td class="text-start text-uppercase">discount</td>
                      <td class="text-end">$ 0</td>
                    </tr>
                    <tr>
                      <td class="text-start text-uppercase">total</td>
                      <td class="text-end">$ {{ cart.final_total }}</td>
                    </tr>
                    <tr>
                      <td colspan="2" class="text-start text-muted">
                        Shipping will be calculated during checkout
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card-footer p-3 border-top-0 bg-white">
              <button
                type="button"
                class="btn btn-primary text-uppercase w-100"
                @click="goToCheckout"
              >
                check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 購物車沒有項目提示 -->
    <h1 v-else class="cart-empty-text mt-3">
      Your shopping cart is empty.
    </h1>
  </div>
</template>

<script>
import emitter from '@/components/tools/emitter';

export default {
  data() {
    return {
      cart: {},
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
    changeQty(way, index) {
      switch (way) {
        case 'add':
          this.cart.carts[index].qty += 1;
          break;
        case 'minus':
          if (this.cart.carts[index].qty > 1) {
            this.cart.carts[index].qty -= 1;
          }
          break;
        default:
          console.log('cannot update qty');
      }
      this.updateCart(this.cart.carts[index]);
    },
    updateCart(obj) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${obj.id}`;
      this.$http
        .put(url, { data: obj })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.getCart();
          } else {
            alert(res.data.message);
          }
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCart(str, id) {
      const loader = this.$loading.show();
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}`;
      if (str === 'single') {
        url = `${url}/cart/${id}`;
      } else {
        url = `${url}/carts`;
      }
      this.$http
        .delete(url)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.getCart();
          } else {
            alert(res.data.message);
          }
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    backToProducts() {
      this.$router.push({ name: 'Products' });
    },
    goToCheckout() {
      // emit 購物車資料傳到 CheckOut.vue
      emitter.emit('sendCart', this.cart);
      this.$router.push({ name: 'CheckOut' });
    },
  },
  created() {
    console.clear();
    this.getCart();
  },
};
</script>
