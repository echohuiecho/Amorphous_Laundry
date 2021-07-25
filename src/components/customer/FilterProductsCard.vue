<template>
  <div class="card-products-filter bg-gray-800 pt-4 mb-5 ">
    <ul class="list-unstyled">
      <li class="mb-3">
        <a href="" class="text-uppercase" @click.prevent="$emit('get-products')">All</a>
      </li>
      <li v-for="category in categories" :key="category" class="mb-3">
        <a href="" @click.prevent="$emit('update-category', category)">{{ category }}</a>
      </li>
    </ul>
    <hr class="line-gray-600 -8" />
    <ShoppingBagStatus
      :cart="cart"
    >
    </ShoppingBagStatus>
  </div>
</template>

<script>
import ShoppingBagStatus from '@/components/customer/ShoppingBagStatus.vue';

export default {
  props: ['categories'],
  data() {
    return {
      cart: '',
    };
  },
  components: {
    ShoppingBagStatus,
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data.carts.length;
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
    this.getCart();
  },
};
</script>
