<template>
  <div class="row g-0 mt-5">
    <template v-for="product in currentProducts" :key="product.id">
      <div class="col-12 col-md-6 col-lg-3 product-wrapper">
        <router-link :to="`/product/${product.id}`">
          <img :src="product.imageUrl" alt="" class="w-100 h-100 product-img" />
          <div class="w-100 h-100 product-overlay d-flex justify-content-center align-items-center">
            <div class="overlay-shape"></div>
          </div>
          <span class="m-2 product-img-title">{{ product.title }}</span>
        </router-link>
      </div>
    </template>
    <div class="col-12 col-md-6 col-lg-3 product-wrapper">
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
    <div class="col-12 col-md-6 col-lg-3 product-wrapper ">
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
</template>

<script>
import Pagination from '@/components/customer/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      // 當前頁數的產品列表
      currentProducts: [],
      // 頁數
      paginationData: {},
      loadingStatus: {
        loadingItem: '',
      },
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getProducts(page = 1) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            // 取出已啟用的產品
            this.products = res.data.products.filter((product) => product.is_enabled === '1');
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
  },
  created() {
    console.clear();
    this.getProducts();
  },
};
</script>
