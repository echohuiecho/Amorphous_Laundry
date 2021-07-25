<template>
  <div
    class="modal fade"
    ref="OrderModal"
    tabindex="-1"
    aria-labelledby="OrderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-form modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content backend-modal-content bg-body">
        <div class="modal-header form-modal-header">
          <h2 class="h3">
            Edit Order
          </h2>
          <button
            type="button"
            class="btn p-0"
            aria-label="Close"
            @click="closeModal"
          >
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-body product-modal-body">
          <Form id="productForm" v-slot="{ errors }" @submit="updateOrder(orderTemp.id)">
            <div class="modal-title-hk text-start">
              Order Summary
            </div>
            <div class="modal-title-hk text-start">
              Order No.{{ orderTemp.num }}
            </div>
            <div class="modal-title-hk text-start">
              Order Date {{ date }}
            </div>
            <div class="modal-title-hk text-start mb-5">
              Order id {{ orderTemp.id }}
            </div>
            <div class="modal-title-hk text-end">
              *Compulsory fields
            </div>
            <div class="input-group mb-3">
              <label for="customerName" class="modal-title-hk product-modal-title mb-2"
                >Customer Name*</label
              >
              <Field
                id="customerName"
                type="text"
                name="Customer Name"
                class="form-control w-100"
                aria-label="Customer Name input"
                aria-describedby="customerNameLabel"
                :class="{ 'is-invalid': errors['Customer Name'] }"
                rules="required"
                v-model="orderUser.name"
              ></Field>
              <ErrorMessage name="Customer Name" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="customerEmail" class="modal-title-hk product-modal-title mb-2"
                >Customer Email*</label
              >
              <Field
                id="customeEmail"
                type="text"
                name="Customer Email"
                class="form-control w-100"
                aria-label="Customer Email input"
                aria-describedby="customerEmailLabel"
                :class="{ 'is-invalid': errors['Customer Email'] }"
                rules="email|required"
                v-model="orderUser.email"
              ></Field>
              <ErrorMessage name="Customer Email" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="customerPhone" class="w-100 mb-2">Phone*</label>
              <Field
                id="customerPhone"
                name="Phone"
                type="tel"
                placeholder="852-98765432"
                aria-label="Customer phone input"
                class="form-control w-100"
                :class="{ 'is-invalid': errors['Phone'] }"
                :rules="isPhone"
                v-model="orderUser.tel"
              ></Field>
              <ErrorMessage name="Phone" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="customerAddress" class="modal-title-hk product-modal-title mb-2"
                >Customer Address*</label
              >
              <Field
                id="customerAddress"
                type="text"
                name="Customer Address"
                class="form-control w-100"
                aria-label="Customer Address input"
                aria-describedby="customerAddressLabel"
                :class="{ 'is-invalid': errors['Customer Address'] }"
                rules="required"
                v-model="orderUser.address"
              ></Field>
              <ErrorMessage name="Customer Address" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="customerMsg" class="modal-title-hk product-modal-title mb-2"
                >Customer message</label
              >
              <textarea
                id="customerMsg"
                name="Description"
                as="textarea"
                class="form-control w-100"
                rows="5"
                placeholder="Please type the order message"
                aria-label="Customer message"
                aria-describedby="customerMessageLabel"
                v-model="orderTemp.message"
              ></textarea>
            </div>
            <label for="isPaid" class="modal-title-hk product-modal-title mb-2 text-start"
              >Payment Status</label
            >
            <div class="input-group form-check form-switch d-flex align-items-center mb-3">
              <input
                id="isPaid"
                type="checkbox"
                class="form-check-input "
                aria-label="Order Payment Status"
                aria-describedby="PaymentStatusLabel"
                v-model="orderTemp.is_paid"
              />
              <label class="form-check-label modal-title-hk ml-2" for="wetCleaning">
                {{ orderTemp.is_paid ? 'Paid' : 'Not paid' }}
              </label>
            </div>
            <div class="modal-footer product-modal-footer">
              <button type="button"
              class="btn btn-secondary text-gray-400 rounded-0 btn-md"
              @click="closeModal">
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary rounded-0 btn-md"
                :disabled="isLoading"
              >
                <div
                  class="spinner-grow spinner-grow-sm me-2"
                  role="status"
                  v-if="isLoading"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                Update Order
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
      orderTemp: {
        message: '',
      },
      orderUser: {},
      isLoading: false,
    };
  },
  watch: {
    temp() {
      this.orderTemp = JSON.parse(JSON.stringify(this.temp));
      if (this.orderTemp.message === undefined) {
        this.orderTemp.message = '';
      }
      this.orderUser = this.orderTemp.user;
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    updateOrder(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      this.isLoading = true;
      this.$http.put(url, { data: this.orderTemp })
        .then((res) => {
          console.log(res);
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
    isPhone(value) {
      const phoneNumber = /^[0-9]{3}-[0-9]{8}$/;
      return phoneNumber.test(value) ? true : 'Invalid phone number';
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.OrderModal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
};
</script>
