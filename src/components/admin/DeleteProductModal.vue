<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header delete-modal-header bg-light">
          <h2 class="modal-title title-hk">
            Delete Product?
          </h2>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            :disabled="isLoading"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body bg-light">
          This will permanently delete the order {{ temp.title }}.
           This action <strong>cannot</strong> be undone.
        </div>
        <div class="modal-footer bg-light">
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
            @click="removeProduct"
          >
            <div
              class="spinner-grow spinner-grow-sm me-2"
              role="status"
              v-if="isLoading"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            Delete Product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['temp'],
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
    removeProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.temp.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.isLoading = false;
            this.$emit('get-products');
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
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
};
</script>
