<template>
  <nav aria-label="Page navigation">
    <ul class="pagination mt-5 justify-content-center">
      <li class="page-item" :class="{ disabled: !this.page.has_pre }">
        <a
          class="page-link page-link-frontend text-gray-400"
          href="#top"
          aria-label="Previous"
          @click.prevent="$emit('get-product', this.page.current_page - 1)"
        >
          <span aria-hidden="true"><i class="material-icons">chevron_left</i></span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(page, key) in this.page.total_pages"
        :class="{ active: this.page.current_page === key + 1 }"
        :key="key"
      >
        <a
          class="page-link page-link-frontend text-gray-400"
          href="#"
          @click.prevent="$emit('get-product', key + 1)"
          >{{ key + 1 }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !this.page.has_next }">
        <a
          class="page-link page-link-frontend text-gray-400"
          href="#top"
          aria-label="Next"
          @click.prevent="$emit('get-product', this.page.current_page + 1)"
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
};
</script>
