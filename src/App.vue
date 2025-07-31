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
          <div class="logo-container">
            <img src="@/assets/images/inside barber shop.jpg" alt="Elite Barber Shop" class="nav-logo" />
          </div>
          <h2 class="brand-text">
            <span class="typing-text" ref="typingText"></span>
            <span class="cursor" :class="{ 'blink': showCursor }">|</span>
          </h2>
        </div>
      </div>
      <!-- Mobile Menu Toggle -->
      <button class="mobile-menu-toggle" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Desktop Navigation -->
      <div class="nav-links desktop-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/services">Services</router-link>
        <router-link to="/stylists">Our Team</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/blog">Blog</router-link>
        <router-link v-if="isLoggedIn && userRole === 'admin'" to="/admin-dashboard" class="dashboard-link">Admin Dashboard</router-link>
        <router-link v-if="isLoggedIn && (userRole === 'barber' || userRole === 'employee')" to="/employee-dashboard" class="dashboard-link">Dashboard</router-link>
        <router-link v-if="isLoggedIn" to="/customer-dashboard" class="dashboard-link">My Dashboard</router-link>
        <router-link v-if="isLoggedIn" to="/profile" class="profile-link">Profile</router-link>
        <router-link v-if="!isLoggedIn" to="/register" class="register-link">Register</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="login-link">Login</router-link>
        <button v-if="isLoggedIn" @click="logout" class="logout-btn">Logout</button>
        <button @click="toggleTheme" class="theme-toggle-btn" :title="`Switch to ${isDark ? 'light' : 'dark'} mode`">
          <i :class="themeIcon"></i>
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <div class="mobile-nav-overlay" :class="{ 'active': isMobileMenuOpen }" @click="closeMobileMenu"></div>
      <div class="mobile-nav-menu" :class="{ 'active': isMobileMenuOpen }">
        <div class="mobile-nav-header">
          <div class="mobile-brand">
            <img src="@/assets/images/inside barber shop.jpg" alt="Elite Barber Shop" class="mobile-logo" />
            <span class="mobile-brand-text">Elite Barber Shop</span>
          </div>
          <button class="mobile-close-btn" @click="closeMobileMenu">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="mobile-nav-links">
          <router-link to="/" @click="closeMobileMenu">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </router-link>
          <router-link to="/services" @click="closeMobileMenu">
            <i class="fas fa-cut"></i>
            <span>Services</span>
          </router-link>
          <router-link to="/stylists" @click="closeMobileMenu">
            <i class="fas fa-users"></i>
            <span>Our Team</span>
          </router-link>
          <router-link to="/about" @click="closeMobileMenu">
            <i class="fas fa-info-circle"></i>
            <span>About</span>
          </router-link>
          <router-link to="/contact" @click="closeMobileMenu">
            <i class="fas fa-envelope"></i>
            <span>Contact</span>
          </router-link>
          <router-link to="/blog" @click="closeMobileMenu">
            <i class="fas fa-blog"></i>
            <span>Blog</span>
          </router-link>
          <div v-if="isLoggedIn" class="mobile-nav-divider"></div>
          <router-link v-if="isLoggedIn && userRole === 'admin'" to="/admin-dashboard" @click="closeMobileMenu" class="dashboard-link">
            <i class="fas fa-tachometer-alt"></i>
            <span>Admin Dashboard</span>
          </router-link>
          <router-link v-if="isLoggedIn && (userRole === 'barber' || userRole === 'employee')" to="/employee-dashboard" @click="closeMobileMenu" class="dashboard-link">
            <i class="fas fa-briefcase"></i>
            <span>Dashboard</span>
          </router-link>
          <router-link v-if="isLoggedIn" to="/customer-dashboard" @click="closeMobileMenu" class="dashboard-link">
            <i class="fas fa-user-circle"></i>
            <span>My Dashboard</span>
          </router-link>
          <router-link v-if="isLoggedIn" to="/profile" @click="closeMobileMenu" class="profile-link">
            <i class="fas fa-user-cog"></i>
            <span>Profile</span>
          </router-link>
          <div v-if="!isLoggedIn" class="mobile-nav-divider"></div>
          <router-link v-if="!isLoggedIn" to="/register" @click="closeMobileMenu" class="register-link">
            <i class="fas fa-user-plus"></i>
            <span>Register</span>
          </router-link>
          <router-link v-if="!isLoggedIn" to="/login" @click="closeMobileMenu" class="login-link">
            <i class="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </router-link>
          <div class="mobile-nav-divider"></div>
          <button v-if="isLoggedIn" @click="logout" class="mobile-logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
          <button @click="toggleTheme" class="mobile-theme-btn" :title="`Switch to ${isDark ? 'light' : 'dark'} mode`">
            <i :class="themeIcon"></i>
            <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>
        </div>
      </div>
    </nav>
    <ErrorBoundary>
      <router-view />
    </ErrorBoundary>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from './composables/useTheme'

const route = useRoute()
const router = useRouter()
const { isDark, themeIcon, toggleTheme, initializeTheme } = useTheme()

