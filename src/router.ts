import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Recipe from './views/Recipe.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/edit',
      name: 'edit',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "edit" */ './views/Edit.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import(/* webpackChunkName: "edit" */ './views/Edit.vue')
    },
    {
      path: '/recipe/:id',
      name: 'recipe/:id',
      component: Recipe
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
