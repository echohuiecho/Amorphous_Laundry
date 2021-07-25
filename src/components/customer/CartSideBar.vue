<template>
  <div class="position-fixed nav-sidebar d-flex flex-column align-items-end">
    <MenuNav></MenuNav>

    <!-- Shopping bag deatils -->
    <div class="cart-sidebar
      card card-body bg-gray-800
      text-uppercase position-relative px-5 mt-3">
      <div class="input-group mb-3">
        <label for="cartCoupon" class="modal-title-hk w-100 mb-2"
          >I have a coupon code</label
        >
        <input
          id="cartCoupon"
          type="text"
          name="cartCoupon"
          class="form-control rounded-0 bg-gray-700 border border-gray-600"
          placeholder="e.g. BUYNOW0x"
          aria-label="check out coupon input"
          aria-describedby="cartCouponLabel"
          v-model="coupon"
        />
        <button
          class="btn btn-secondary text-uppercase text-gray-400 rounded-0"
          @click="$emit('apply-coupon',coupon)"
        >
          Apply Coupon
        </button>
      </div>
      <div class="d-flex justify-content-between mb-3">
        <span class="en">subtotal</span>
        <span class="num">hkd {{ cart.total }}</span>
      </div>
      <div class="d-flex justify-content-between">
        <span class="en">discount</span>
        <span class="num">-hkd{{ discount }}</span>
      </div>
      <div class="small text-muted" v-if="appliedCoupon">Applied Coupon: {{ appliedCoupon }}</div>
      <div class="d-flex justify-content-between mt-3">
        <span class="en">total</span>
        <span class="num">hkd {{ cart.final_total }}</span>
      </div>
      <div class="small text-muted">Shipping will be calculated during checkout</div>
      <hr class="line-gray-600" />
      <div class="mt-3">
        <button type="button"
        class="btn btn-primary text-uppercase w-100 rounded-0" @click="$emit('checkout')">
          check out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MenuNav from '@/components/customer/MenuNav.vue';

export default {
  props: ['cart'],
  data() {
    return {
      coupon: '',
      appliedCoupon: '',
      discount: 0,
    };
  },
  watch: {
    cart: {
      handler() {
        this.discount = this.cart.total - this.cart.final_total;
        this.appliedCoupon = this.cart.carts[0].coupon.code;
      },
      deep: true,
    },
  },
  components: {
    MenuNav,
  },
};
</script>
