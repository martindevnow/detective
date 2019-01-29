import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import ErrorNotFound from '../views/ErrorNotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
      component: () => import(/* webpackChunkName: "scenariosView" */ '../views/Scenarios.vue')
    },
    {
      path: '/scenario/:id',
      component: () => import(/* webpackChunkName: "scenarioView" */ '../views/Scenario.vue'),
      children: [
        { 
          path: '', 
          name: 'scenario', 
          component: () => import(/* webpackChunkName: "scenarioComp" */ '../components/Scenario.vue')
        },
        {
          path: ':location',
          name: 'location',
          component: () => import(/* webpackChunkName: "locationView" */ '../views/Location.vue')
        },
      ]
    },
    {
      path: '/scenario/:id/:location/survey',
      name: 'survey',
      component: () => import(/* webpackChunkName: "surveyView" */ '../views/Survey.vue')
    },
    {
      path: '*',
      name: 'error-404',
      component: ErrorNotFound
    }
  ]
})
