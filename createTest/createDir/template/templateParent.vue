<template>
  <div class="{{name}}-page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: '{{name}}'
  created () {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./{{name}}.scss";
</style>