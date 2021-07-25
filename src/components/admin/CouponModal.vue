<template>
  <div
    class="modal fade"
    ref="CouponModal"
    tabindex="-1"
    aria-labelledby="CouponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-form modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-body">
        <div class="modal-header form-modal-header">
          <h1 v-if="modalType === 'addCoupon'" class="h3">
            Add Coupon
          </h1>
          <h1 v-else class="h3">
            Edit Coupon
          </h1>
          <button
            type="button"
            class="btn p-0"
            aria-label="Close"
            :disabled="isLoading"
            @click="closeModal"
          >
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-body product-modal-body">
          <Form id="couponForm" v-slot="{ errors }" @submit="updateCoupon(couponTemp.id)">
            <div class="modal-title-hk text-end">
              *Compulsory fields
            </div>
            <div class="input-group mb-3">
              <label for="couponTitle" class="modal-title-hk product-modal-title mb-2"
                >Coupon Title*</label
              >
              <Field
                id="couponTitle"
                type="text"
                name="Coupon Title"
                class="form-control w-100"
                aria-label="Coupon Title input"
                aria-describedby="couponTitleLabel"
                :class="{ 'is-invalid': errors['Coupon Title'] }"
                rules="required"
                v-model="couponTemp.title"
              ></Field>
              <ErrorMessage name="Coupon Title" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="couponCode" class="modal-title-hk product-modal-title mb-2"
                >Coupon Code*</label
              >
              <Field
                id="couponCode"
                type="text"
                name="Coupon Code"
                class="form-control w-100"
                aria-label="Coupon Code input"
                aria-describedby="couponCodeLabel"
                :class="{ 'is-invalid': errors['Coupon Code'] }"
                rules="required"
                v-model="couponTemp.code"
              ></Field>
              <ErrorMessage name="Coupon Code" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="discountPercent" class="modal-title-hk product-modal-title mb-2"
                >Discount Percent*</label
              >
              <Field
                id="discountPercent"
                type="number"
                min="0"
                name="Discount Percent"
                class="form-control w-100"
                aria-label="Discount Percent input"
                aria-describedby="discountPercentLabel"
                :class="{ 'is-invalid': errors['Discount Percent'] }"
                rules="required"
                v-model.number="couponTemp.percent"
              ></Field>
              <ErrorMessage name="Discount Percent" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="dueDate" class="modal-title-hk product-modal-title mb-2">Due Date*</label>
              <Field
                id="dueDate"
                type="date"
                name="Due Date"
                class="form-control w-100"
                aria-label="Due Date input"
                aria-describedby="dueDateLabel"
                :class="{ 'is-invalid': errors['Due Date'] }"
                rules="required"
                v-model="tempDate"
                :value="dateNow"
                :min="dateNow"
              ></Field>
              <ErrorMessage name="Due Date" class="invalid-feedback"></ErrorMessage>
            </div>
            <label for="couponIsEnabled" class="modal-title-hk product-modal-title mb-2 text-start"
              >Enable Coupon</label
            >
            <div class="input-group form-check form-switch d-flex align-items-center mb-3">
              <input
                id="couponIsEnabled"
                type="checkbox"
                class="form-check-input"
                aria-label="Coupon Status"
                aria-describedby="CouponStatusLabel"
                v-model="couponTemp.is_enabled"
              />
              <label class="form-check-label modal-title-hk ml-2" for="couponIsEnabled">
                {{ couponTemp.is_enabled ? 'Enabled' : 'Disabled' }}
              </label>
            </div>
            <div class="modal-footer product-modal-footer">
              <button
                type="button"
                class="btn btn-secondary text-gray-400 rounded-0 btn-md"
                @click="closeModal"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary rounded-0 btn-md" :disabled="isLoading">
                <div class="spinner-grow spinner-grow-sm me-2" role="status" v-if="isLoading">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <span v-if="modalType === 'addCoupon'">
                  Add Coupon
                </span>
                <span v-else>
                  Update Coupon
                </span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['temp', 'date', 'modalType'],
  data() {
    return {
      modal: '',
      couponTemp: {},
      dateNow: '',
      tempDate: 0,
      isLoading: false,
    };
  },
  watch: {
    temp() {
      this.couponTemp = JSON.parse(JSON.stringify(this.temp));
      if (this.modalType === 'editCoupon') {
        this.couponTemp.is_enabled = this.couponTemp.is_enabled === 1;
        this.tempDate = this.changeDateFormat();
      } else {
        this.couponTemp.due_date = parseInt(
          (new Date(`${this.couponTemp.due_date}`).getTime() / 1000).toFixed(0),
          10,
        );
      }
    },
    tempDate() {
      console.log(this.couponTemp.due_date);
      this.couponTemp.due_date = parseInt(
        (new Date(`${this.tempDate}`).getTime() / 1000).toFixed(0),
        10,
      );
      console.log(this.couponTemp.due_date);
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    changeDateFormat() {
      // change date format from "6/30/2021" to "2021-06-23"
      let newDateFormat = new Date(`${this.date}`);
      const offset = newDateFormat.getTimezoneOffset();
      newDateFormat = new Date(newDateFormat.getTime() - offset * 60 * 1000);
      newDateFormat = newDateFormat.toISOString(); // return 2021-06-30T00:00:00.000Z
      newDateFormat = newDateFormat.split('T');
      const [date] = newDateFormat;
      newDateFormat = date;
      return date;
    },
    updateCoupon(id) {
      // 新增優惠卷或修改優惠卷
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      if (this.modalType === 'editCoupon') {
        url = `${url}/${id}`;
        httpMethod = 'put';
      }
      this.couponTemp.is_enabled = this.couponTemp.is_enabled ? 1 : 0;
      this.isLoading = true;
      this.$http[httpMethod](url, { data: this.couponTemp })
        .then((res) => {
          if (res.data.success) {
            this.closeModal();
            this.$emit('success-alert');
            this.isLoading = false;
          } else {
            alert(res.data.message);
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.CouponModal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
};
</script>
