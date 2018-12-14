<template>
  <div class="hello">
    test页面：<br/>
    当前用户信息： {{userInfo}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
