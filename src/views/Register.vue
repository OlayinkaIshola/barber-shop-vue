<template>
  <div class="register">
    <div class="register-container">
      <div class="register-form">
        <div class="form-header">
          <h1>Join Elite Barber Shop</h1>
          <p>Create your account and start booking premium services</p>
        </div>

        <form @submit.prevent="handleRegister">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">First Name</label>
              <input 
                type="text" 
                v-model="registerData.firstName" 
                class="form-input" 
                placeholder="Enter your first name"
                required 
              />
            </div>
            <div class="form-group">
              <label class="form-label">Last Name</label>
              <input 
                type="text" 
                v-model="registerData.lastName" 
                class="form-input" 
                placeholder="Enter your last name"
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input 
              type="email" 
              v-model="registerData.email" 
              class="form-input" 
              placeholder="Enter your email"
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input 
              type="tel" 
              v-model="registerData.phone" 
              class="form-input" 
              placeholder="Enter your phone number"
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="registerData.password" 
                class="form-input" 
                placeholder="Create a password"
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
            <div class="password-strength">
              <div class="strength-bar">
                <div class="strength-fill" :class="passwordStrength.class" :style="{ width: passwordStrength.width }"></div>
              </div>
              <span class="strength-text">{{ passwordStrength.text }}</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <input 
              type="password" 
              v-model="registerData.confirmPassword" 
              class="form-input" 
              placeholder="Confirm your password"
              required 
            />
            <div class="password-match" v-if="registerData.confirmPassword">
              <i :class="passwordsMatch ? 'fas fa-check text-success' : 'fas fa-times text-error'"></i>
              <span :class="passwordsMatch ? 'text-success' : 'text-error'">
                {{ passwordsMatch ? 'Passwords match' : 'Passwords do not match' }}
              </span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Account Type</label>
            <div class="account-types">
              <label class="radio-label">
                <input type="radio" v-model="registerData.accountType" value="customer" />
                <span class="radio-custom"></span>
                <div class="radio-content">
                  <i class="fas fa-user"></i>
                  <span>Customer</span>
                  <small>Book appointments and manage your visits</small>
                </div>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="registerData.accountType" value="barber" />
                <span class="radio-custom"></span>
                <div class="radio-content">
                  <i class="fas fa-cut"></i>
                  <span>Barber</span>
                  <small>Manage appointments and showcase your skills</small>
                </div>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="agreeToTerms" required />
              <span class="checkmark"></span>
              I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" class="btn btn-primary register-btn" :disabled="!canSubmit || isLoading">
            <span v-if="!isLoading">Create Account</span>
            <span v-else>Creating Account...</span>
            <i class="fas fa-user-plus" v-if="!isLoading"></i>
            <i class="fas fa-spinner fa-spin" v-else></i>
          </button>
        </form>

        <div class="form-footer">
          <p>Already have an account? 
            <router-link to="/login" class="login-link">Sign in here</router-link>
          </p>
        </div>
      </div>

      <div class="register-image">
        <img src="@/assets/images/man-makes-stowage-barbershop_1311477-31668.avif" alt="Professional Barber at Work" />
        <div class="image-overlay">
          <div class="overlay-content">
            <h2>Start Your Journey</h2>
            <p>Join thousands of satisfied customers</p>
            <div class="stats">
              <div class="stat">
                <span class="stat-number">5000+</span>
                <span class="stat-label">Happy Customers</span>
              </div>
              <div class="stat">
                <span class="stat-number">50+</span>
                <span class="stat-label">Expert Barbers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const registerData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  accountType: 'customer'
})

const showPassword = ref(false)
const agreeToTerms = ref(false)
const isLoading = ref(false)

const passwordsMatch = computed(() => {
  return registerData.value.password === registerData.value.confirmPassword
})

const passwordStrength = computed(() => {
  const password = registerData.value.password
  if (!password) return { class: '', width: '0%', text: '' }
  
  let score = 0
  if (password.length >= 8) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  const strengths = [
    { class: 'weak', width: '20%', text: 'Very Weak' },
    { class: 'weak', width: '40%', text: 'Weak' },
    { class: 'medium', width: '60%', text: 'Medium' },
    { class: 'strong', width: '80%', text: 'Strong' },
    { class: 'strong', width: '100%', text: 'Very Strong' }
  ]
  
  return strengths[score - 1] || strengths[0]
})

const canSubmit = computed(() => {
  return registerData.value.firstName &&
         registerData.value.lastName &&
         registerData.value.email &&
         registerData.value.phone &&
         registerData.value.password &&
         passwordsMatch.value &&
         registerData.value.accountType &&
         agreeToTerms.value
})

const handleRegister = async () => {
  if (!canSubmit.value) return
  
  isLoading.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Frontend-only registration simulation
  const userData = {
    id: Date.now(),
    name: `${registerData.value.firstName} ${registerData.value.lastName}`,
    email: registerData.value.email,
    phone: registerData.value.phone,
    role: registerData.value.accountType
  }
  
  // Store user data in localStorage
  localStorage.setItem('registrationData', JSON.stringify(userData))
  
  isLoading.value = false
  
  // Redirect to registration success page
  router.push('/registration-success')
}
</script>

<style scoped>
.register {
  min-height: 100vh;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.register-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  width: 100%;
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 20px 40px var(--shadow-color);
}

.register-form {
  padding: var(--spacing-2xl);
  overflow-y: auto;
  max-height: 100vh;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
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

.password-strength {
  margin-top: var(--spacing-sm);
}

.strength-bar {
  height: 4px;
  background: var(--border-color);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: var(--spacing-xs);
}

.strength-fill {
  height: 100%;
  transition: all var(--transition-normal);
}

.strength-fill.weak { background: #e74c3c; }
.strength-fill.medium { background: #f39c12; }
.strength-fill.strong { background: #27ae60; }

.strength-text {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.password-match {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
  font-size: 0.9rem;
}

.text-success { color: #27ae60; }
.text-error { color: #e74c3c; }

.account-types {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.radio-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.radio-label:hover,
.radio-label:has(input:checked) {
  border-color: var(--accent-primary);
  background: var(--button-hover);
}

.radio-label input[type="radio"] {
  display: none;
}

.radio-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  position: relative;
  transition: all var(--transition-normal);
}

.radio-label input[type="radio"]:checked + .radio-custom {
  border-color: var(--accent-primary);
}

.radio-label input[type="radio"]:checked + .radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: var(--accent-primary);
  border-radius: 50%;
}

.radio-content {
  flex: 1;
}

.radio-content i {
  font-size: 1.2rem;
  color: var(--accent-primary);
  margin-right: var(--spacing-sm);
}

.radio-content span {
  font-weight: 600;
  color: var(--text-primary);
}

.radio-content small {
  display: block;
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  cursor: pointer;
  color: var(--text-secondary);
  line-height: 1.5;
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
  flex-shrink: 0;
  margin-top: 2px;
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

.terms-link {
  color: var(--accent-primary);
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.register-btn {
  width: 100%;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.form-footer {
  text-align: center;
}

.form-footer p {
  color: var(--text-secondary);
}

.login-link {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 600;
}

.login-link:hover {
  text-decoration: underline;
}

.register-image {
  position: relative;
  overflow: hidden;
}

.register-image img {
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
  margin-bottom: var(--spacing-xl);
}

.stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-2xl);
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-primary);
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .register-container {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
  
  .register-image {
    display: none;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .stats {
    flex-direction: column;
    gap: var(--spacing-lg);
  }
}
</style>
