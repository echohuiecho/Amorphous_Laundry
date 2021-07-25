<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-content-center mb-3">
      <h1 class="h3 text-uppercase m-0">
        All Coupons
      </h1>
      <button
        type="button"
        class="btn btn-secondary rounded-0
      d-flex align-items-center text-gray-400 text-uppercase"
        @click="openModal('addCoupon')"
      >
        <i class="material-icons">add</i>
        <span> Create Coupon </span>
      </button>
    </div>
    <div class="card product-card border border-gray-600 rounded-0">
      <div class="card-body bg-gray-700">
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th class="table-title-hk text-start" width="150">Coupon Title</th>
              <th class="table-title-hk text-start">Coupon Code</th>
              <th class="table-title-hk text-start">Discount</th>
              <th class="table-title-hk text-start">Due Date</th>
              <th class="table-title-hk text-end" width="80">Enabled</th>
              <th class="table-title-hk text-end" width="80">Edit</th>
              <th class="table-title-hk text-end" width="80">Delete</th>
            </tr>
          </thead>
          <tbody id="productList">
            <tr v-for="(coupon, index) in coupons" :key="coupon.id">
              <td class="text-start">{{ coupon.title }}</td>
              <td class="text-start">{{ coupon.code }}</td>
              <td class="text-start">{{ coupon.percent }}% OFF</td>
              <td class="text-start">{{ convertedDate[index] }}</td>
              <td class="text-start">{{ coupon.is_enabled ? 'Enabled' : 'Disabled' }}</td>
              <td class="text-end">
                <button
                  type="button"
                  id="editCoupon"
                  class="btn btn-light btn-outline-primary"
                  :data-id="coupon.id"
                  @click="openModal('editCoupon', index)"
                >
                  <i class="material-icons">edit</i>
                </button>
              </td>
              <td class="text-end">
                <button
                  type="button"
                  id="removeCoupon"
                  class="btn btn-light btn-outline-primary"
                  data-action="remove"
                  :data-id="coupon.id"
                  @click="openModal('deleteCoupon', index)"
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
  <Pagination :page="paginationData" @get-data="getCoupons"> </Pagination>
  <CouponModal
    ref="CouponModal"
    :temp="temp"
    :date="tempDate"
    :modal-type="modalType"
    @success-alert="successAlert"
  >
  </CouponModal>
  <DeleteModal ref="DeleteOrderModal" :temp="temp" :modal-type="modalType" @get-data="getCoupons">
  </DeleteModal>
</template>

<script>
import Pagination from '@/components/admin/Pagination.vue';
import CouponModal from '@/components/admin/CouponModal.vue';
import DeleteModal from '@/components/admin/DeleteModal.vue';

export default {
  data() {
    return {
      coupons: [],
      convertedDate: [],
      paginationData: '',
      temp: {},
      tempDate: {},
      dateNow: '',
      modalType: '',
    };
  },
  components: {
    Pagination,
    CouponModal,
    DeleteModal,
  },
  watch: {
    coupons() {
      // 轉換訂單建立時間格式
      // eslint-disable-next-line max-len
      this.convertedDate = this.coupons.map((item) => new Date(item.due_date * 1000).toLocaleDateString());
    },
  },
  methods: {
    getCoupons(page = 1) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      // 取得後台產品列表
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.coupons = res.data.coupons;
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
      if (this.coupons.length > 0) {
        this.tempDate = this.convertedDate[index];
      }
      if (modalStatus === 'addCoupon') {
        this.getToday();
        // 新增優惠卷
        this.temp = {
          title: '',
          is_enabled: 0,
          percent: 1,
          // due_date: 0,
          due_date: this.dateNow,
          code: '',
        };
      } else {
        // 編輯優惠卷
        this.temp = { ...this.coupons[index] };
        this.tempDate = this.convertedDate[index];
      }
      this.modalType = modalStatus;
      switch (modalStatus) {
        case 'addCoupon':
          this.$refs.CouponModal.openModal();
          break;
        case 'editCoupon':
          this.$refs.CouponModal.openModal();
          break;
        case 'deleteCoupon':
          this.$refs.DeleteOrderModal.openModal();
          break;
        default:
          console.log('Cannot match the modal type');
      }
    },
    getToday() {
      const today = new Date();
      this.dateNow = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    },
    successAlert() {
      this.$swal({
        position: 'top-end',
        icon: 'success',
        iconColor: '#000000',
        title: 'Your coupon has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      this.getCoupons();
    },
  },
  mounted() {
    console.clear();
    this.getCoupons();
  },
};
</script>
