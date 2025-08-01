import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Services from '../views/Services.vue'
import Stylists from '../views/Stylists.vue'
import Booking from '../views/Booking.vue'
import Payment from '../views/Payment.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'
import Register from '../views/Register.vue'
import RegistrationSuccess from '../views/RegistrationSuccess.vue'
import Login from '../views/Login.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import EmployeeDashboard from '../views/EmployeeDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import CustomerDashboard from '../views/CustomerDashboard.vue'
import BookingHistory from '../views/BookingHistory.vue'
import Reviews from '../views/Reviews.vue'
import Contact from '../views/Contact.vue'
import About from '../views/About.vue'
import Profile from '../views/Profile.vue'
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'

// Frontend-only route guard function (simplified)
const requireAuth = (to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  if (isLoggedIn) {
    next()
  } else {
    next('/login')
  }
}

const requireAdmin = (to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const userData = localStorage.getItem('user')

  if (isLoggedIn && userData) {
    try {
      const user = JSON.parse(userData)
      if (user.role === 'admin') {
        next()
      } else {
        next('/')
      }
    } catch (error) {
      next('/login')
    }
  } else {
    next('/login')
  }
}

const requireBarber = (to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const userData = localStorage.getItem('user')

  if (isLoggedIn && userData) {
    try {
      const user = JSON.parse(userData)
      if (user.role === 'barber' || user.role === 'admin') {
        next()
      } else {
        next('/')
      }
    } catch (error) {
      next('/login')
    }
  } else {
    next('/login')
  }
}

const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services },
  { path: '/stylists', component: Stylists },
  { path: '/booking', component: Booking },
  { path: '/payment', component: Payment },
  { path: '/payment-success', component: PaymentSuccess },
  { path: '/register', component: Register },
  { path: '/registration-success', component: RegistrationSuccess },
  { path: '/login', component: Login },
  { path: '/barber-login', component: () => import('../views/BarberLogin.vue') },
  { path: '/manager-login', component: () => import('../views/ManagerLogin.vue') },
  { path: '/barber-dashboard', component: () => import('../views/BarberDashboard.vue'), beforeEnter: requireBarber },
  { path: '/forgot-password', component: ForgotPassword },
  {
    path: '/employee-dashboard',
    component: EmployeeDashboard,
    beforeEnter: requireBarber
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
    beforeEnter: requireAdmin
  },
  {
    path: '/customer-dashboard',
    component: CustomerDashboard,
    beforeEnter: requireAuth
  },
  {
    path: '/booking-history',
    component: BookingHistory,
    beforeEnter: requireAuth
  },
  {
    path: '/reviews',
    component: Reviews
  },
  {
    path: '/blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/view-schedule',
    component: () => import('../views/ViewSchedule.vue')
  },
  {
    path: '/contact',
    component: Contact
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/profile',
    component: Profile,
    beforeEnter: requireAuth
  },
  {
    path: '/privacy',
    component: Privacy
  },
  {
    path: '/terms',
    component: Terms
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
