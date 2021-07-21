<template>
  <div class="container mt-5">
    <!-- 全部產品Table -->
    <button type="button" class="btn btn-light btn-outline-primary mb-3"
    @click="openModal('addProduct')">
      <i class="material-icons">add</i>
      <span> 加入產品 </span>
    </button>
    <div class="card product-card border border-primary">
      <div class="card-body product-header">
        <h1 class="title-en text-uppercase text-center">
          All products
        </h1>
        <h1 class="title-hk text-center mb-0">
          產品列表
        </h1>
      </div>
      <div class="card-body bg-light">
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th class="table-title-hk text-start" >Product Title</th>
              <th class="table-title-hk text-start" width="120">Category</th>
              <th class="table-title-hk text-start" width="120">Cost</th>
              <th class="table-title-hk text-start" width="120">Selling Price</th>
              <th class="table-title-hk text-start" width="150">Enable</th>
              <th class="table-title-hk text-end" width="80">Edit</th>
              <th class="table-title-hk text-end" width="80">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
            v-for="(product) in products"
            :key="product.id">
            <td class="text-start">{{ product.title }}</td>
            <td class="text-start" width="120">{{ product.category }}</td>
            <td class="text-start" width="120">{{ product.origin_price }}</td>
            <td class="text-start" width="120">{{ product.price }}</td>
            <td class="text-start">
              {{ product.is_enabled === '1' ? '啟用' : '未啟用' }}
            </td>
            <td class="text-end">
              <button
                type="button"
                id="editProduct"
                class="btn btn-light btn-outline-primary"
                :data-id="product.id"
                @click="openModal('editProduct', product)"
              >
                <i class="material-icons">edit</i>
              </button>
            </td>
            <td class="text-end">
              <button
                type="button"
                id="removeProduct"
                class="btn btn-light btn-outline-primary"
                data-action="remove"
                :data-id="product.id"
                @click="openModal('deleteProduct', product)"
              >
                <i class="material-icons">close</i>
              </button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Pagination
  :page="paginationData"
  @get-data="getProducts">
  </Pagination>
  <ProductModal
  ref="ProductModal"
  :temp="temp"
  :modal-type="modalType"
  @success-alert="successAlert">
  </ProductModal>
  <DeleteModal
  ref="DeleteModal"
  :temp="temp"
  :modal-type="modalType"
  @get-data="getProducts"
  >
  </DeleteModal>
</template>

<script>
import Pagination from '@/components/admin/Pagination.vue';
import ProductModal from '@/components/admin/ProductModal.vue';
import DeleteModal from '@/components/admin/DeleteModal.vue';

export default {
  data() {
    return {
      products: [],
      paginationData: '',
      temp: {
        imagesUrl: [],
      },
      modalType: '',
    };
  },
  components: {
    Pagination,
    DeleteModal,
    ProductModal,
  },
  methods: {
    getProducts(page = 1) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      // 取得後台產品列表
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.paginationData = res.data.pagination;
          } else {
            alert(res.data.message);
          }
          loader.hide();
        })
        .catch((err) => {
          console.log(err);
          loader.hide();
        });
    },
    openModal(modalStatus, item) {
      if (modalStatus === 'addProduct') {
        // 新增產品
        this.temp = {
          title: '',
          category: '',
          productType: '',
          colorType: '',
          unit: '',
          origin_price: 0,
          price: 0,
        };
      } else {
        // 編輯產品
        this.temp = { ...item };
      }
      this.modalType = modalStatus;
      switch (modalStatus) {
        case 'addProduct':
          this.$refs.ProductModal.openModal();
          break;
        case 'editProduct':
          this.$refs.ProductModal.openModal();
          break;
        case 'deleteProduct':
          this.$refs.DeleteModal.openModal();
          break;
        default:
          console.log('Cannot match the modal type');
      }
    },
    successAlert() {
      this.$swal({
        position: 'top-end',
        icon: 'success',
        iconColor: '#000000',
        title: 'Your product has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      this.getProducts();
    },
  },
  mounted() {
    console.clear();
    this.getProducts();
  },
};
</script>
