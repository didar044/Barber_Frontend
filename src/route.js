// src/router.js
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Dashboard from './components/Dashboard/Dashboard.vue'
import ShiftsList from './components/Views/Barbers/Shift/ShiftsList.vue'
import AddShift from './components/Views/Barbers/Shift/AddShift.vue'
import EditShift from './components/Views/Barbers/Shift/EditShift.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/shiftslist', component: ShiftsList },
  { path: '/addshifts', component: AddShift },
  { path: '/editshifts/:id', component: EditShift },
]

const router = createRouter({
  history: import.meta.env.PROD ? createWebHashHistory() : createWebHistory(),
  routes,
})

export default router
