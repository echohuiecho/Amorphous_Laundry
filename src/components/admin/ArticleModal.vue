<template>
  <div
    class="modal fade"
    ref="ArticleModal"
    tabindex="-1"
    aria-labelledby="ArticleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-form modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header form-modal-header">
          <h1 v-if="modalType === 'addArticle'" class="modal-title title-hk">
            Add Article
          </h1>
          <h1 v-else class="modal-title title-hk">
            Edit Article
          </h1>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body product-modal-body">
          <Form id="articleForm" v-slot="{ errors }" @submit="updateArticle(articleTemp.id)">
            <div class="modal-title-hk text-end">
              *Compulsory fields
            </div>
            <div class="input-group mb-3">
              <label for="articleTitle" class="modal-title-hk product-modal-title mb-2"
                >Article Title*</label
              >
              <Field
                id="articleTitle"
                type="text"
                name="Article Title"
                class="form-control w-100"
                aria-label="Article Title input"
                aria-describedby="articleTitleLabel"
                :class="{ 'is-invalid': errors['Article Title'] }"
                rules="required"
                v-model="articleTemp.title"
              ></Field>
              <ErrorMessage name="Coupon Title" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="articleTitle" class="modal-title-hk product-modal-title mb-2"
                >Article Author*</label
              >
              <Field
                id="articleAuthor"
                type="text"
                name="Article Author"
                class="form-control w-100"
                aria-label="Article Author input"
                aria-describedby="articleAuthorLabel"
                :class="{ 'is-invalid': errors['Article Author'] }"
                rules="required"
                v-model="articleTemp.author"
              ></Field>
              <ErrorMessage name="Coupon Title" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="articleCategory" class="modal-title-hk w-100 mb-2"
                >Article Category*</label
              >
              <Field
                id="productCategory"
                name="Article Category"
                as="select"
                class="form-control product-modal-form-control"
                :class="{ 'is-invalid': errors['Article Category'] }"
                rules="required"
                v-model="articleTemp.category"
              >
                <option value="" disabled>Please Choose</option>
                <option :value="item" v-for="item in category" :key="item">{{ item }}</option>
              </Field>
              <ErrorMessage name="Article Category" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="input-group mb-3">
              <label for="articleColor" class="modal-title-hk product-modal-title mb-2"
                >Color of the Article</label
              >
              <input
                id="articleColor"
                type="color"
                name="Article Color"
                class="form-control w-100"
                aria-label="Article Color input"
                aria-describedby="articleColorLabel"
                v-model="articleTemp.color"
              />
            </div>
            <div class="input-group w-100 mb-3">
              <label for="articleEngContent" class="modal-title-hk w-100 mb-2">Description*</label>
              <ckeditor :editor="editor" :config="editorConfig" v-model="articleTemp.description">
              </ckeditor>
            </div>
            <div class="input-group w-100 mb-3">
              <label for="articleEngContent" class="modal-title-hk w-100 mb-2">Content*</label>
              <ckeditor :editor="editor" :config="editorConfig" v-model="articleTemp.content">
              </ckeditor>
            </div>
            <div class="input-group mb-3">
              <label for="articleMainImageUrl" class="modal-title-hk w-100 mb-2">
                Article Key Image
              </label>
              <img class="productImage mb-2" :src="articleTemp.imageUrl" alt="" />
              <input
                type="text"
                id="articleMainImageUrl"
                class="form-control w-100 mb-2"
                placeholder="Type the image url here"
                aria-label="Article key image url input"
                aria-describedby="articleMainImageUrlLabel"
                v-model="articleTemp.imageUrl"
              />
              <div class="w-100">
                <button type="button"
                class="btn btn-gray-dark mb-2"
                @click="openUploadModal('key image')">
                  Browse Image
                </button>
              </div>
            </div>
            <template v-if="articleTemp.imagesUrl.length > 0">
              <div
                class="input-group mb-3"
                v-for="(url, index) in articleTemp.imagesUrl"
                :key="'url' + index"
              >
                <label for="'url' + index" class="modal-title-hk w-100 mb-2">
                  Content Image {{ index + 1 }}
                </label>
                <img class="productImage mb-2" :src="articleTemp.imagesUrl[index]" alt="" />
                <input
                  type="text"
                  :id="'url' + index"
                  class="form-control w-100 mb-2"
                  placeholder="Type the image url here"
                  aria-label="Article Content image url input"
                  aria-describedby="articleImageUrlLabel"
                  v-model="articleTemp.imagesUrl[index]"
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
              @click="articleTemp.imagesUrl.push('')"
            >
              Add Image
            </button>
            <label for="articleIsPublic"
            class="modal-title-hk product-modal-title w-100 mb-2 text-start"
            >Publish Article*</label
            >
            <div class="input-group form-check form-switch d-flex align-items-center mb-3">
              <input
                id="articleIsPublic"
                type="checkbox"
                class="form-check-input"
                aria-label="Article Status"
                aria-describedby="ArticleStatusLabel"
                v-model="articleTemp.isPublic"
              />
              <label class="form-check-label modal-title-hk ml-2" for="articleIsPublic">
                {{ articleTemp.isPublic ? 'Published' : 'Unpublished' }}
              </label>
            </div>
            <template v-if="modalType === 'editArticle'">
              <div class="modal-title-hk">
                Created
              </div>
              <div class="text-muted mb-3">
                {{ tempCreatedDate }}
              </div>
              <div class="modal-title-hk">
                Last published
              </div>
              <div class="text-muted mb-3">
                {{ tempPublishDate }}
              </div>
            </template>
            <div class="modal-footer product-modal-footer">
              <button type="button" class="btn btn-outline-primary btn-md" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="btn btn-gray-dark btn-md" :disabled="isLoading">
                <div class="spinner-grow spinner-grow-sm me-2" role="status" v-if="isLoading">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <span v-if="modalType === 'addArticle'">
                  Add Article
                </span>
                <span v-else>
                  Update Article
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: ['temp', 'date', 'modalType'],
  data() {
    return {
      modal: '',
      category: ['R & D', 'Cleaning Tips'],
      articleTemp: {
        color: '#000000',
        imagesUrl: [],
      },
      // 參考：https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html#editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link'],
      },
      tempCreatedDate: '',
      tempPublishDate: '',
      isLoading: false,
    };
  },
  watch: {
    temp() {
      this.articleTemp = JSON.parse(JSON.stringify(this.temp));
      if (this.modalType === 'editArticle') {
        this.changeDateFormat();
      }
      if (this.articleTemp.imagesUrl === undefined) {
        this.articleTemp.imagesUrl = [];
      }
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
      this.tempCreatedDate = new Date(this.articleTemp.create_at * 1000).toLocaleString();
      this.tempPublishDate = new Date(this.articleTemp.publish_at * 1000).toLocaleString();
    },
    openUploadModal(str, index) {
      let uploadFolder = '';
      switch (this.articleTemp.category) {
        case 'R & D':
          uploadFolder = '2021_Amorphous_hotel/Articles/RD';
          break;
        case 'Cleaning Tips':
          uploadFolder = '2021_Amorphous_hotel/Articles/Cleaning_Tips';
          break;
        default:
          console.log('cannot match the article category');
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
                this.articleTemp.imageUrl = result.info.url;
              } else {
                this.articleTemp.imagesUrl[index] = result.info.url;
              }
            }
          },
        )
        .open();
    },
    removeImage(index) {
      this.articleTemp.imagesUrl.splice(index, 1);
    },
    updateArticle(id = 0) {
      // 新增文章或修改文章
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      if (this.modalType === 'editArticle') {
        url = `${url}/${id}`;
        httpMethod = 'put';
      } else {
        this.articleTemp.create_at = parseInt((new Date().getTime() / 1000).toFixed(0), 10);
      }
      if (this.articleTemp.isPublic) {
        this.articleTemp.publish_at = parseInt((new Date().getTime() / 1000).toFixed(0), 10);
      }
      this.articleTemp.is_enabled = this.articleTemp.is_enabled ? 1 : 0;
      this.isLoading = true;
      this.$http[httpMethod](url, { data: this.articleTemp })
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
    this.modal = new Modal(this.$refs.ArticleModal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
};
</script>
