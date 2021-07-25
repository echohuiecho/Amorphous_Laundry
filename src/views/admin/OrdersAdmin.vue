<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-content-center mb-3">
      <h1 class="h3 text-uppercase m-0">
        All Orders
      </h1>
    </div>
    <div class="card product-card border border-gray-600 rounded-0">
      <div class="card-body bg-gray-700">
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th class="table-title-hk text-start" width="80">Order No.</th>
              <th class="table-title-hk text-start">id</th>
              <th class="table-title-hk text-start">Date</th>
              <th class="table-title-hk text-start">Payment Status</th>
              <th class="table-title-hk text-end" width="80">Edit</th>
              <th class="table-title-hk text-end" width="80">Delete</th>
            </tr>
          </thead>
          <tbody id="productList">
            <tr v-for="(order, index) in orders" :key="order.id">
              <td class="text-start">{{ order.num }}</td>
              <td class="text-start" width="120">{{ order.id }}</td>
              <td class="text-start" width="120">{{ convertedDate[index] }}</td>
              <td class="text-start" width="120">{{ order.is_paid }}</td>
              <td class="text-end">
                <button
                  type="button"
                  id="editOrder"
                  class="btn btn-light btn-outline-primary"
                  :data-id="order.id"
                  @click="openModal('editOrder', index)"
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
                  :data-id="order.id"
                  @click="openModal('deleteOrder', index)"
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
  @get-data="getOrders">
  </Pagination>
  <OrderModal
  ref="OrderModal"
  :temp="temp"
  :date="tempDate"
  :modal-type="modalType"
  @success-alert="successAlert">
  </OrderModal>
  <DeleteModal
  ref="DeleteOrderModal"
  :temp="temp"
  :modal-type="modalType"
  @get-data="getOrders"
  >
  </DeleteModal>
</template>

<script>
import Pagination from '@/components/admin/Pagination.vue';
import OrderModal from '@/components/admin/OrderModal.vue';
import DeleteModal from '@/components/admin/DeleteModal.vue';

export default {
  data() {
    return {
      orders: [],
      convertedDate: [],
      paginationData: '',
      temp: {},
      tempDate: {},
      modalType: '',
    };
  },
  components: {
    Pagination,
    OrderModal,
    DeleteModal,
  },
  watch: {
    orders() {
      // 轉換訂單建立時間格式
      this.convertedDate = this.orders.map((item) => new Date(item.create_at * 1000).toLocaleString('en-US'));
    },
  },
  methods: {
    getOrders(page = 1) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      // 取得後台產品列表
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
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
    openModal(modalStatus, index = 0) {
      this.temp = JSON.parse(JSON.stringify(this.orders[index]));
      this.tempDate = this.convertedDate[index];
      this.modalType = modalStatus;
      switch (modalStatus) {
        case 'editOrder':
          this.$refs.OrderModal.openModal();
          break;
        case 'deleteOrder':
          this.$refs.DeleteOrderModal.openModal();
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
        title: 'Your order has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      this.getOrders();
    },
  },
  mounted() {
    console.clear();
    this.getOrders();
  },
};
</script>
