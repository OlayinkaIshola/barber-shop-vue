<template>
  <div class="manager-login">
    <div class="login-container">
      <div class="login-form">
        <div class="form-header">
          <div class="manager-logo">
            <i class="fas fa-user-tie"></i>
          </div>
          <h1>Manager Portal</h1>
          <p>Administrative access for Elite Barber Shop management</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form-content">
          <div class="form-group">
            <label for="managerId">Manager ID</label>
            <div class="input-group">
              <i class="fas fa-id-badge input-icon"></i>
              <input
                type="text"
                id="managerId"
                v-model="loginData.managerId"
                @blur="validateManagerIdField"
                :class="{ 'error': errors.managerId }"
                placeholder="Enter your manager ID"
                required
              />
            </div>
            <span v-if="errors.managerId" class="error-message">{{ errors.managerId }}</span>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-group">
              <i class="fas fa-lock input-icon"></i>
              <input
                type="password"
                id="password"
                v-model="loginData.password"
                @blur="validatePasswordField"
                :class="{ 'error': errors.password }"
                placeholder="Enter your password"
                required
              />
            </div>
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="loginData.rememberMe">
              <span class="checkmark"></span>
              Remember me
            </label>
            <router-link to="/forgot-password" class="forgot-link">
              Forgot Password?
            </router-link>
          </div>

          <button type="submit" class="login-btn" :disabled="isLoading">
            <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-sign-in-alt"></i>
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="login-footer">
          <p>Need help? <a href="mailto:admin@elitebarbershop.com">Contact IT Support</a></p>
        </div>
      </div>

      <div class="login-image">
        <img :src="require('@/assets/images/DiMarcos-Barber-Shop-2.jpg')" alt="Manager Office" />
        <div class="image-overlay">
          <div class="overlay-content">
            <h2>Management Portal</h2>
            <p>Oversee operations, manage staff, and drive business growth</p>
            <div class="features-list">
              <div class="feature">
                <i class="fas fa-chart-bar"></i>
                <span>Business Analytics</span>
              </div>
              <div class="feature">
                <i class="fas fa-users-cog"></i>
                <span>Staff Management</span>
              </div>
              <div class="feature">
                <i class="fas fa-dollar-sign"></i>
                <span>Financial Reports</span>
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

const router = useRouter()

// Composables
const { validateField, commonRules } = useFormValidation()
const { handleSubmit, showSuccessToast, showErrorToast } = useErrorHandler()

// Reactive data
const loginData = reactive({
  managerId: '',
  password: '',
  rememberMe: false
})

const errors = reactive({})
const isLoading = ref(false)

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
  managerId: commonRules.required,
  password: commonRules.required
}

// Field validation methods
const validateManagerIdField = () => {
  validateField('managerId', loginData.managerId, validationRules.managerId, loginData)
}

const validatePasswordField = () => {
  validateField('password', loginData.password, validationRules.password, loginData)
}

const handleLogin = async () => {
  const result = await handleSubmit(loginData, validationRules, async (formData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Manager authentication logic
      const userData = {
        id: 3,
        name: 'Manager',
        email: formData.managerId.includes('@') ? formData.managerId : `${formData.managerId}@elitebarbershop.com`,
        role: 'manager',
        managerId: formData.managerId,
        isManager: true
      }
      
      // Store user data in localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', 'manager-token-' + Date.now())
      
      showSuccessToast('Welcome to the management portal!')
      
      // Redirect to admin dashboard (managers use admin dashboard)
      router.push('/admin-dashboard')
      
    } catch (error) {
      showErrorToast('Login failed. Please check your credentials.')
      throw error
    }
  })

  if (result.success) {
    // Login successful
    console.log('Manager login successful')
  } else {
    // Handle validation errors
    Object.assign(errors, result.errors)
  }
}
</script>

<style scoped>
.manager-login {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.login-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  background: var(--bg-primary);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px var(--shadow-color);
  min-height: 600px;
}

.login-form {
  flex: 1;
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.manager-logo {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  color: white;
  font-size: 2rem;
}

.form-header h1 {
  color: var(--text-primary);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.form-header p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.login-form-content {
  flex: 1;
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
  font-weight: 600;
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  z-index: 1;
}

.input-group input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-bg);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.input-group input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: var(--spacing-xs);
  display: block;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.checkbox-label {
  display: flex;
  align-items: center;
  color: var(--text-secondary);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  margin-right: var(--spacing-sm);
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
}

.forgot-link {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: var(--accent-secondary);
}

.login-btn {
  width: 100%;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.login-footer p {
  color: var(--text-secondary);
  margin: 0;
}

.login-footer a {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 600;
}

.login-footer a:hover {
  color: var(--accent-secondary);
}

.login-image {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.8) 0%, rgba(184, 134, 11, 0.8) 100%);
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
