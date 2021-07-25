<template>
  <ProductSideBar
    :product="product"
  >
  </ProductSideBar>
  <!-- Hero session -->
  <div class="page-center-wrapper">
    <!-- product title -->
    <div class="d-flex flex-column justify-content-between position-absolute top-0">
      <div class="service-pill pt-5">
        <div class="pill-msg rounded-pill py-3 px-4">
          <span class="h2 en text-uppercase">The service for</span>
        </div>
        <div class="pill-msg rounded-pill py-3 px-4 mt-2">
          <span class="h2 en text-uppercase">{{ product.colorType }} {{ product.title }}</span>
        </div>
      </div>
    </div>
    <!-- hero image -->
    <img :src="product.imageUrl" alt="" class="w-100 h-100 img-object-fit" />
    <!-- add to bag label -->
    <div v-show="!reachedServices" class="position-fixed card-left-side">
      <div class="card-product bg-gray-800 mb-5 ">
        <form action="" novalidate v-on:submit.prevent>
          <div class="card-product-choice-wrapper px-5">
            <div
              v-if="product.wetCleaning"
              class="input-group form-check form-switch
              d-flex align-items-center justify-content-between p-0 mb-3"
            >
              <label class="form-check-label text-uppercase" for="wetCleanIsEnable"
                >Machine Wash</label
              >
              <input
                type="checkbox"
                id="wetCleanIsEnable"
                class="form-check-input rounded-pill"
                aria-label="Enable or disable wet clean service"
                aria-describedby="wetCleanIsEnableLabel"
                v-model="tempOrder.wetClean"
                :disabled="tempOrder.dryClean"
              />
            </div>
            <div
              v-if="product.dryCleaning"
              class="input-group form-check form-switch
              d-flex align-items-center justify-content-between p-0 mb-3"
            >
              <label class="form-check-label text-uppercase" for="dryCleanIsEnable"
                >Dry clean</label
              >
              <input
                type="checkbox"
                id="dryCleanIsEnable"
                class="form-check-input rounded-pill"
                aria-label="Enable or disable dry clean service"
                aria-describedby="dryCleanIsEnableLabel"
                v-model="tempOrder.dryClean"
                :disabled="tempOrder.wetClean"
              />
            </div>
            <div
              v-if="product.ironing"
              class="input-group form-check form-switch
              d-flex align-items-center justify-content-between p-0 mb-3"
            >
              <label class="form-check-label text-uppercase" for="ironIsEnable"
                >ironing</label
              >
              <input
                type="checkbox"
                id="ironIsEnable"
                class="form-check-input rounded-pill"
                aria-label="Enable or disable ironing service"
                aria-describedby="ironIsEnableLabel"
                v-model="tempOrder.ironing"
              />
            </div>
            <div class="input-group inline-group justify-content-between mb-3">
              <label for="productQty" class="text-uppercase">qty</label>
              <div class="quantity d-flex align-items-center">
                <button class="btn p-0 d-flex align-items-center" @click="changeQty('minus')">
                  <i class="material-icons">remove</i>
                </button>
                <input
                  id="productQty"
                  class="form-control text-center"
                  name="quantity"
                  type="number"
                  min="1"
                  v-model.number="tempOrder.qty"
                />
                <button class="btn p-0 d-flex align-items-center" @click="changeQty('add')">
                  <i class="material-icons">add</i>
                </button>
              </div>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <div class="text-uppercase">Total price</div>
              <div class="text-uppercase">hkd {{ tempTotal }}</div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary rounded-0 text-uppercase w-100 mt-6"
            @click="addCart"
            :disabled="loadingStatus.loadingItem === tempOrder.product_id"
          >
            <div
              class="spinner-grow spinner-grow-sm me-2"
              role="status"
              v-if="loadingStatus.loadingItem === tempOrder.product_id"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            add to bag
          </button>
          <div class="w-100 px-5 mt-3">
            <ShoppingBagStatus
              :cart="cart"
            >
            </ShoppingBagStatus>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- End of Hero session -->
  <CleaningQuote></CleaningQuote>
  <!-- Product images session -->
  <div class="row g-0 mb-6" id="main-product-images">
    <div
      v-for="url in product.imagesUrl"
      class="col-12 col-md-6 col-lg-6 detail-img-wrapper"
      :key="url"
    >
      <img :src="url" alt="" class="w-100 h-100" />
    </div>
  </div>
  <!-- End of Product images session -->

  <!-- other items session -->
  <div class="bg-dark" ref="moreServices">
    <div class="container-fluid py-2">
      <span class="h3 text-uppercase">more services</span>
    </div>
  </div>
  <div
    class="row g-0 py-2 border border-secondary bg-light"
    v-for="product in similarProducts"
    :key="product.id"
  >
    <div class="col-12">
      <div class="container-fluid">
        <div class="d-flex align-items-center justify-content-between">
          <span class="similar-products text-uppercase">{{ product.title }}</span>
          <a
            href="#"
            class="btn btn-dark text-gray-400 btn-other-product rounded-0"
            @click.prevent="getSimilar(product.id)"
          >
            <i class="material-icons-outlined">preview</i>
            <span class="text-uppercase">view service</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  <Footer
  >
  </Footer>
