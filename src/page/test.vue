<template>
  <div class="hello">
    test页面：<br/>
    当前用户信息： {{userInfo}}
    <button @click="test1">点我试试on的问题</button>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    // console.log(this)
    // this.test2('jjjj', 'kjfajfkd')
    // this.test2.apply(this, ['jjjj', 'kjfajfkd'])
    // this.$on('test', () => {
    //   console.log('test1')
    // })
    // this.$on('test', (params) => {
    //   const temp = JSON.stringify(arguments)
    //   console.log('test2', params, arguments, temp)
    // })
    // // // this.$on('test', () => {
    // // //   console.log('test3')
    // // // })
    // setTimeout(() => {
    //   this.$emit('test', '111', '2222')
    // })
    // this.$app.on('setAccountInfo', (res) => {
    //   console.log('setAccountInfo', res)
    //   res = JSON.parse(res)
    //   this.userInfo = {
    //     idtype: res.idType,
    //     idno: res.idNum,
    //     bindingmobileno: res.bindingMobileNo
    //   }
    //   // this.userInfo = JSON.stringify(res)
    // })
    // this.$app.on('fromApp', () => {
    //   console.log('getFromApp')
    // })
    // this.$app.getAccountFromApp(() => {
    //   console.log('hhhh')
    // })
    console.log(this)
  },
  methods: {
    test () {
      try {
        console.log('testkldjfklafj')
        return 1
      } catch (e) {
        console.error(e)
      } finally {
        console.log('kjkkkl;')
      }
    },
    test1 () {
      console.log('1')
    },
    test2 (params) {
      console.log(params)
      console.log(arguments)
      console.log('2')
    },
    test3 () {
      console.log('3')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
