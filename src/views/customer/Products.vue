<template>
  <div class="position-fixed nav-sidebar d-flex flex-column align-items-end">
    <MenuNav></MenuNav>
  </div>
  <div class="position-fixed card-left-side">
    <FilterProductsCard
      v-show="!reachedBottom"
      :categories="categories"
      @get-products="getProducts"
      @update-category="getFilteredProducts"
    >
    </FilterProductsCard>
  </div>
  <div class="main-content-wrapper position-relative w-100">
    <!-- hero session -->
    <div class="d-flex flex-column justify-content-between position-absolute top-0">
      <div class="service-pill pt-5">
        <div class="pill-msg rounded-pill py-3 px-4">
          <span class="h2 en text-uppercase">The Service to</span>
        </div>
        <div class="pill-msg rounded-pill py-3 px-4 mt-2">
          <span class="h2 en text-uppercase">Not Getting Dirty</span>
        </div>
      </div>
    </div>
    <div class="row w-100 m-0">
      <div class="col-12 col-lg-9 offset-lg-3 g-0">
        <div class="product-hero-wrapper">
          <img
            :src="`${(publicPath)}Services_hero.jpg`"
            alt=""
            class="img-object-fit w-100 h-100"
          />
        </div>
      </div>
    </div>
    <!-- end of hero session -->
    <!-- products session -->
    <div class="row g-0" id="main">
      <template v-for="product in currentProducts" :key="product.id">
        <div class="col-12 col-md-6 col-lg-3 product-wrapper">
          <router-link :to="`/product/${product.id}`">
            <img :src="product.imageUrl" alt="" class="w-100 h-100 product-img" />
            <div class="w-100 h-100 product-overlay
            d-flex justify-content-center align-items-center">
              <div class="overlay-shape"></div>
            </div>
            <span class="m-2 product-img-title text-dark">{{ product.title }}</span>
          </router-link>
        </div>
      </template>
      <div class="col-12 col-md-6 col-lg-3 product-wrapper bg-light">
        <a
          href="#top"
          class="w-100 h-100 stretched-link product-pagination m-2"
          :class="{ 'disabled-link': !paginationData.has_pre }"
          aria-label="Previous page"
          @click.prevent="getProducts(paginationData.current_page - 1)"
        >
          <div class="w-100 h-100 product-overlay d-flex justify-content-center align-items-center">
            <img src="../../assets/icon/arrow-left-circle.svg" alt="" class="circle-pagination" />
          </div>
        </a>
      </div>
      <div class="col-12 col-md-6 col-lg-3 product-wrapper product-wrapper bg-light">
        <a
          href="#top"
          class="w-100 h-100 stretched-link m-2"
          :class="{ 'disabled-link': !paginationData.has_next }"
          aria-label="Next page"
          @click.prevent="getProducts(paginationData.current_page + 1)"
        >
          <div class="w-100 h-100 product-overlay d-flex justify-content-center align-items-center">
            <img src="../../assets/icon/arrow-right-circle.svg" alt="" class="circle-pagination" />
          </div>
        </a>
      </div>
    </div>
    <Pagination :page="paginationData" @get-product="getProducts"></Pagination>
    <!-- end of products session -->
  </div>
  <Footer
  @footer-position="footerPosition"
  >
  </Footer>
</template>

<script>
import emitter from '@/components/tools/emitter';
import MenuNav from '@/components/customer/MenuNav.vue';
import FilterProductsCard from '@/components/customer/FilterProductsCard.vue';
import Pagination from '@/components/customer/Pagination.vue';
import Footer from '@/components/customer/Footer.vue';

export default {
  data() {
    return {
      navClassList: {
        navbarTop: 'bg-white',
      },
      products: [],
      // 當前頁數的產品列表
      currentProducts: [],
      categories: [],
      // 頁數
      paginationData: {},
      loadingStatus: {
        loadingItem: '',
      },
      isLoading: false,
      publicPath: process.env.BASE_URL,
      footer: 0,
      reachedBottom: false,
    };
  },
  components: {
    MenuNav,
    FilterProductsCard,
    Pagination,
    Footer,
  },
  methods: {
    getProducts(page = 1, filter = '') {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            if (!filter) {
              // 取出所有已啟用的產品
              this.products = res.data.products.filter((product) => product.is_enabled === '1');
              // Filter product 的 category
              this.getCategories();
            } else {
              // 取出 Filter 後的產品
              this.products = res.data.products.filter((product) => product.is_enabled === '1' && product.category === filter);
            }
            // 自訂 pagination 變數
            const totalPages = Math.ceil(this.products.length / 10);
            this.paginationData = {
              total_pages: totalPages,
              current_page: page,
              has_pre: page > 1,
              has_next: totalPages > page,
            };
            // 拆分頁面, assign 10組物件到 currentProducts 陣列
            this.currentProducts = this.products.slice((page - 1) * 10, page * 10);
          } else {
            console.log(res.data.message);
          }
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCategories() {
      this.categories = new Set();
      for (let i = 0; i < this.products.length; i += 1) {
        this.categories.add(this.products[i].category);
      }
    },
    getFilteredProducts(cat) {
      this.getProducts(1, cat);
    },
    scrollHandler() {
      const windowY = window.scrollY;
      // 改變 Navbar 樣式
      const main = document.getElementById('main');
      if (windowY >= main.offsetTop) {
        this.navClassList.navbarTop = 'bg-dark';
        emitter.emit('updateNav', this.navClassList);
      } else {
        this.navClassList.navbarTop = '';
        emitter.emit('updateNav', this.navClassList);
      }
      // scroll 到 footer 時 hide 掉 filter card
      if (windowY >= this.footer - 80) {
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
    this.getProducts();
    document.addEventListener('scroll', this.scrollHandler);
  },
  unmounted() {
    document.removeEventListener('scroll', this.scrollHandler);
  },
};
</script>
