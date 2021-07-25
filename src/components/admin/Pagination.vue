<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mt-5 justify-content-center">
      <li class="page-item" :class="{ disabled: !this.page.has_pre }">
        <a
          class="btn btn-secondary btn-sm btn-narrow rounded-0 text-gray-400 text-uppercase
          d-flex align-items-center page-link page-link-backend"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('get-data', this.page.current_page - 1)"
        >
          <span aria-hidden="true"><i class="material-icons">chevron_left</i></span>
        </a>
      </li>
      <li
        class="page-item product-page-item"
        v-for="(page, key) in this.page.total_pages"
        :class="{ active: this.page.current_page === key + 1 }"
        :key="key"
      >
        <a
          class="page-link page-link-backend num"
          href="#"
          @click.prevent="$emit('get-data', key + 1)"
          >{{ key + 1 }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !this.page.has_next }">
        <a
          class="btn btn-secondary btn-sm btn-narrow rounded-0 text-gray-400 text-uppercase
          d-flex align-items-center page-link page-link-backend"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('get-data', this.page.current_page + 1)"
        >
          <span aria-hidden="true"><i class="material-icons">chevron_right</i></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['page'],
  data() {
    return {};
  },
};
</script>
