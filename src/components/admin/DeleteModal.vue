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
        <div class="modal-header delete-modal-header bg-light">
          <h2 class="modal-title title-hk" id="deleteModalLabel">
            <span v-if="modalType === 'deleteProduct'">
              Delete Product?
            </span>
            <span v-else-if="modalType === 'deleteOrder'">
              Delete Order?
            </span>
            <span v-else-if="modalType === 'deleteCoupon'">
              Delete Coupon?
            </span>
            <span v-else>
              Delete article?
            </span>
          </h2>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            :disabled="isLoading"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body product-modal-body text-start">
          <span v-if="modalType === 'deleteProduct'">
            This will permanently delete the product <strong>{{ temp.title }}</strong>.
          </span>
          <span v-else-if="modalType === 'deleteOrder'">
            This will permanently delete the order <strong>{{ temp.id }}</strong>.
          </span>
          <span v-else-if="modalType === 'deleteCoupon'">
            This will permanently delete the coupon <strong>{{ temp.title }}</strong>.
          </span>
          <span v-else>
            This will permanently delete the article <strong>{{ temp.title }}</strong>.
          </span>
            This action <strong>cannot</strong> be undone.
        </div>
        <div class="modal-footer product-modal-footer">
          <button type="button"
          class="btn btn-outline-primary btn-md"
          :disabled="isLoading"
          @click="closeModal">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-gray-dark btn-md"
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
        case 'deleteArticle':
          url = `${url}/admin/article/${this.temp.id}`;
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
