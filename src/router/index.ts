import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      PageTitle: `Welcome to Nexus`
    }
  },
  {
    path: '/login',
    name: 'Sign In',
    component: () => import('../views/account/Login.vue'),
    meta: {
      PageTitle: `Sign in`
    }
  },
  {
    path: '/register',
    name: 'Sign Up',
    component: () => import('../views/account/Register.vue'),
    meta: {
      PageTitle: `Create your account`
    }
  },
  {
    path: '/chatbot',
    name: 'Chatbot',
    component: () => import('../views/Chatbot.vue'),
    meta: {
      PageTitle: `Chatbot`
    },
  },
  {
    path: '/browse',
    name: 'Browse',
    component: () => import('../views/Browse.vue'),
    meta: {
      PageTitle: `Browse Nexus`
    },
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('../views/Discover.vue'),
    meta: {
      PageTitle: `Discovery Feed`
    },
  },
  {
    path: '/games/:id',
    name: 'Game Details',
    component: () => import('../views/GameDetails.vue'),
    props: true,
    meta: {
      PageTitle: `Game Details`
    }
  },
  // {
  //   path: '/wishlist',
  //   name: 'Wishlist',
  //   component: () => import('../views/Wishlist.vue'),
  //   meta: {
  //     PageTitle: `Wishlist`
  //   }
  // },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      PageTitle: `Cart`
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      PageTitle: `404 Not Found`
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
});

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.PageTitle}`;
  next();
})

export default router;