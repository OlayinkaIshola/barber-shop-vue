<template>
  <div class="payment">
    <!-- Navigation Controls -->
    <NavigationControls />

    <div class="payment-container">
      <div class="payment-header">
        <h1>Complete Your Payment</h1>
        <p>Secure payment processing for your appointment</p>
      </div>

      <div class="payment-content">
        <div class="payment-form">
          <div class="booking-summary">
            <h2>Booking Summary</h2>
            <div class="summary-details" v-if="bookingData">
              <div class="summary-item">
                <span>Service:</span>
                <span>{{ bookingData.service?.name }}</span>
              </div>
              <div class="summary-item">
                <span>Stylist:</span>
                <span>{{ bookingData.stylist?.name }}</span>
              </div>
              <div class="summary-item">
                <span>Date:</span>
                <span>{{ formatDate(bookingData.date) }}</span>
              </div>
              <div class="summary-item">
                <span>Time:</span>
                <span>{{ bookingData.time }}</span>
              </div>
              <div class="summary-total">
                <span>Total Amount:</span>
                <span>${{ bookingData.service?.price }}</span>
              </div>
            </div>
          </div>

          <form @submit.prevent="handlePayment">
            <h3>Payment Information</h3>
            
            <div class="form-group">
              <label class="form-label">Card Number</label>
              <input 
                type="text" 
                v-model="paymentData.cardNumber" 
                class="form-input" 
                placeholder="1234 5678 9012 3456"
                maxlength="19"
                @input="formatCardNumber"
                required 
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Expiry Date</label>
                <input 
                  type="text" 
                  v-model="paymentData.expiryDate" 
                  class="form-input" 
                  placeholder="MM/YY"
                  maxlength="5"
                  @input="formatExpiryDate"
                  required 
                />
              </div>
              <div class="form-group">
                <label class="form-label">CVV</label>
                <input 
                  type="text" 
                  v-model="paymentData.cvv" 
                  class="form-input" 
                  placeholder="123"
                  maxlength="4"
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Cardholder Name</label>
              <input 
                type="text" 
                v-model="paymentData.cardholderName" 
                class="form-input" 
                placeholder="John Doe"
                required 
              />
            </div>

            <div class="payment-methods">
              <h4>We Accept:</h4>
              <div class="payment-icons">
                <i class="fab fa-cc-visa"></i>
                <i class="fab fa-cc-mastercard"></i>
                <i class="fab fa-cc-amex"></i>
                <i class="fab fa-cc-discover"></i>
              </div>
            </div>

            <button type="submit" class="btn btn-primary payment-btn" :disabled="isProcessing">
              <span v-if="!isProcessing">Pay ${{ bookingData?.service?.price }}</span>
              <span v-else>Processing Payment...</span>
              <i class="fas fa-credit-card" v-if="!isProcessing"></i>
              <i class="fas fa-spinner fa-spin" v-else></i>
            </button>
          </form>

          <div class="security-info">
            <i class="fas fa-shield-alt"></i>
            <span>Your payment information is secure and encrypted</span>
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

const bookingData = ref(null)
const isProcessing = ref(false)

const paymentData = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: ''
})

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '')
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
  paymentData.value.cardNumber = formattedValue
}

const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  paymentData.value.expiryDate = value
}

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

const handlePayment = async () => {
  isProcessing.value = true
  
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Store payment confirmation
  const paymentConfirmation = {
    ...bookingData.value,
    paymentId: 'PAY' + Date.now(),
    paymentDate: new Date().toISOString(),
    status: 'confirmed'
  }
  
  localStorage.setItem('paymentConfirmation', JSON.stringify(paymentConfirmation))
  
  isProcessing.value = false
  
  // Redirect to success page
  router.push('/payment-success')
}

onMounted(() => {
  // Load booking data from localStorage
  const savedBooking = localStorage.getItem('lastBooking')
  if (savedBooking) {
    bookingData.value = JSON.parse(savedBooking)
  } else {
    // Redirect back to booking if no data
    router.push('/booking')
  }
})
</script>

<style scoped>
.payment {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 100px var(--spacing-lg) var(--spacing-2xl);
  position: relative;
}



.payment-container {
  max-width: 600px;
  margin: 0 auto;
}

.payment-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.payment-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.payment-header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.payment-form {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.booking-summary {
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 2px solid var(--border-color);
}

.booking-summary h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--accent-primary);
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.payment-form h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.form-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-md);
}

.payment-methods {
  margin: var(--spacing-xl) 0;
  text-align: center;
}

.payment-methods h4 {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
}

.payment-icons i {
  font-size: 2rem;
  color: var(--text-secondary);
}

.payment-btn {
  width: 100%;
  justify-content: center;
  font-size: 1.1rem;
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.security-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.security-info i {
  color: #27ae60;
}

/* Responsive Design */
@media (max-width: 768px) {
  .payment-header h1 {
    font-size: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .payment-icons {
    flex-wrap: wrap;
  }
}
</style>
