<template>
  <div>
    <div class="container-fluid product-hero-wrapper px-5">
      <!-- hero image -->
      <img :src="product.imageUrl" alt="" class="w-100 h-100 product-hero-img" />
      <!-- product label -->
      <div class="card product-label border border-secondary ms-5 mb-3">
        <div class="card-body">
          <p v-if="product.dryCleaning" class="card-text text-uppercase me-6">
            dry cleaning service
          </p>
          <p v-if="product.wetCleaning" class="card-text text-uppercase me-6">
            wet cleaning service
          </p>
          <p v-if="product.ironing" class="card-text text-uppercase me-6">ironing service</p>
        </div>
        <div class="card-footer border-secondary bg-white p-0">
          <div class="laundry-label-wrapper d-flex justify-content-between p-3">
            <a href="#" class="cart-icon d-flex">
              <img src="../../../public/icon/machine_wash.svg" alt="" />
              <!-- <div class="cart-counter text-center">{{ cart.carts.length }}</div> -->
            </a>
            <img
              v-if="product.dryCleaning"
              src="../../../public/icon/dry_clean.svg"
              alt=""
              class="dry-clean-label"
            />
            <img v-if="product.ironing" src="../../../public/icon/ironing_low.svg"
            alt="" class="iron-label" />
          </div>
          <a href="#" class="w-100 btn btn-primary px-4 text-uppercase"
          @click.prevent="backToProducts">back to products</a
          >
        </div>
      </div>
      <div class="row product-details-wrapper py-3">
        <div class="col-12 col-lg-8"></div>
        <div class="col-12 col-lg-4">
          <div class="card border border-secondary w-100 h-100">
            <div class="card-body text-start">
              <h1 class="card-title text-uppercase mt-4">{{ product.title }}</h1>
              <template v-if="text === 'description'">
                <div class="row mt-4">
                  <div class="col-lg-8">
                    <p class="card-text">{{ product.description }}</p>
                    <p class="card-text">{{ product.content }}</p>
                  </div>
                </div>
              </template>
            </div>
            <div class="card-footer p-3 border-top-0 bg-white">
              <form action="" novalidate v-on:submit.prevent>
                <template v-if="text === 'cart'">
                  <div
                    v-if="product.dryCleaning"
                    class="input-group form-check form-switch
                    d-flex align-items-center justify-content-between p-0 mb-3"
                  >
                    <label class="form-check-label text-uppercase" for="dryCleanIsEnable"
                      >dry clean service</label
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
                    v-if="product.wetCleaning"
                    class="input-group form-check form-switch
                    d-flex align-items-center justify-content-between p-0 mb-3"
                  >
                    <label class="form-check-label text-uppercase" for="wetCleanIsEnable"
                      >wet clean service</label
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
                    v-if="product.ironing"
                    class="input-group form-check form-switch
                    d-flex align-items-center justify-content-between p-0 mb-3"
                  >
                    <label class="form-check-label text-uppercase" for="ironIsEnable"
                      >ironing service</label
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
                    <div class="quantity d-flex align-items-center border border-secondary">
                      <button class="btn btn-minus" @click="changeQty('minus')">
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
                      <button class="btn btn-plus" @click="changeQty('add')">
                        <i class="material-icons">add</i>
                      </button>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <div class="text-uppercase">price</div>
                    <div class="text-uppercase">{{ tempTotal }}</div>
                  </div>
                </template>
                <div class="d-flex justify-content-between">
                  <a
                    href="#"
                    class="card-link text-uppercase p-1"
                    @click.prevent="text = 'description'"
                    :class="text === 'description' ? 'active-link' : ''"
                    >Description</a
                  >
                  <a
                    v-if="text === 'description'"
                    href="#"
                    class="card-link text-uppercase p-1"
                    @click.prevent="text = 'cart'"
                    >I have {{ product.title }}(S) to clean</a
                  >
                  <button
                    v-else
                    type="button"
                    class="btn btn-primary text-uppercase"
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-0 mb-6">
      <div
        v-for="url in product.imagesUrl"
        class="col-12 col-md-6 col-lg-6 detail-img-wrapper"
        :key="url"
      >
        <img :src="url" alt="" class="w-100 h-100" />
      </div>
    </div>

    <!-- other items session -->
    <div
      class="row g-0 px-5 py-2 border border-secondary bg-white"
      v-for="(product) in similarProducts"
      :key="product.id"
    >
      <div class="col-12">
        <div class="d-flex align-items-center justify-content-between">
          <span class="similar-products text-uppercase">{{ product.title }}</span>
          <a href="#"
          class="btn btn-primary btn-other-product"
          @click.prevent="getSimilar(product.id)">
            <i class="material-icons-outlined">pageview</i>
            <span class="text-uppercase">view service</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      text: 'description',
      otherHover: false,
      tempOrder: {},
      tempTotal: 0,
      similarProducts: [],
      loadingStatus: {
        loadingItem: '',
      },
      isLoading: false,
      routeId: '',
    };
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
      this.getProduct();
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
          console.log(res);
          if (res.data.success) {
            // 取得頁面產品
            this.product = res.data.products.find((product) => product.id === id);
            // 取得相關類別產品
            // eslint-disable-next-line max-len
            this.similarProducts = res.data.products.filter((item) => item.category === this.product.category && item.id !== this.product.id && item.is_enabled === '1');
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
    addCart() {
      this.loadingStatus.loadingItem = this.$route.params.id;
      if (this.tempOrder.qty > 0) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
        this.$http
          .post(url, { data: this.tempOrder })
          .then((res) => {
            console.log(res);
            this.loadingStatus.loadingItem = '';
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
    backToProducts() {
      this.text = 'description';
      this.$router.push({ name: 'Products' });
    },
  },
  created() {
    console.clear();
    this.getProduct();
  },
};
</script>
