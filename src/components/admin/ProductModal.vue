<template>
  <div
    class="modal fade"
    ref="ProductModal"
    tabindex="-1"
    aria-labelledby="ProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-form modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-body">
        <div class="modal-header form-modal-header">
          <h1 v-if="modalType === 'addProduct'" class="h3">
            Add New Product
          </h1>
          <h1 v-else class="h3">
            Edit Product
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
        <div class="modal-body">
          <Form id="productForm" v-slot="{ errors }" @submit="updateProduct(modalType)">
            <div class="modal-title-hk w-100 text-end">
              *Compulsory fields
            </div>
            <div class="input-group mb-3">
              <label for="productTitle" class="modal-title-hk w-100 mb-2"
                >Product Title*</label
              >
              <Field
                id="productTitle"
                type="text"
                name="Title"
                class="form-control product-modal-form-control"
                placeholder="Please type the product title here"
                aria-label="Product title input"
                aria-describedby="productTitleLabel"
                :class="{ 'is-invalid': errors['Title'] }"
                rules="required"
                v-model="productTemp.title"
              ></Field>
              <ErrorMessage name="Title" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="productCategory" class="modal-title-hk w-100 mb-2"
                >Product Category*</label
              >
              <Field
                id="productCategory"
                name="Category"
                as="select"
                class="form-control product-modal-form-control"
                :class="{ 'is-invalid': errors['Category'] }"
                rules="required"
                v-model="productTemp.category"
              >
                <option value="" disabled>Please Choose</option>
                <option :value="item" v-for="item in category" :key="item">{{ item }}</option>
              </Field>
              <ErrorMessage name="Category" class="invalid-feedback"></ErrorMessage>
            </div>
            <!-- <div class="input-group mb-3">
              <label for="productType" class="modal-title-hk w-100 mb-2">Product Type*</label>
              <Field
                id="productType"
                name="Product Type"
                as="select"
                class="form-control product-modal-form-control"
                :class="{ 'is-invalid': errors['Product Type'] }"
                rules="required"
                v-model="productTemp.productType"
              >
                <option value="" disabled>Please Choose</option>
                <template
                  v-if="productTemp.category === '衣物類' || productTemp.category === 'Clothes'">
                  <option
                    :value="clothingType"
                    v-for="clothingType in productType.clothings"
                    :key="clothingType"
                    >{{ clothingType }}</option
                  >
                </template>
                <template
                  v-else-if="productTemp.category === '袋類' || productTemp.category === 'Bags'">
                  <option :value="bagType" v-for="bagType in productType.bags" :key="bagType">{{
                    bagType
                  }}</option>
                </template>
                <template
                  v-else-if="productTemp.category === '鞋類' || productTemp.category === 'Shoes'">
                  <option :value="shoeType" v-for="shoeType in productType.shoes" :key="shoeType">{{
                    shoeType
                  }}</option>
                </template>
                <template
                  v-else-if="productTemp.category === '公仔類' || productTemp.category === 'Soft Toys'"
                >
                  <option :value="toyType" v-for="toyType in productType.softToys" :key="toyType">{{
                    toyType
                  }}</option>
                </template>
                <template
                  v-else-if="productTemp.category === '布草類' || productTemp.category === 'Beddings'">
                  <option
                    :value="clothType"
                    v-for="clothType in productType.clothes"
                    :key="clothType"
                    >{{ clothType }}</option
                  >
                </template>
              </Field>
              <ErrorMessage name="Product Type" class="invalid-feedback"></ErrorMessage>
            </div> -->
            <div class="input-group mb-3">
              <label for="productColor" class="modal-title-hk w-100 mb-2">Color*</label>
              <Field
                id="productColor"
                name="Product Color"
                as="select"
                class="form-control product-modal-form-control"
                :class="{ 'is-invalid': errors['Product Color'] }"
                rules="required"
                v-model="productTemp.colorType"
              >
                <option value="" disabled>Please Choose</option>
                <option :value="color" v-for="color in colorType" :key="color">{{ color }}</option>
              </Field>
              <ErrorMessage name="Product Color" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="productUnit" class="modal-title-hk w-100 mb-2">Product Unit*</label>
              <Field
                id="productUnit"
                name="Product Unit"
                type="text"
                class="form-control product-modal-form-control"
                placeholder="Type the Product unit"
                aria-label="Product unit input"
                aria-describedby="productUnitLabel"
                :class="{ 'is-invalid': errors['Product Unit'] }"
                rules="required"
                v-model="productTemp.unit"
              />
              <ErrorMessage name="Product Unit" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="productOriginPrice" class="modal-title-hk w-100 mb-2"
                >Original Price*</label
              >
              <Field
                id="productOriginPrice"
                name="Original Price"
                type="number"
                min="0"
                class="form-control product-modal-form-control"
                :class="{ 'is-invalid': errors['Original Price'] }"
                rules="required"
                aria-label="Product original price input"
                aria-describedby="productOriginPriceLabel"
                v-model.number="productTemp.origin_price"
              />
              <ErrorMessage name="Original Price" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="productPrice" class="modal-title-hk w-100 mb-2">Selling Price*</label>
              <Field
                id="productPrice"
                name="Price"
                type="number"
                min="0"
                class="form-control product-modal-form-control"
                :class="{ 'is-invalid': errors['Price'] }"
                aria-label="Product price input"
                aria-describedby="productPriceLabel"
                rules="required"
                v-model.number="productTemp.price"
              />
              <ErrorMessage name="Price" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="productDescription" class="modal-title-hk w-100 mb-2">Description</label>
              <textarea
                id="productDescription"
                name="Description"
                as="textarea"
                class="form-control w-100"
                rows="5"
                placeholder="Please type the product description here"
                aria-label="Product description"
                aria-describedby="productDescriptionLabel"
                v-model="productTemp.description"
              ></textarea>
            </div>
            <div class="input-group mb-3">
              <label for="productContent" class="modal-title-hk w-100 mb-2">Content</label>
              <textarea
                name=""
                id="productContent"
                class="form-control w-100"
                rows="10"
                placeholder="Please type the product content here"
                aria-label="Product content"
                aria-describedby="productContentLabel"
                v-model="productTemp.content"
              ></textarea>
            </div>
            <div class="input-group mb-3">
              <label for="productMainImageUrl" class="modal-title-hk w-100 mb-2">
                Product Key Image
              </label>
              <img class="productImage mb-2" :src="productTemp.imageUrl" alt="" />
              <input
                type="text"
                id="productMainImageUrl"
                class="form-control w-100 mb-2"
                placeholder="Image address url"
                aria-label="Product main image url input"
                aria-describedby="productMainImageUrlLabel"
                v-model="productTemp.imageUrl"
              />
              <div class="w-100">
                <button
                  type="button"
                  class="btn btn-gray-dark mb-2"
                  @click="openUploadModal('key image')"
                >
                  Browse Image
                </button>
              </div>
            </div>
            <template v-if="productTemp.imagesUrl.length > 0">
              <div
                class="input-group mb-3"
                v-for="(url, index) in productTemp.imagesUrl"
                :key="'url' + index"
              >
                <label for="'url' + index" class="modal-title-hk w-100 mb-2">
                  Product Image{{ index + 1 }}
                </label>
                <img class="productImage mb-2" :src="productTemp.imagesUrl[index]" alt="" />
                <input
                  type="text"
                  :id="'url' + index"
                  class="form-control w-100 mb-2"
                  placeholder="輸入主要圖片連結"
                  aria-label="Product image url input"
                  aria-describedby="productImageUrlLabel"
                  v-model="productTemp.imagesUrl[index]"
                />
                <div class="w-100">
                  <button
                    type="button"
                    class="btn btn-gray-dark mb-2"
                    @click="openUploadModal('image', index)"
                  >
                    Browse Image
                  </button>
                </div>
                <div class="w-100">
                  <button type="button" class="btn btn-gray-dark mb-2" @click="removeImage(index)">
                    Delete Image
                  </button>
                </div>
              </div>
            </template>
            <button
              type="button"
              class="btn btn-gray-dark mb-3"
              @click="productTemp.imagesUrl.push('')"
            >
              Add Image
            </button>
            <label for="wetCleaning" class="modal-title-hk w-100 mb-2">Dry Clean Service</label>
            <div class="input-group form-check form-switch d-flex align-items-center mb-3">
              <input
                type="checkbox"
                id="wetCleaning"
                class="form-check-input"
                aria-label="Enable or disable wet cleaning service"
                aria-describedby="productIsEnabledLabel"
                v-model="productTemp.wetCleaning"
              />
              <label class="form-check-label modal-title-hk ml-2" for="wetCleaning">
                {{ productTemp.wetCleaning ? 'Provided' : 'Not Provided' }}
              </label>
            </div>
            <label for="dryCleaning" class="modal-title-hk w-100 mb-2">Wet Clean Service</label>
            <div class="input-group form-check form-switch d-flex align-items-center mb-3">
              <input
                type="checkbox"
                id="dryCleaning"
                class="form-check-input"
                aria-label="Enable or disable wet cleaning service"
                aria-describedby="productIsEnabledLabel"
                v-model="productTemp.dryCleaning"
              />
              <label class="form-check-label modal-title-hk ml-2" for="dryCleaning">
                {{ productTemp.dryCleaning ? 'Provided' : 'Not Provided' }}
              </label>
            </div>
            <label for="ironing" class="modal-title-hk w-100 mb-2">Ironing Service</label>
            <div class="input-group form-check form-switch d-flex align-items-center mb-3">
              <input
                type="checkbox"
                id="ironing"
                class="form-check-input"
                aria-label="Enable or disable wet cleaning service"
                aria-describedby="productIsEnabledLabel"
                v-model="productTemp.ironing"
              />
              <label class="form-check-label modal-title-hk ml-2" for="ironing">
                {{ productTemp.ironing ? 'Provided' : 'Not Provided' }}
              </label>
            </div>
            <label for="dirtService" class="modal-title-hk w-100 mb-2"
              >Dirt Removal Service</label
            >
            <div class="input-group form-check form-switch d-flex align-items-center mb-3">
              <input
                type="checkbox"
                id="dirtService"
                class="form-check-input"
                aria-label="Enable or disable wet cleaning service"
                aria-describedby="productIsEnabledLabel"
                v-model="productTemp.dirtService"
              />
              <label class="form-check-label modal-title-hk ml-2" for="dirtService">
                {{ productTemp.dirtService ? 'Provided' : 'Not Provided' }}
              </label>
            </div>
            <div class="input-group form-check form-switch d-flex align-items-center mb-3">
              <input
                type="checkbox"
                id="productIsEnable"
                class="form-check-input"
                aria-label="Enable or disable product"
                aria-describedby="productIsEnabledLabel"
                v-model="productTemp.is_enabled"
              />
              <label class="form-check-label modal-title-hk ml-2" for="productIsEnable">
                {{ productTemp.is_enabled ? 'Enabled' : 'Disabled' }}
              </label>
            </div>
            <div class="modal-footer product-modal-footer">
              <button
                type="button"
                class="btn btn-secondary text-gray-400 rounded-0 btn-md" @click="closeModal">
                Cancel
              </button>
              <button
                v-if="modalType === 'addProduct'"
                type="submit"
                class="btn btn-primary rounded-0 btn-md"
                :disabled="isLoading"
              >
                <div class="spinner-grow spinner-grow-sm me-2" role="status" v-if="isLoading">
                  <span class="visually-hidden">Loading...</span>
                </div>
                Add Product
              </button>

              <button
                v-else type="submit"
                class="btn btn-primary rounded-0 btn-md" :disabled="isLoading">
                <div class="spinner-grow spinner-grow-sm me-2" role="status" v-if="isLoading">
                  <span class="visually-hidden">Loading...</span>
                </div>
                Update Product
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
  props: ['temp', 'modalType'],
  data() {
    return {
      modal: '',
      category: ['Clothes', 'Bags', 'Shoes', 'Soft Toys', 'Beddings'],
      // productType: {
      //   clothings: ['外套', '上身', '下身', '內衣物', '襪子'],
      //   bags: ['布袋', '皮革袋', '尼龍袋'],
      //   shoes: ['運動鞋', '皮鞋', '布質拖鞋'],
      //   softToys: ['大型毛公仔', '小型毛公仔'],
      //   clothes: ['床單', '被袋', '枕袋', '枱布', '大毛巾', '小毛巾'],
      // },
      colorType: ['Color', 'White'],
      productTemp: {
        imagesUrl: [],
      },
      isLoading: false,
    };
  },
  watch: {
    temp() {
      this.productTemp = this.temp;
      if (this.productTemp.imagesUrl === undefined) {
        this.productTemp.imagesUrl = [];
      }
      this.productTemp.is_enabled = this.temp.is_enabled === '1';
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    openUploadModal(str, index) {
      let uploadFolder = '';
      switch (this.productTemp.category) {
        case 'Clothes':
          uploadFolder = '2021_Amorphous_hotel/Clothes';
          break;
        case 'Bags':
          uploadFolder = '2021_Amorphous_hotel/Bags';
          break;
        case 'Shoes':
          uploadFolder = '2021_Amorphous_hotel/Shoes';
          break;
        case 'Soft Toys':
          uploadFolder = '2021_Amorphous_hotel/Soft-toys';
          break;
        case 'Beddings':
          uploadFolder = '2021_Amorphous_hotel/Clothings';
          break;
        default:
          console.log('cannot match the product category');
          break;
      }
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: 'echohui',
            upload_preset: 'wqrjfdlf',
            folder: uploadFolder,
          },
          (error, result) => {
            if (!error && result && result.event === 'success') {
              console.log('Done uploading..: ', result.info);
              if (str === 'key image') {
                this.productTemp.imageUrl = result.info.url;
              } else {
                this.productTemp.imagesUrl[index] = result.info.url;
              }
            }
          },
        )
        .open();
    },
    removeImage(index) {
      this.productTemp.imagesUrl.splice(index, 1);
    },
    updateProduct(str) {
      // 新增產品或修改產品
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      if (str === 'editProduct') {
        url = `${url}/${this.productTemp.id}`;
        httpMethod = 'put';
      }
      this.productTemp.is_enabled = this.productTemp.is_enabled ? '1' : '0';
      this.isLoading = true;
      this.$http[httpMethod](url, { data: this.productTemp })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.closeModal();
            this.$emit('success-alert');
          } else {
            alert(res.data.message);
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.ProductModal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
};
</script>
