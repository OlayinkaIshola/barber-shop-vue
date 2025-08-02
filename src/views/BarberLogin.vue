<template>
  <div class="barber-login">
    <NavigationControls />

    <div class="login-container">
      <div class="login-form">
        <div class="form-header">
          <div class="barber-logo">
            <i class="fas fa-cut"></i>
          </div>
          <h1>Barber Portal</h1>
          <p>Professional access for Elite Barber Shop staff</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="form-label">Staff ID / Email</label>
            <div class="input-with-icon">
              <i class="fas fa-id-badge input-icon"></i>
              <input 
                type="text" 
                v-model="loginData.staffId" 
                :class="['form-input', { 'error': hasFieldError('staffId') }]"
                placeholder="Enter your staff ID or email"
                @blur="touchField('staffId')"
                @input="validateStaffIdField"
              />
            </div>
            <div v-if="hasFieldError('staffId') && isFieldTouched('staffId')" class="error-message">
              {{ getFieldError('staffId') }}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="input-with-icon password-input">
              <i class="fas fa-lock input-icon"></i>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="loginData.password" 
                :class="['form-input', { 'error': hasFieldError('password') }]"
                placeholder="Enter your password"
                @blur="touchField('password')"
                @input="validatePasswordField"
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div v-if="hasFieldError('password') && isFieldTouched('password')" class="error-message">
              {{ getFieldError('password') }}
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkmark"></span>
              Keep me signed in
            </label>
            <router-link to="/forgot-password" class="forgot-link">
              Forgot Password?
            </router-link>
          </div>

          <button type="submit" class="btn btn-primary login-btn" :disabled="isSubmitting || hasErrors">
            <span v-if="!isSubmitting">Sign In to Portal</span>
            <span v-else>Signing In...</span>
            <i class="fas fa-sign-in-alt" v-if="!isSubmitting"></i>
            <i class="fas fa-spinner fa-spin" v-else></i>
          </button>
        </form>

        <div class="form-divider">
          <span>or</span>
        </div>

        <div class="demo-accounts">
          <h3>Demo Staff Accounts</h3>
          <p>Try the portal with these demo accounts:</p>
          <div class="demo-buttons">
            <button @click="loginAsDemo('barber')" class="btn btn-secondary demo-btn">
              <i class="fas fa-cut"></i>
              Login as Barber
            </button>
            <button @click="loginAsDemo('manager')" class="btn btn-secondary demo-btn">
              <i class="fas fa-user-tie"></i>
              Login as Manager
            </button>
            <button @click="loginAsDemo('admin')" class="btn btn-secondary demo-btn">
              <i class="fas fa-crown"></i>
              Login as Admin
            </button>
          </div>
        </div>

        <div class="form-footer">
          <p>Customer? 
            <router-link to="/login" class="customer-link">Sign in here</router-link>
          </p>
          <p class="help-text">
            Need help? Contact your manager or IT support
          </p>
        </div>
      </div>

      <div class="login-image">
        <img :src="require('@/assets/images/AE-Barber-Shop-Baldwin-5.jpg')" alt="Professional Barber at Work" />
        <div class="image-overlay">
          <div class="overlay-content">
            <h2>Professional Portal</h2>
            <p>Manage appointments, clients, and your schedule</p>
            <div class="features-list">
              <div class="feature">
                <i class="fas fa-calendar-check"></i>
                <span>Schedule Management</span>
              </div>
              <div class="feature">
                <i class="fas fa-users"></i>
                <span>Client Management</span>
              </div>
              <div class="feature">
                <i class="fas fa-chart-line"></i>
                <span>Performance Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useFormValidation } from '../composables/useFormValidation'
import { useErrorHandler } from '../composables/useErrorHandler'
import { useTheme } from '../composables/useTheme'
import NavigationControls from '@/components/NavigationControls.vue'

const router = useRouter()
const { isDark, themeIcon, toggleTheme } = useTheme()
const { 
  errors, 
  touched, 
  isSubmitting, 
  validateField, 
  touchField, 
  getFieldError, 
  hasFieldError, 
  isFieldTouched, 
  handleSubmit,
  commonRules 
} = useFormValidation()

const { showSuccessToast, showErrorToast } = useErrorHandler()

const loginData = reactive({
  staffId: '',
  password: ''
})

const showPassword = ref(false)
const rememberMe = ref(false)

// Navigation methods
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const goHome = () => {
  router.push('/')
}

// Validation rules
const validationRules = {
  staffId: commonRules.required,
  password: commonRules.required
}

