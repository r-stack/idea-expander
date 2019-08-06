import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import PlayRoom from '@/components/PlayRoom'
import Result from '@/components/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/room/:roomName',
      name: 'PlayRoom',
      component: PlayRoom
    }
  ]
})