</template>

<script>
import emitter from '@/components/tools/emitter';
import ShoppingBagStatus from '@/components/customer/ShoppingBagStatus.vue';
import ProductSideBar from '@/components/customer/ProductSideBar.vue';
import CleaningQuote from '@/components/customer/CleaningQuote.vue';
import Footer from '@/components/customer/Footer.vue';

export default {
  data() {
    return {
      navClassList: {
        navbarTop: 'bg-white',
      },
      product: {},
      otherHover: false,
      tempOrder: {},
      tempTotal: 0,
      similarProducts: [],
      loadingStatus: {
        loadingItem: '',
      },
      isLoading: false,
      routeId: '',
      cart: '',
      windowHeight: 0,
      footer: 0,
      reachedServices: false,
    };
  },
  components: {
    ShoppingBagStatus,
    ProductSideBar,
    CleaningQuote,
    Footer,
  },
  watch: {
    tempOrder: {
      handler() {
        this.tempTotal = this.tempOrder.qty * this.product.price;
        this.tempOrder.qty = Math.ceil(this.tempOrder.qty); // 避免用戶輸入點數
      },
      deep: true,
    },
    $route() {
      // react to route changes...
      if (this.$route.name === 'Product') {
        this.getProduct();
      }
    },
  },
  methods: {
    getProduct() {
      const loader = this.$loading.show();
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            // 取得頁面產品
            this.product = res.data.products.find((product) => product.id === id);
            // 取得相關類別產品
            // eslint-disable-next-line max-len
            this.similarProducts = res.data.products.filter(
              (item) => item.category === this.product.category
                && item.id !== this.product.id
                && item.is_enabled === '1',
            );
            this.tempOrder = {
              qty: 1,
              product_id: id,
            };
            this.tempTotal = this.product.price;
          }
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeQty(way) {
      switch (way) {
        case 'add':
          this.tempOrder.qty += 1;
          break;
        case 'minus':
          if (this.tempOrder.qty > 1) {
            this.tempOrder.qty -= 1;
          }
          break;
        default:
          console.log('cannot change the qty');
      }
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data.carts.length;
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart() {
      this.loadingStatus.loadingItem = this.$route.params.id;
      if (this.tempOrder.qty > 0) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
        this.$http
          .post(url, { data: this.tempOrder })
          .then((res) => {
            console.log(res);
            this.loadingStatus.loadingItem = '';
            this.getCart();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert('Minimum product quantity is 1'); // 避免用戶輸入 0
      }
    },
    getSimilar(id) {
      this.routeId = id;
      this.$router.push(`/product/${id}`);
    },
    scrollHandler() {
      const windowY = window.scrollY;
      const service = this.$refs.moreServices;
      // 改變 Navbar 樣式
      const main = document.getElementById('main-product-images');
      if (windowY >= main.offsetTop) {
        this.navClassList.navbarTop = 'bg-dark';
        emitter.emit('updateNav', this.navClassList);
      } else {
        this.navClassList.navbarTop = '';
        emitter.emit('updateNav', this.navClassList);
      }
      // scroll 到 More Service 時 hide 掉 Add to bag card
      if (windowY >= service.offsetTop - this.windowHeight) {
        this.reachedServices = true;
      } else {
        this.reachedServices = false;
      }
    },
  },
  mounted() {
    console.clear();
    this.getProduct();
    this.getCart();
    this.windowHeight = window.innerHeight;
    document.addEventListener('scroll', this.scrollHandler);
  },
  unmounted() {
    document.removeEventListener('scroll', this.scrollHandler);
  },
};
</script>