// Field validation methods
const validateStaffIdField = () => {
  validateField('staffId', loginData.staffId, validationRules.staffId, loginData)
}

const validatePasswordField = () => {
  validateField('password', loginData.password, validationRules.password, loginData)
}

const handleLogin = async () => {
  const result = await handleSubmit(loginData, validationRules, async (formData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Determine role based on staff ID
      let role = 'barber'
      if (formData.staffId.toLowerCase().includes('admin') || formData.staffId.toLowerCase().includes('manager')) {
        role = 'admin'
      } else if (formData.staffId.toLowerCase().includes('manager')) {
        role = 'manager'
      }
      
      // Frontend-only login simulation
      const userData = {
        id: 2,
        name: 'Staff Member',
        email: formData.staffId.includes('@') ? formData.staffId : `${formData.staffId}@elitebarbershop.com`,
        role: role,
        staffId: formData.staffId,
        isStaff: true
      }
      
      // Store user data in localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', 'barber-token-' + Date.now())
      
      showSuccessToast('Welcome to the staff portal!')
      
      // Redirect based on role
      if (role === 'admin') {
        router.push('/admin-dashboard')
      } else {
        router.push('/employee-dashboard')
      }
      
    } catch (error) {
      showErrorToast('Login failed. Please check your credentials.')
      throw error
    }
  })

  if (!result.success && result.errors) {
    showErrorToast('Please fix the form errors and try again.')
  }
}

const loginAsDemo = async (role) => {
  const demoUsers = {
    barber: {
      id: 2,
      name: 'Demo Barber',
      email: 'barber@elitebarbershop.com',
      role: 'barber',
      staffId: 'BARBER001',
      isStaff: true
    },
    manager: {
      id: 3,
      name: 'Demo Manager',
      email: 'manager@elitebarbershop.com',
      role: 'manager',
      staffId: 'MGR001',
      isStaff: true
    },
    admin: {
      id: 4,
      name: 'Demo Admin',
      email: 'admin@elitebarbershop.com',
      role: 'admin',
      staffId: 'ADMIN001',
      isStaff: true
    }
  }

  const userData = demoUsers[role]
  
  // Store user data in localStorage
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('user', JSON.stringify(userData))
  localStorage.setItem('token', `${role}-token-` + Date.now())
  
  showSuccessToast(`Logged in as Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`)
  
  // Redirect based on role
  if (role === 'admin' || role === 'manager') {
    router.push('/admin-dashboard')
  } else {
    router.push('/employee-dashboard')
  }
}
</script>

<script>
export default {
  components: {
    NavigationControls
  }
}
</script>

<style scoped>
.barber-login {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
}

[data-theme="light"] .barber-login {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

/* Navigation Controls */
.nav-controls {
  position: fixed;
  top: var(--spacing-lg);
  left: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-sm);
  z-index: 1000;
}

.control-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  backdrop-filter: blur(10px);
}

.control-btn:hover {
  background: var(--accent-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

/* Rest of the styles similar to Login.vue but with barber-specific theming */
.login-container {
  display: flex;
  min-height: 100vh;
  align-items: center;
}

.login-form {
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
  padding: var(--spacing-2xl);
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
}

.form-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.barber-logo {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-primary), #f39c12);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  font-size: 2rem;
  color: white;
}

.form-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.form-header p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* Input styles */
.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: var(--spacing-md);
  color: var(--text-secondary);
  z-index: 1;
  pointer-events: none;
  transition: color var(--transition-normal);
}

.input-with-icon .form-input {
  padding-left: calc(var(--spacing-md) + 20px + var(--spacing-md));
}

.password-input .form-input {
  padding-right: 50px;
}

.password-toggle {
  position: absolute;
  right: var(--spacing-md);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
  z-index: 2;
}

.password-toggle:hover {
  color: var(--accent-primary);
  background: rgba(212, 175, 55, 0.1);
}

.login-image {
  flex: 1;
  position: relative;
  min-height: 100vh;
  background: var(--bg-secondary);
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.8) 0%, rgba(212, 175, 55, 0.4) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  text-align: center;
  color: white;
  padding: var(--spacing-2xl);
}

.overlay-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
}

.features-list {
  margin-top: var(--spacing-2xl);
}

.feature {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  font-size: 1.1rem;
}

.feature i {
  color: var(--accent-primary);
  font-size: 1.3rem;
}

/* Responsive */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .login-image {
    min-height: 40vh;
  }
}
</style>
