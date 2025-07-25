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
import ServiceCategoriesList from './components/Views/Service/ServiceCategory/ServiceCategoriesList.vue'
import AddserviceCategory from './components/Views/Service/ServiceCategory/AddserviceCategory.vue'
import EditServiceCategorie from './components/Views/Service/ServiceCategory/EditServiceCategorie.vue'
import ServiceList from './components/Views/Service/Service/ServiceList.vue'
import AddService from './components/Views/Service/Service/AddService.vue'
import EditService from './components/Views/Service/Service/EditService.vue'
import CustomerList from './components/Views/Customer/CustomerList.vue'
import AddCustomer from './components/Views/Customer/AddCustomer.vue'
import EditCustomer from './components/Views/Customer/EditCustomer.vue'
import ShowCustomer from './components/Views/Customer/ShowCustomer.vue'
import AppointmentList from './components/Views/Appointment/AppointmentList.vue'
import AddAppointment from './components/Views/Appointment/AddAppointment.vue'
import TokenAppoinment from './components/Views/Appointment/TokenAppoinment.vue'
import EditAppointment from './components/Views/Appointment/EditAppointment.vue'
import ShowAppointment from './components/Views/Appointment/ShowAppointment.vue'
import AddPayment from './components/Views/Payment/AddPayment.vue'
import Payment from './components/Views/Payment/Payment.vue'
import PaymentList from './components/Views/Payment/PaymentList.vue'
import MoneyReceipt from './components/Views/Payment/MoneyReceipt.vue'
import ExpanseCategorieList from './components/Views/Expense/ExoenseCategorie/ExpanseCategorieList.vue'
import AddExCate from './components/Views/Expense/ExoenseCategorie/AddExCate.vue'
import EditExCat from './components/Views/Expense/ExoenseCategorie/EditExCat.vue'
import ExpenseList from './components/Views/Expense/Expenses/ExpenseList.vue'
import AddEx from './components/Views/Expense/Expenses/AddEx.vue'
import EditExpenses from './components/Views/Expense/Expenses/EditExpenses.vue'
import FeedBack from './components/Views/FeedBack/FeedBack.vue'
import AddFeedBack from './components/Views/FeedBack/AddFeedBack.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/shiftslist', component: ShiftsList },
  { path: '/addshifts', component: AddShift },
  { path: '/editshifts/:id', component: EditShift },

  { path: '/barberlist', component: BarberList },
  { path: '/addbarbers', component: AddBarber },
  { path: '/editbarbers/:id', component: EditBarber },
  { path: '/showbarbers/:id', component: ShowBarber },

  { path: '/servicecategorieslist', component: ServiceCategoriesList },
  { path: '/addservicecategory', component: AddserviceCategory },
  { path: '/editservicecategory/:id', component: EditServiceCategorie },
  
  { path: '/servicelist', component: ServiceList },
  { path: '/addservice', component: AddService },
  { path: '/editservice/:id', component: EditService },

  { path: '/customerlist', component: CustomerList },
  { path: '/addcustomer', component: AddCustomer },
  { path: '/editcustomer/:id', component: EditCustomer },
  { path: '/showcustomer/:id', component: ShowCustomer },

  { path: '/appoinmentlists/', component: AppointmentList },
  { path: '/addappoinments/', component: AddAppointment },
  { path: '/tokenappoinments/:id', component: TokenAppoinment,props: true },
  { path: '/editappoinments/:id', component: EditAppointment, props: true },
  { path: '/showappoinments/:id', component: ShowAppointment, props: true },

  { path: '/addpayments/', component: AddPayment },
  { path: '/payments/:id', component: Payment },
  { path: '/paymentlists/', component: PaymentList },
  { path: '/moneyreceipts/:id', component: MoneyReceipt },

  { path: '/expansecategorielist', component: ExpanseCategorieList },
  { path: '/addexpansecategorie', component: AddExCate },
  { path: '/editexpansecategorie/:id', component: EditExCat },

  { path: '/expanselists', component: ExpenseList },
  { path: '/addexpanses', component: AddEx },
  { path: '/editexpanses/:id', component: EditExpenses },

  { path: '/feedbacks', component: FeedBack },
  { path: '/addfeedbacks', component: AddFeedBack },


]

const router = createRouter({
  history: import.meta.env.PROD ? createWebHashHistory() : createWebHistory(),
  routes,
})

export default router
