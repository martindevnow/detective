import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ErrorNotFound from './views/ErrorNotFound.vue'

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
      path: '/scenarios',
      name: 'scenarions',
      // route level code-splitting
      // this generates a separate chunk (scenarios.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "scenarios" */ './views/Scenarios.vue')
    },
    {
      path: '/scenario/:id/:location',
      name: 'location',
      component: () => import(/* webpackChunkName: "location" */ './views/Location.vue')
    },
    {
      path: '/scenario/:id',
      name: 'scenario',
      component: () => import(/* webpackChunkName: "scenario" */ './views/Scenario.vue')
    },

    {
      path: '/scenario/:id/:location',
      name: 'survey',
      component: () => import(/* webpackChunkName: "survey" */ './views/Survey.vue')
    },
    {
      path: '*',
      name: 'error-404',
      component: ErrorNotFound
    }
  ]
})
