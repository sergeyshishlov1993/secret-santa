import { createRouter, createWebHistory } from 'vue-router'
import Game from '../views/Game.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Game },
        { path: '/admin', component: Admin }
    ]
})

export default router