<template>
  <div class="forgot-password">
    <div class="forgot-container">
      <div class="forgot-form">
        <div class="form-header">
          <i class="fas fa-key"></i>
          <h1>Reset Your Password</h1>
          <p>Enter your email address and we'll send you a link to reset your password</p>
        </div>

        <form @submit.prevent="handleForgotPassword" v-if="!emailSent">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input 
              type="email" 
              v-model="email" 
              class="form-input" 
              placeholder="Enter your email address"
              required 
            />
          </div>

          <button type="submit" class="btn btn-primary forgot-btn" :disabled="isLoading">
            <span v-if="!isLoading">Send Reset Link</span>
            <span v-else>Sending...</span>
            <i class="fas fa-paper-plane" v-if="!isLoading"></i>
            <i class="fas fa-spinner fa-spin" v-else></i>
          </button>
        </form>

        <div class="success-message" v-if="emailSent">
          <i class="fas fa-check-circle"></i>
          <h2>Check Your Email</h2>
          <p>We've sent a password reset link to <strong>{{ email }}</strong></p>
          <p class="note">Didn't receive the email? Check your spam folder or try again.</p>
          <button @click="resetForm" class="btn btn-secondary">
            Try Different Email
          </button>
        </div>

        <div class="form-footer">
          <p>Remember your password? 
            <router-link to="/login" class="login-link">Sign in here</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const isLoading = ref(false)
const emailSent = ref(false)

const handleForgotPassword = async () => {
  isLoading.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Frontend-only simulation
  emailSent.value = true
  isLoading.value = false
}

const resetForm = () => {
  email.value = ''
  emailSent.value = false
}
</script>

<style scoped>
.forgot-password {
  min-height: 100vh;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.forgot-container {
  max-width: 400px;
  width: 100%;
}

.forgot-form {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 20px 40px var(--shadow-color);
}

.form-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.form-header i {
  font-size: 3rem;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-lg);
}

.form-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.form-header p {
  color: var(--text-secondary);
  line-height: 1.5;
}

.forgot-btn {
  width: 100%;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.success-message {
  text-align: center;
}

.success-message i {
  font-size: 3rem;
  color: #27ae60;
  margin-bottom: var(--spacing-lg);
}

.success-message h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.success-message p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
}

.success-message .note {
  font-size: 0.9rem;
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
</style>
