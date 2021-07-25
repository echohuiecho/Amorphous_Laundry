<template>
  <CartSideBar
  :cart="cart"
  @apply-coupon="applyCoupon"
  @checkout="goToCheckout"
  >
  </CartSideBar>
  <div class="main-content-wrapper container-fluid px-5">
    <!-- product label -->
    <div v-show="!reachedBottom" class="position-fixed card-left-side">
      <div class="card-cart-icon product-label ms-5 mb-3 bg-gray-800 mb-5">
        <ShoppingBagStatus
          :cart="cartNum"
        >
        </ShoppingBagStatus>
      </div>
    </div>

    <!-- 購物車內容 -->
    <!-- 判斷購物車陣列是否有資料 -->
    <template v-if="cart.total !== 0">
      <div class="row py-3">
        <div class="col-12 col-lg-7">
          <!-- 購物車 table -->
          <table class="table cart-table text-uppercase">
            <thead>
              <tr>
                <th class="table-title text-start"></th>
                <th class="table-title text-start">title</th>
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
                  <div class="product-title-wrapper">
                    <div class="cart-product-content">
                      {{ item.product.title }}
                    </div>
                    <div class="color-label"></div>
                  </div>
                </td>
                <td>
                  <div class="service-wrapper">
                    <div v-if="item.dryClean" class="cart-product-content text-uppercase">
                      dry clean
                    </div>
                    <div v-if="item.wetClean" class="cart-product-content text-uppercase">
                      wet clean
                    </div>
                    <div v-if="item.ironing" class="cart-product-content text-uppercase">
                      ironing
                    </div>
                  </div>
                </td>
                <td class="td-cart-qty">
                  <div class="input-group inline-group ">
                    <div
                      class="quantity d-flex align-items-center justify-content-between rounded-0"
                    >
                      <button
                      class="btn p-0 d-flex align-items-center" @click="changeQty('minus', index)">
                        <i class="material-icons">remove</i>
                      </button>
                      {{ item.qty }}
                      <button
                      class="btn p-0 d-flex align-items-center" @click="changeQty('add', index)">
                        <i class="material-icons">add</i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="td-cart-price text-end">
                  <div class="d-flex flex-column justify-content-between cart-price-btn-wrapper">
                    <div class="num">
                      {{ item.final_total }}
                    </div>
                    <!-- <div class="input-group flex-column align-items-end mb-3">
                      <input
                        id="cartCoupon"
                        type="text"
                        name="cartCoupon"
                        class="form-control rounded-0 bg-gray-700 border w-100 border-gray-600"
                        placeholder="e.g. BUYNOW0x"
                        aria-label="check out coupon input"
                        aria-describedby="cartCouponLabel"
                        v-model="coupon"
                      />
                      <button
                        class="btn btn-secondary text-uppercase text-gray-400 rounded-0 mt-3"
                        @click="applyCoupon"
                      >
                        Apply Coupon
                      </button>
                    </div> -->
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
              class="btn btn-secondary rounded-0 text-uppercase text-gray-400
              d-flex align-items-center ms-auto"
              @click="deleteCart('all')"
            >
              <i class="material-icons">close</i>
              <span class="ms-2">remove all</span>
            </button>
          </div>
        </div>
      </div>
    </template>
    <!-- 購物車沒有項目提示 -->
    <h1 v-else class="cart-empty-text mt-3">
      Your shopping cart is empty.
    </h1>
  </div>
  <div class="position-absolute bottom-0 w-100">
    <Footer
    @footer-position="footerPosition"
    >
    </Footer>
  </div>
</template>

<script>
import emitter from '@/components/tools/emitter';
import CartSideBar from '@/components/customer/CartSideBar.vue';
import ShoppingBagStatus from '@/components/customer/ShoppingBagStatus.vue';
import Footer from '@/components/customer/Footer.vue';

export default {
  data() {
    return {
      navClassList: {
        navbarTop: 'bg-white',
      },
      windowHeight: 0,
      coupon: '',
      cart: {},
      cartNum: 0,
      footer: 0,
      reachedBottom: false,
    };
  },
  components: {
    CartSideBar,
    ShoppingBagStatus,
    Footer,
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
            this.cartNum = this.cart.carts.length;
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
    applyCoupon(str) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.$http
        .post(url, { data: { code: str } })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            console.log(res.data.data.final_total);
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
    scrollHandler() {
      const windowY = window.scrollY;
      // 改變 Navbar 樣式
      if (windowY >= 80) {
        this.navClassList.navbarTop = 'bg-dark';
        emitter.emit('updateNav', this.navClassList);
      } else {
        this.navClassList.navbarTop = '';
        emitter.emit('updateNav', this.navClassList);
      }
      // scroll 到 footer 時 hide 掉 card
      if (windowY >= this.footer) {
        this.reachedBottom = true;
      } else {
        this.reachedBottom = false;
      }
    },
    footerPosition(pos) {
      this.footer = pos;
    },
  },
  mounted() {
    console.clear();
    this.getCart();
    this.windowHeight = window.innerHeight;
    document.addEventListener('scroll', this.scrollHandler);
  },
  unmounted() {
    document.removeEventListener('scroll', this.scrollHandler);
  },
};
</script>
