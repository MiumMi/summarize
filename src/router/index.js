/* global Vue VueRouter */
/* eslint no-undef: "error" */
import HelloWorld from '@/components/HelloWorld'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
