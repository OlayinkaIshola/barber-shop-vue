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

          <!-- Payment Method Selection -->
          <div class="payment-method-selection">
            <h3>Choose Payment Method</h3>
            <div class="payment-methods">
              <div
                class="payment-method"
                :class="{ active: selectedPaymentMethod === 'card' }"
                @click="selectedPaymentMethod = 'card'"
              >
                <div class="method-icon">
                  <i class="fas fa-credit-card"></i>
                </div>
                <div class="method-info">
                  <h4>Credit/Debit Card</h4>
                  <p>Pay securely with your card</p>
                </div>
              </div>
              <div
                class="payment-method"
                :class="{ active: selectedPaymentMethod === 'transfer' }"
                @click="selectedPaymentMethod = 'transfer'"
              >
                <div class="method-icon">
                  <i class="fas fa-university"></i>
                </div>
                <div class="method-info">
                  <h4>Bank Transfer</h4>
                  <p>Direct bank transfer</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Card Payment Form -->
          <form v-if="selectedPaymentMethod === 'card'" @submit.prevent="handlePayment">
            <h3>Card Payment Information</h3>
            
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

            <div class="accepted-cards">
              <h4>We Accept:</h4>
              <div class="payment-icons">
                <i class="fab fa-cc-visa visa-color"></i>
                <i class="fab fa-cc-mastercard mastercard-color"></i>
                <i class="fab fa-cc-amex amex-color"></i>
                <i class="fab fa-cc-discover discover-color"></i>
              </div>
            </div>

            <button type="submit" class="btn btn-primary payment-btn" :disabled="isProcessing">
              <span v-if="!isProcessing">Pay ${{ bookingData?.total || bookingData?.service?.price }}</span>
              <span v-else>Processing Payment...</span>
              <i class="fas fa-credit-card" v-if="!isProcessing"></i>
              <i class="fas fa-spinner fa-spin" v-else></i>
            </button>
          </form>

          <!-- Bank Transfer Form -->
          <div v-if="selectedPaymentMethod === 'transfer'" class="transfer-form">
            <h3>Bank Transfer Information</h3>
            <div class="transfer-details">
              <div class="bank-info">
                <h4>Transfer to:</h4>
                <div class="bank-details">
                  <div class="detail-item">
                    <span class="label">Bank Name:</span>
                    <span class="value">Elite Bank</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Account Name:</span>
                    <span class="value">Elite Barber Shop LLC</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Account Number:</span>
                    <span class="value">1234567890</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Routing Number:</span>
                    <span class="value">987654321</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Amount:</span>
                    <span class="value amount">${{ bookingData?.total || bookingData?.service?.price }}</span>
                  </div>
                </div>
              </div>

              <div class="transfer-instructions">
                <h4>Instructions:</h4>
                <ol>
                  <li>Use the booking ID <strong>{{ bookingData?.bookingId }}</strong> as the transfer reference</li>
                  <li>Complete the transfer within 24 hours to secure your appointment</li>
                  <li>Send a screenshot of the transfer confirmation to confirm@elitebarbershop.com</li>
                  <li>We'll confirm your appointment once payment is verified</li>
                </ol>
              </div>
            </div>

            <button @click="handleTransferConfirmation" class="btn btn-primary payment-btn" :disabled="isProcessing">
              <span v-if="!isProcessing">I've Completed the Transfer</span>
              <span v-else>Processing...</span>
              <i class="fas fa-university" v-if="!isProcessing"></i>
              <i class="fas fa-spinner fa-spin" v-else></i>
            </button>
          </div>

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
const selectedPaymentMethod = ref('card')

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

const handleTransferConfirmation = async () => {
  isProcessing.value = true

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Store payment confirmation for bank transfer
  const paymentConfirmation = {
    ...bookingData.value,
    paymentId: 'TRANSFER' + Date.now(),
    paymentDate: new Date().toISOString(),
    paymentMethod: 'bank_transfer',
    status: 'pending_verification'
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

/* Payment Method Selection */
.payment-method-selection {
  margin-bottom: var(--spacing-xl);
}

.payment-methods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.payment-method {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  background: var(--card-bg);
}

.payment-method:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.payment-method.active {
  border-color: var(--accent-primary);
  background: rgba(212, 175, 55, 0.1);
}

.method-icon {
  font-size: 2rem;
  color: var(--accent-primary);
}

.method-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.method-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Payment Icons with Brand Colors */
.payment-icons i {
  font-size: 2rem;
}

/* Brand Colors for Payment Icons */
.visa-color {
  color: #1A1F71;
}

.mastercard-color {
  color: #EB001B;
}

.amex-color {
  color: #006FCF;
}

.discover-color {
  color: #FF6000;
}

/* Bank Transfer Styles */
.transfer-form {
  background: var(--card-bg);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}

.transfer-details {
  margin-bottom: var(--spacing-xl);
}

.bank-info {
  margin-bottom: var(--spacing-xl);
}

.bank-info h4 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: 1.2rem;
}

.bank-details {
  background: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item .label {
  color: var(--text-secondary);
  font-weight: 500;
}

.detail-item .value {
  color: var(--text-primary);
  font-weight: 600;
}

.detail-item .amount {
  color: var(--accent-primary);
  font-size: 1.1rem;
}

.transfer-instructions {
  background: rgba(212, 175, 55, 0.1);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--accent-primary);
}

.transfer-instructions h4 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.transfer-instructions ol {
  color: var(--text-secondary);
  padding-left: var(--spacing-lg);
}

.transfer-instructions li {
  margin-bottom: var(--spacing-sm);
  line-height: 1.5;
}

.transfer-instructions strong {
  color: var(--accent-primary);
  font-weight: 600;
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
