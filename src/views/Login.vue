<template>
  <div class="login">
    <div class="login-container">
      <div class="login-form">
        <div class="form-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your Elite Barber Shop account</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input 
              type="email" 
              v-model="loginData.email" 
              class="form-input" 
              placeholder="Enter your email"
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="loginData.password" 
                class="form-input" 
                placeholder="Enter your password"
                required 
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkmark"></span>
              Remember me
            </label>
            <router-link to="/forgot-password" class="forgot-link">
              Forgot Password?
            </router-link>
          </div>

          <button type="submit" class="btn btn-primary login-btn" :disabled="isLoading">
            <span v-if="!isLoading">Sign In</span>
            <span v-else>Signing In...</span>
            <i class="fas fa-arrow-right" v-if="!isLoading"></i>
            <i class="fas fa-spinner fa-spin" v-else></i>
          </button>
        </form>

        <div class="form-divider">
          <span>or</span>
        </div>

        <div class="demo-accounts">
          <h3>Demo Accounts</h3>
          <p>Try the app with these demo accounts:</p>
          <div class="demo-buttons">
            <button @click="loginAsDemo('customer')" class="btn btn-secondary demo-btn">
              <i class="fas fa-user"></i>
              Login as Customer
            </button>
            <button @click="loginAsDemo('barber')" class="btn btn-secondary demo-btn">
              <i class="fas fa-cut"></i>
              Login as Barber
            </button>
            <button @click="loginAsDemo('admin')" class="btn btn-secondary demo-btn">
              <i class="fas fa-crown"></i>
              Login as Admin
            </button>
          </div>
        </div>

        <div class="form-footer">
          <p>Don't have an account? 
            <router-link to="/register" class="register-link">Sign up here</router-link>
          </p>
        </div>
      </div>

      <div class="login-image">
        <img src="@/assets/images/inside barber shop.jpg" alt="Elite Barber Shop Interior" />
        <div class="image-overlay">
          <div class="overlay-content">
            <h2>Elite Barber Shop</h2>
            <p>Where Style Meets Excellence</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginData = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Frontend-only login simulation
  const userData = {
    id: 1,
    name: 'John Doe',
    email: loginData.value.email,
    role: 'customer'
  }
  
  // Store user data in localStorage
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('user', JSON.stringify(userData))
  localStorage.setItem('token', 'demo-token-' + Date.now())
  
  isLoading.value = false
  
  // Redirect to customer dashboard
  router.push('/customer-dashboard')
}

const loginAsDemo = async (role) => {
  isLoading.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const demoUsers = {
    customer: {
      id: 1,
      name: 'Demo Customer',
      email: 'customer@demo.com',
      role: 'customer'
    },
    barber: {
      id: 2,
      name: 'Demo Barber',
      email: 'barber@demo.com',
      role: 'barber'
    },
    admin: {
      id: 3,
      name: 'Demo Admin',
      email: 'admin@demo.com',
      role: 'admin'
    }
  }
  
  const userData = demoUsers[role]
  
  // Store user data in localStorage
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('user', JSON.stringify(userData))
  localStorage.setItem('token', 'demo-token-' + Date.now())
  
  isLoading.value = false
  
  // Redirect based on role
  if (role === 'admin') {
    router.push('/admin-dashboard')
  } else if (role === 'barber') {
    router.push('/employee-dashboard')
  } else {
    router.push('/customer-dashboard')
  }
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  width: 100%;
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 20px 40px var(--shadow-color);
}

.login-form {
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.form-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.form-header p {
  color: var(--text-secondary);
  font-size: 1rem;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-sm);
}

.password-toggle:hover {
  color: var(--accent-primary);
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
  gap: var(--spacing-sm);
  cursor: pointer;
  color: var(--text-secondary);
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-sm);
  position: relative;
  transition: all var(--transition-normal);
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 2px;
  color: var(--bg-primary);
  font-size: 12px;
  font-weight: bold;
}

.forgot-link {
  color: var(--accent-primary);
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-link:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.form-divider {
  text-align: center;
  margin: var(--spacing-xl) 0;
  position: relative;
}

.form-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border-color);
}

.form-divider span {
  background: var(--card-bg);
  padding: 0 var(--spacing-md);
  color: var(--text-secondary);
}

.demo-accounts {
  margin-bottom: var(--spacing-xl);
}

.demo-accounts h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.demo-accounts p {
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-lg);
  font-size: 0.9rem;
}

.demo-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.demo-btn {
  width: 100%;
  justify-content: center;
  font-size: 0.9rem;
}

.form-footer {
  text-align: center;
}

.form-footer p {
  color: var(--text-secondary);
}

.register-link {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 600;
}

.register-link:hover {
  text-decoration: underline;
}

.login-image {
  position: relative;
  overflow: hidden;
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
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.7) 0%, rgba(212, 175, 55, 0.3) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.overlay-content p {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
  
  .login-image {
    display: none;
  }
  
  .form-options {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: flex-start;
  }
}
</style>