const isLoggedIn = ref(false)
const userRole = ref('')

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Mobile menu functions
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // Prevent body scroll when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// Typing animation
const typingText = ref(null)
const showCursor = ref(true)
const currentText = ref('')
const isTyping = ref(true)
const typingSpeed = 100
const deletingSpeed = 50
const pauseDuration = 2000

const texts = ['Elite Barber Shop', 'Premium Cuts', 'Style & Excellence', 'Your Look, Our Craft']
let currentIndex = 0
let charIndex = 0
let typingTimeout = null

// Typing animation functions
const typeText = () => {
  const text = texts[currentIndex]

  if (isTyping.value) {
    if (charIndex < text.length) {
      currentText.value = text.substring(0, charIndex + 1)
      charIndex++
      typingTimeout = setTimeout(typeText, typingSpeed)
    } else {
      isTyping.value = false
      typingTimeout = setTimeout(typeText, pauseDuration)
    }
  } else {
    if (charIndex > 0) {
      currentText.value = text.substring(0, charIndex - 1)
      charIndex--
      typingTimeout = setTimeout(typeText, deletingSpeed)
    } else {
      isTyping.value = true
      currentIndex = (currentIndex + 1) % texts.length
      typingTimeout = setTimeout(typeText, typingSpeed)
    }
  }

  if (typingText.value) {
    typingText.value.textContent = currentText.value
  }
}

const startTypingAnimation = () => {
  typeText()

  // Cursor blinking
  setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
}

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

  // Start typing animation
  startTypingAnimation()
})

onUnmounted(() => {
  if (typingTimeout) {
    clearTimeout(typingTimeout)
  }
})
</script>

<style scoped>
/* Navigation Styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  padding: var(--spacing-md) var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

[data-theme="dark"] .navbar {
  background: rgba(0, 0, 0, 0.95);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.logo-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--accent-primary);
}

.nav-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  min-height: 1.5rem;
}

.typing-text {
  display: inline-block;
  min-width: 200px;
}

.cursor {
  color: var(--accent-primary);
  font-weight: 400;
  margin-left: 2px;
  opacity: 1;
  transition: opacity 0.1s ease;
}

.cursor.blink {
  opacity: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--accent-primary);
  background: rgba(212, 175, 55, 0.1);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent-primary);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 80%;
}

.theme-toggle-btn,
.logout-btn,
.back-nav-btn {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.theme-toggle-btn:hover,
.logout-btn:hover,
.back-nav-btn:hover {
  background: var(--button-hover);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-1px);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Navigation animations */
.navbar {
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Mobile Menu Toggle Button */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Navigation Overlay */
.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Mobile Navigation Menu */
.mobile-nav-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 320px;
  max-width: 85vw;
  height: 100vh;
  background: var(--card-bg);
  z-index: 1000;
  transition: right 0.3s ease;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-color);
}

.mobile-nav-menu.active {
  right: 0;
}

.mobile-nav-header {
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.mobile-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.mobile-brand-text {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.mobile-close-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.mobile-close-btn:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.mobile-nav-links {
  flex: 1;
  padding: var(--spacing-lg) 0;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
  scrollbar-width: thin;
  scrollbar-color: var(--accent-primary) transparent;
}

.mobile-nav-links::-webkit-scrollbar {
  width: 4px;
}

.mobile-nav-links::-webkit-scrollbar-track {
  background: transparent;
}

.mobile-nav-links::-webkit-scrollbar-thumb {
  background: var(--accent-primary);
  border-radius: 2px;
}

.mobile-nav-links a,
.mobile-logout-btn,
.mobile-theme-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-xl);
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
}

.mobile-nav-links a:hover,
.mobile-logout-btn:hover,
.mobile-theme-btn:hover {
  background: rgba(212, 175, 55, 0.1);
  color: var(--accent-primary);
}

.mobile-nav-links a.router-link-active {
  background: rgba(212, 175, 55, 0.2);
  color: var(--accent-primary);
  border-right: 3px solid var(--accent-primary);
}

.mobile-nav-links i {
  width: 20px;
  text-align: center;
  font-size: 1.1rem;
}

.mobile-nav-divider {
  height: 1px;
  background: var(--border-color);
  margin: var(--spacing-md) var(--spacing-xl);
}

/* Responsive navigation */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
    position: absolute;
    top: 50%;
    right: var(--spacing-md);
    transform: translateY(-50%);
  }

  .navbar {
    padding: var(--spacing-sm) var(--spacing-md);
    position: relative;
  }

  .nav-left {
    flex: 1;
  }

  .brand-text {
    font-size: 1.2rem;
  }

  .typing-text {
    min-width: 150px;
  }

  .logo-container {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  .mobile-nav-menu {
    width: 280px;
    max-width: 85vw;
  }

  .mobile-brand-text {
    font-size: 1rem;
  }

  .brand-text {
    font-size: 1.1rem;
  }
}

/* Global smooth scroll behavior */
* {
  scroll-behavior: smooth;
}

/* Add padding to body to account for fixed navbar */
body {
  padding-top: 80px;
}
</style>
