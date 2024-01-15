import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/BaseLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'report',
          name: 'report',
          component: () => import('@/views/ReportView.vue')
        },
        {
          path: '/attendance',
          name: 'attendance',
          component: () => import('@/views/AttendanceView.vue')
        },
        {
          path: '/account',
          name: 'account',
          component: () => import('@/views/AccountView.vue')
        },
        {
          path: '/notification',
          name: 'notification',
          component: () => import('@/views/NotificationView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  // If the route requires authentication and the user is not logged in,
  // redirect to the login page
  if (authRequired && !authStore.isLogin) {
    next('/login')
  } else {
    // If the user is already logged in, or the route doesn't require authentication,
    // allow navigation
    next()
  }
})

export default router
