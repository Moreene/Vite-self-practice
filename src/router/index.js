import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active',
    routes: [{
        path: '/',
        component: () => import('../views/LoginView.vue')
    }, {
        path: '/product',
        component: () => import('../views/ProductView.vue')
    }]
});

export default router
