<template>
  <div>
    <button type="button" class="btn btn-light btn-sm" @click="goBack">后退</button>
    <!-- 也可以用this.$route.params.id显示id -->
    <h4 class="text-center">用户详情----{{id}}</h4>
  </div>
</template>

<script>
export default {
  name: 'MyUserDetail',
  props: ['id'],
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped></style>
