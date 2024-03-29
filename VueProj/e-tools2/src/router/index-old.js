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
    path: '/blog',
    name: 'blog',
    component: ()=> import('@/components/blog/BlogPage.vue'),
    children: [
      {
        path: '/blog/addblog',
        name: 'addblog',
        component: ()=> import('@/components/blog/AddBlog.vue')
      } ,
      {
        path: '/blog/showblogs',
        name: 'showblogs',
        component: () => import('@/components/blog/ShowBlog.vue')
      },
      {
        path: '/blog/editblog/:id',
        name: 'EditBlog',
        component: () => import('@/components/blog/EditBlog.vue')
      },
      {
        path: '/blog/blog/:id',
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
        path: '/tables/table2',
        name: 'Table2',
        component: ()=> import('@/components/tables/TableNo2.vue')
      },
      {
        path: '/tables/table4',
        name: 'Table4',
        component: ()=> import('@/components/tables/TableNo4.vue')
      },
      {
        path: '/tables/table39',
        name: 'Table39',
        component: ()=> import('@/components/tables/TableNo39.vue')
      },
      {
        path: '/tables/notready',
        name: 'Not Ready',
        component: ()=> import('@/components/tables/NotReady.vue')
      },
      {
        path: '/cssanimation',
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
    path: '/css',
    name: 'CSS Animations',
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
