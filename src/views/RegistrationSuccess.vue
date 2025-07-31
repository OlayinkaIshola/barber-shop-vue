<template>
  <div class="registration-success">
    <!-- Navigation Controls -->
    <NavigationControls />

    <div class="success-container">
      <div class="success-content">
        <div class="success-icon">
          <i class="fas fa-user-check"></i>
        </div>
        
        <h1>Welcome to Elite Barber Shop!</h1>
        <p class="success-message">Your account has been created successfully. You're now part of our exclusive community.</p>
        
        <div class="account-details" v-if="registrationData">
          <h2>Account Information</h2>
          <div class="details-card">
            <div class="detail-item">
              <i class="fas fa-user"></i>
              <div>
                <strong>Full Name</strong>
                <span>{{ registrationData.name }}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <i class="fas fa-envelope"></i>
              <div>
                <strong>Email Address</strong>
                <span>{{ registrationData.email }}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <i class="fas fa-phone"></i>
              <div>
                <strong>Phone Number</strong>
                <span>{{ registrationData.phone }}</span>
              </div>
            </div>
            
            <div class="detail-item">
              <i class="fas fa-id-badge"></i>
              <div>
                <strong>Account Type</strong>
                <span class="account-type">{{ formatAccountType(registrationData.role) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="next-steps">
          <h3>Get Started</h3>
          <div class="steps-grid">
            <div class="step-item">
              <i class="fas fa-envelope-open"></i>
              <h4>Check Your Email</h4>
              <p>We've sent a welcome email with important information</p>
            </div>
            <div class="step-item">
              <i class="fas fa-calendar-plus"></i>
              <h4>Book Your First Appointment</h4>
              <p>Schedule your first visit with our expert stylists</p>
            </div>
            <div class="step-item">
              <i class="fas fa-star"></i>
              <h4>Explore Premium Services</h4>
              <p>Discover our full range of grooming services</p>
            </div>
          </div>
        </div>
        
        <div class="welcome-offer">
          <div class="offer-content">
            <i class="fas fa-gift"></i>
            <div>
              <h4>Welcome Offer!</h4>
              <p>Get 20% off your first appointment. Use code: <strong>WELCOME20</strong></p>
            </div>
          </div>
        </div>
        
        <div class="action-buttons">
          <router-link to="/login" class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i>
            Sign In to Your Account
          </router-link>
          <router-link to="/" class="btn btn-secondary">
            <i class="fas fa-home"></i>
            Explore Our Services
          </router-link>
        </div>
        
        <div class="contact-info">
          <p>Need help getting started?</p>
          <div class="contact-details">
            <span><i class="fas fa-phone"></i> (555) 123-4567</span>
            <span><i class="fas fa-envelope"></i> support@elitebarbershop.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavigationControls from '../components/NavigationControls.vue'

const router = useRouter()
const registrationData = ref(null)

const formatAccountType = (role) => {
  const types = {
    customer: 'Customer Account',
    barber: 'Barber Professional',
    admin: 'Administrator'
  }
  return types[role] || 'Customer Account'
}

onMounted(() => {
  // Load registration data from localStorage
  const savedRegistration = localStorage.getItem('registrationData')
  if (savedRegistration) {
    registrationData.value = JSON.parse(savedRegistration)
  } else {
    // Redirect to registration if no data
    router.push('/register')
  }
})
</script>

<style scoped>
.registration-success {
  min-height: 100vh;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.success-container {
  max-width: 800px;
  width: 100%;
}

.success-content {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 20px 40px var(--shadow-color);
  text-align: center;
}

.success-icon {
  font-size: 4rem;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-xl);
}

.success-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.success-message {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.5;
}

.account-details {
  text-align: left;
  margin-bottom: var(--spacing-2xl);
}

.account-details h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.details-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 2px solid var(--accent-primary);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-item i {
  font-size: 1.2rem;
  color: var(--accent-primary);
  width: 20px;
  text-align: center;
}

.detail-item div {
  flex: 1;
}

.detail-item strong {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.detail-item span {
  color: var(--text-secondary);
}

.account-type {
  text-transform: capitalize;
  color: var(--accent-primary) !important;
  font-weight: 600 !important;
}

.next-steps {
  margin-bottom: var(--spacing-2xl);
}

.next-steps h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  text-align: center;
}

.step-item {
  padding: var(--spacing-lg);
}

.step-item i {
  font-size: 2rem;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-md);
}

.step-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.step-item p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.welcome-offer {
  background: linear-gradient(135deg, var(--accent-primary), #f4d03f);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  color: var(--bg-primary);
}

.offer-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  text-align: left;
}

.offer-content i {
  font-size: 2rem;
}

.offer-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.offer-content p {
  margin: 0;
  line-height: 1.4;
}

.offer-content strong {
  background: rgba(255, 255, 255, 0.2);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-family: monospace;
}

.action-buttons {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  margin-bottom: var(--spacing-2xl);
}

.contact-info {
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border-color);
}

.contact-info p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.contact-details {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
}

.contact-details span {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.contact-details i {
  color: var(--accent-primary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .success-content h1 {
    font-size: 2rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .contact-details {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .steps-grid {
    grid-template-columns: 1fr;
  }
  
  .offer-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
