<template>
  <div id="app">
    <nav
      v-if="showNavigation"
      class="navbar"
      :class="{ 'nav-hidden': !showNavigation }"
    >
      <div class="nav-left">
        <button v-if="showBackButton" @click="goBack" class="back-nav-btn">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="nav-brand">
          <h2>✂️ Elite Barber Shop</h2>
        </div>
      </div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/services">Services</router-link>
        <router-link to="/stylists">Our Team</router-link>
        <router-link v-if="isLoggedIn && userRole === 'admin'" to="/admin-dashboard" class="dashboard-link">Admin Dashboard</router-link>
        <router-link v-if="isLoggedIn && (userRole === 'barber' || userRole === 'employee')" to="/employee-dashboard" class="dashboard-link">Dashboard</router-link>
        <router-link v-if="isLoggedIn" to="/customer-dashboard" class="dashboard-link">My Dashboard</router-link>
        <router-link v-if="!isLoggedIn" to="/register" class="register-link">Register</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="login-link">Login</router-link>
        <button v-if="isLoggedIn" @click="logout" class="logout-btn">Logout</button>
        <button @click="toggleTheme" class="theme-toggle-btn" :title="`Switch to ${isDark ? 'light' : 'dark'} mode`">
          <i :class="themeIcon"></i>
        </button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from './composables/useTheme'

const route = useRoute()
const router = useRouter()
const { isDark, themeIcon, toggleTheme, initializeTheme } = useTheme()

const isLoggedIn = ref(false)
const userRole = ref('')

// Pages where navigation should be hidden
const hiddenNavPages = ['/booking', '/payment', '/payment-success', '/register', '/registration-success', '/login', '/forgot-password']

// Check login status (frontend only - using localStorage)
const checkLoginStatus = () => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  if (isLoggedIn.value) {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        userRole.value = user.role || 'customer'
      } catch (error) {
        console.error('Error parsing user data:', error)
        userRole.value = 'customer'
      }
    }
  } else {
    userRole.value = ''
  }
}

// Logout function
const logout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  isLoggedIn.value = false
  userRole.value = ''
  router.push('/')
}

const showNavigation = computed(() => {
  return !hiddenNavPages.includes(route.path)
})

const showBackButton = computed(() => {
  return showNavigation.value && route.path !== '/'
})

// Navigation methods
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

onMounted(() => {
  // Initialize theme
  initializeTheme()
  
  // Check login status on app load
  checkLoginStatus()
})
</script>

<style>
/* Global styles will be imported from styles.css */
</style>
