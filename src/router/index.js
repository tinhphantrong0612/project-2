import { createRouter, createWebHistory } from "vue-router";
import Mess from '/src/components/mess/Mess.vue'
import Login from '/src/components/login/Login.vue'
const routes = [
    {
        path: '/',
        name: 'Mess',
        component: Mess,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem('token');
            if (token) next('/');
            else next();
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token && to.path != '/login') next('/login');
    else next();
})

export default router;