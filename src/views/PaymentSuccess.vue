<template>
  <div class="payment-success">
    <!-- Navigation Controls -->
    <NavigationControls />

    <div class="success-container">
      <div class="success-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        
        <h1>Payment Successful!</h1>
        <p class="success-message">Your appointment has been confirmed and payment processed successfully.</p>
        
        <div class="confirmation-details" v-if="confirmationData">
          <h2>Booking Confirmation</h2>
          <div class="confirmation-card">
            <div class="confirmation-header">
              <span class="booking-id">Booking ID: {{ confirmationData.bookingId }}</span>
              <span class="payment-id">Payment ID: {{ confirmationData.paymentId }}</span>
            </div>
            
            <div class="booking-info">
              <div class="info-item">
                <i class="fas fa-cut"></i>
                <div>
                  <strong>{{ confirmationData.service?.name }}</strong>
                  <span>${{ confirmationData.service?.price }}</span>
                </div>
              </div>
              
              <div class="info-item">
                <i class="fas fa-user"></i>
                <div>
                  <strong>{{ confirmationData.stylist?.name }}</strong>
                  <span>{{ confirmationData.stylist?.title }}</span>
                </div>
              </div>
              
              <div class="info-item">
                <i class="fas fa-calendar"></i>
                <div>
                  <strong>{{ formatDate(confirmationData.date) }}</strong>
                  <span>{{ confirmationData.time }}</span>
                </div>
              </div>
              
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <strong>Confirmation Email Sent</strong>
                  <span>{{ confirmationData.customer?.email }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="next-steps">
          <h3>What's Next?</h3>
          <div class="steps-grid">
            <div class="step-item">
              <i class="fas fa-envelope"></i>
              <h4>Check Your Email</h4>
              <p>We've sent a confirmation email with all the details</p>
            </div>
            <div class="step-item">
              <i class="fas fa-clock"></i>
              <h4>Arrive 10 Minutes Early</h4>
              <p>Please arrive a few minutes before your appointment</p>
            </div>
            <div class="step-item">
              <i class="fas fa-phone"></i>
              <h4>Need to Reschedule?</h4>
              <p>Call us at (555) 123-4567 or manage online</p>
            </div>
          </div>
        </div>
        
        <div class="action-buttons">
          <router-link to="/customer-dashboard" class="btn btn-primary">
            <i class="fas fa-tachometer-alt"></i>
            Go to Dashboard
          </router-link>
          <router-link to="/" class="btn btn-secondary">
            <i class="fas fa-home"></i>
            Back to Home
          </router-link>
        </div>
        
        <div class="contact-info">
          <p>Questions about your appointment?</p>
          <div class="contact-details">
            <span><i class="fas fa-phone"></i> (555) 123-4567</span>
            <span><i class="fas fa-envelope"></i> info@elitebarbershop.com</span>
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
const confirmationData = ref(null)

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

onMounted(() => {
  // Load confirmation data from localStorage
  const savedConfirmation = localStorage.getItem('paymentConfirmation')
  if (savedConfirmation) {
    confirmationData.value = JSON.parse(savedConfirmation)
  } else {
    // Redirect to home if no confirmation data
    router.push('/')
  }
})
</script>

<style scoped>
.payment-success {
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
  color: #27ae60;
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
}

.confirmation-details {
  text-align: left;
  margin-bottom: var(--spacing-2xl);
}

.confirmation-details h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.confirmation-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 2px solid var(--accent-primary);
}

.confirmation-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.booking-id,
.payment-id {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-family: monospace;
  background: var(--card-bg);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
}

.booking-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.info-item i {
  font-size: 1.2rem;
  color: var(--accent-primary);
  width: 20px;
  text-align: center;
}

.info-item div {
  flex: 1;
}

.info-item strong {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
}

.info-item span {
  color: var(--text-secondary);
  font-size: 0.9rem;
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
  
  .confirmation-header {
    flex-direction: column;
    gap: var(--spacing-sm);
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
}
</style>
