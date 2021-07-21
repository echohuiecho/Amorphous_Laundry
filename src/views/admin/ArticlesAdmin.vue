<template>
  <div class="container mt-5">
    <button
      type="button"
      class="btn btn-light btn-outline-primary mb-3"
      @click="openModal('addArticle')"
    >
      <i class="material-icons">add</i>
      <span> 新增文章 </span>
    </button>
    <div class="card product-card">
      <div class="card-body product-header">
        <h1 class="title-en text-uppercase text-center">
          All Articles
        </h1>
        <h1 class="title-hk text-center mb-0">
          文章列表
        </h1>
      </div>
      <div class="card-body bg-light">
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th class="table-title-hk text-start" width="400">Article Title</th>
              <th class="table-title-hk text-start">Category</th>
              <th class="table-title-hk text-start">Date Created</th>
              <th class="table-title-hk text-end" width="80">啟用</th>
              <th class="table-title-hk text-end" width="80">編輯</th>
              <th class="table-title-hk text-end" width="80">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in articles" :key="article.id">
              <td class="text-start">{{ article.title }}</td>
              <td class="text-start">{{ article.category }}</td>
              <td class="text-start">{{ convertedDate[index] }}</td>
              <td class="text-end">{{ article.isPublic }}</td>
              <td class="text-end">
                <button
                  type="button"
                  id="editArticle"
                  class="btn btn-light btn-outline-primary"
                  :data-id="article.id"
                  @click="getArticle(article.id, index)"
                >
                  <i class="material-icons">edit</i>
                </button>
              </td>
              <td class="text-end">
                <button
                  type="button"
                  id="removeArticle"
                  class="btn btn-light btn-outline-primary"
                  data-action="remove"
                  :data-id="article.id"
                  @click="openModal('deleteArticle', index)"
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
  <Pagination :page="paginationData" @get-data="getArticles"> </Pagination>
  <ArticleModal
    ref="ArticleModal"
    :temp="temp"
    :date="tempCreatedDate"
    :modal-type="modalType"
    @success-alert="successAlert"
  >
  </ArticleModal>
  <DeleteModal
    ref="DeleteArticleModal"
    :temp="temp"
    :modal-type="modalType"
    @get-data="getArticles"
  >
  </DeleteModal>
</template>

<script>
import Pagination from '@/components/admin/Pagination.vue';
import ArticleModal from '@/components/admin/ArticleModal.vue';
import DeleteModal from '@/components/admin/DeleteModal.vue';

export default {
  data() {
    return {
      articles: [],
      convertedDate: [],
      paginationData: '',
      temp: {},
      tempCreatedDate: '',
      tempPublishDate: '',
      modalType: '',
    };
  },
  components: {
    Pagination,
    ArticleModal,
    DeleteModal,
  },
  watch: {
    articles() {
      // 轉換訂單建立時間格式
      // eslint-disable-next-line max-len
      this.convertedDate = this.articles.map((item) => new Date(item.create_at * 1000).toLocaleDateString());
    },
  },
  methods: {
    getArticles(page = 1) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      // 取得後台文章列表
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.articles = res.data.articles;
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
    getArticle(id) {
      const loader = this.$loading.show();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      // 取得單一文章
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.temp = res.data.article;
            this.tempCreatedDate = new Date(this.temp.create_at * 1000).toLocaleDateString();
            // console.log(index);
            this.openModal('editArticle');
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
    openModal(modalStatus, index) {
      if (modalStatus === 'addArticle') {
        // 新增文章
        this.temp = {
          title: '',
          create_at: 0,
          author: '',
          category: '',
          color: '#000000',
          isPublic: false,
        };
      }
      this.modalType = modalStatus;
      switch (modalStatus) {
        case 'addArticle':
          this.$refs.ArticleModal.openModal();
          break;
        case 'editArticle':
          this.$refs.ArticleModal.openModal();
          break;
        case 'deleteArticle':
          this.temp = this.articles[index];
          this.$refs.DeleteArticleModal.openModal();
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
        title: 'Your article has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      this.getArticles();
    },
  },
  mounted() {
    console.clear();
    this.getArticles();
  },
};
</script>
