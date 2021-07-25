<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
    ref="DeleteModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header delete-modal-header bg-gray-700">
          <h2 class="m-0" id="deleteModalLabel">
            Are you sure?
          </h2>
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
        <div class="modal-body bg-gray-700 text-body">
          <span v-if="modalType === 'deleteProduct'">
            This will permanently delete the product <strong>{{ temp.title }}</strong>.
          </span>
          <span v-else-if="modalType === 'deleteOrder'">
            This will permanently delete the order <strong>{{ temp.id }}</strong>.
          </span>
          <span v-else-if="modalType === 'deleteCoupon'">
            This will permanently delete the coupon <strong>{{ temp.title }}</strong>.
          </span>
            This action <strong>cannot</strong> be undone.
        </div>
        <div class="modal-footer p-0 border-top-0 justify-content-between">
          <button type="button"
          class="btn btn-light text-body btn-md m-0 rounded-0 w-50"
          :disabled="isLoading"
          @click="closeModal">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger text-body btn-md m-0 rounded-0 w-50"
            :disabled="isLoading"
            @click="removeItem"
          >
            <div
              class="spinner-grow spinner-grow-sm me-2"
              role="status"
              v-if="isLoading"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['temp', 'modalType'],
  data() {
    return {
      modal: '',
      isLoading: false,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    // 刪除資料
    removeItem() {
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}`;
      switch (this.modalType) {
        case 'deleteProduct':
          url = `${url}/admin/product/${this.temp.id}`;
          break;
        case 'deleteOrder':
          url = `${url}/admin/order/${this.temp.id}`;
          break;
        case 'deleteCoupon':
          url = `${url}/admin/coupon/${this.temp.id}`;
          break;
        default:
          console.log('Cannot match the modal type');
      }
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.$emit('get-data');
            this.closeModal();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.DeleteModal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
};
</script>
