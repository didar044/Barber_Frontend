// src/router.js
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Dashboard from './components/Dashboard/Dashboard.vue'
import ShiftsList from './components/Views/Barbers/Shift/ShiftsList.vue'
import AddShift from './components/Views/Barbers/Shift/AddShift.vue'
import EditShift from './components/Views/Barbers/Shift/EditShift.vue'
import BarberList from './components/Views/Barbers/Barber/BarberList.vue'
import AddBarber from './components/Views/Barbers/Barber/AddBarber.vue'
import EditBarber from './components/Views/Barbers/Barber/EditBarber.vue'
import ShowBarber from './components/Views/Barbers/Barber/ShowBarber.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/shiftslist', component: ShiftsList },
  { path: '/addshifts', component: AddShift },
  { path: '/editshifts/:id', component: EditShift },

  { path: '/barberlist', component: BarberList },
  { path: '/addbarbers', component: AddBarber },
  { path: '/editbarbers/:id', component: EditBarber },
  { path: '/showbarbers/:id', component: ShowBarber },
]

const router = createRouter({
  history: import.meta.env.PROD ? createWebHashHistory() : createWebHistory(),
  routes,
})

export default router
