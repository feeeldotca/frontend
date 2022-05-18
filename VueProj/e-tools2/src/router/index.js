import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/voldrop',
    name: "VoltageDrop", 
    component: () => import('@/components/VolDrop/VoltageDrop')
  },

  {
    path: '/blog',
    name: 'blogpage',
    component: ()=> import('@/components/blog/BlogPage.vue'),
    children: [
      {
        path: 'addblog',
        name: 'addblog',
        component: ()=> import('@/components/blog/AddBlog.vue')
      } ,
      {
        path: 'showblogs',
        name: 'showblogs',
        component: () => import('@/components/blog/ShowBlog.vue')
      },
      {
        path: 'editblog/:id',
        name: 'EditBlog',
        component: () => import('@/components/blog/EditBlog.vue')
      },
      {
        path: 'blog/:id',
        name: 'single-blog',
        component: () => import('@/components/blog/SingleBlog.vue')
      },
    ]
  },
 
  {
    path: '/tables',
    name: 'Tables',
    component: ()=> import('../components/RtdTables.vue'),
    children: [
      {
        path: 'table2',
        name: 'Table2',
        component: ()=> import('@/components/tables/TableNo2.vue')
      },
      {
        path: 'table4',
        name: 'TableNo4',
        component: ()=> import('@/components/tables/TableNo4.vue')
      },
      {
        path: 'table39',
        name: 'Table39',
        component: ()=> import('@/components/tables/TableNo39.vue')
      },
      {
        path: 'notready',
        name: 'Not Ready',
        component: ()=> import('@/components/tables/NotReady.vue')
      },
      {
        path: 'cssanimation',
        name: 'Css Animation',
        component: ()=> import('@/components/cssanimation/SquareMonster.vue')
      },
    ]
  },
  {
    path: '/menus',
    name: 'Menus',
    component: ()=> import('@/views/MenuView.vue')
  },
  
  {
    path: '/calcs',
    name: 'LoadCalc',
    component: ()=> import('@/components/loadCalc/HouseDemand.vue')
  },
  {
    path: '/cssmotion',
    component: ()=> import('@/components/CssMotion.vue')
  },
  {
    path: '/todo',
    name: 'todo list',
    component: ()=> import('@/components/TodoHome.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
