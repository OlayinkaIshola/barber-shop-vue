<template>
  <div class="booking">
    <!-- Navigation Controls -->
    <NavigationControls />

    <div class="booking-container">
      <div class="booking-header">
        <h1>Book Your Appointment</h1>
        <p>Choose your service, stylist, and preferred time</p>
      </div>

      <div class="booking-form">
        <form @submit.prevent="handleBooking">
          <!-- Step 1: Service Selection -->
          <div class="form-step" v-show="currentStep === 1">
            <h2>Select Service</h2>
            <div class="service-options">
              <div 
                class="service-option" 
                v-for="service in services" 
                :key="service.id"
                :class="{ active: selectedService?.id === service.id }"
                @click="selectService(service)"
              >
                <div class="service-info">
                  <h3>{{ service.name }}</h3>
                  <p>{{ service.description }}</p>
                  <div class="service-details">
                    <span class="price">${{ service.price }}</span>
                    <span class="duration">{{ service.duration }} min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Stylist Selection -->
          <div class="form-step" v-show="currentStep === 2">
            <h2>Choose Your Stylist</h2>
            <div class="stylist-options">
              <div 
                class="stylist-option" 
                v-for="stylist in stylists" 
                :key="stylist.id"
                :class="{ active: selectedStylist?.id === stylist.id }"
                @click="selectStylist(stylist)"
              >
                <img :src="stylist.image" :alt="stylist.name" />
                <div class="stylist-info">
                  <h3>{{ stylist.name }}</h3>
                  <p>{{ stylist.title }}</p>
                  <div class="stylist-rating">
                    <i class="fas fa-star"></i>
                    <span>{{ stylist.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Date & Time Selection -->
          <div class="form-step" v-show="currentStep === 3">
            <h2>Select Date & Time</h2>
            <div class="datetime-selection">
              <div class="date-picker">
                <label>Choose Date:</label>
                <input 
                  type="date" 
                  v-model="selectedDate" 
                  :min="minDate"
                  class="form-input"
                />
              </div>
              <div class="time-slots" v-if="selectedDate">
                <label>Available Times:</label>
                <div class="time-grid">
                  <button 
                    type="button"
                    class="time-slot" 
                    v-for="time in availableTimes" 
                    :key="time"
                    :class="{ active: selectedTime === time }"
                    @click="selectTime(time)"
                  >
                    {{ time }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Contact Information -->
          <div class="form-step" v-show="currentStep === 4">
            <h2>Your Information</h2>
            <div class="contact-form">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input 
                  type="text" 
                  v-model="customerInfo.name" 
                  class="form-input" 
                  required 
                />
              </div>
              <div class="form-group">
                <label class="form-label">Email *</label>
                <input 
                  type="email" 
                  v-model="customerInfo.email" 
                  class="form-input" 
                  required 
                />
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number *</label>
                <input 
                  type="tel" 
                  v-model="customerInfo.phone" 
                  class="form-input" 
                  required 
                />
              </div>
              <div class="form-group">
                <label class="form-label">Special Requests (Optional)</label>
                <textarea 
                  v-model="customerInfo.notes" 
                  class="form-input form-textarea"
                  placeholder="Any special requests or notes..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="form-navigation">
            <button 
              type="button" 
              class="btn btn-secondary" 
              v-if="currentStep > 1"
              @click="previousStep"
            >
              <i class="fas fa-arrow-left"></i>
              Previous
            </button>
            
            <button 
              type="button" 
              class="btn btn-primary" 
              v-if="currentStep < 4"
              @click="nextStep"
              :disabled="!canProceed"
            >
              Next
              <i class="fas fa-arrow-right"></i>
            </button>
            
            <button 
              type="submit" 
              class="btn btn-primary" 
              v-if="currentStep === 4"
              :disabled="!canSubmit"
            >
              Confirm Booking
              <i class="fas fa-check"></i>
            </button>
          </div>
        </form>

        <!-- Booking Summary -->
        <div class="booking-summary" v-if="selectedService">
          <h3>Booking Summary</h3>
          <div class="summary-item" v-if="selectedService">
            <span>Service:</span>
            <span>{{ selectedService.name }}</span>
          </div>
          <div class="summary-item" v-if="selectedStylist">
            <span>Stylist:</span>
            <span>{{ selectedStylist.name }}</span>
          </div>
          <div class="summary-item" v-if="selectedDate">
            <span>Date:</span>
            <span>{{ formatDate(selectedDate) }}</span>
          </div>
          <div class="summary-item" v-if="selectedTime">
            <span>Time:</span>
            <span>{{ selectedTime }}</span>
          </div>
          <div class="summary-total" v-if="selectedService">
            <span>Total:</span>
            <span>${{ selectedService.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavigationControls from '../components/NavigationControls.vue'

const router = useRouter()

const currentStep = ref(1)
const selectedService = ref(null)
const selectedStylist = ref(null)
const selectedDate = ref('')
const selectedTime = ref('')
const customerInfo = ref({
  name: '',
  email: '',
  phone: '',
  notes: ''
})

const services = ref([
  { id: 1, name: 'Classic Haircut', description: 'Traditional scissor cut with styling', price: 35, duration: 45 },
  { id: 2, name: 'Beard Trim & Shape', description: 'Professional beard trimming and shaping', price: 25, duration: 30 },
  { id: 3, name: 'Hot Towel Shave', description: 'Luxurious traditional shave with hot towel treatment', price: 45, duration: 60 },
  { id: 4, name: 'Full Service Package', description: 'Complete grooming experience', price: 85, duration: 90 }
])

const stylists = ref([
  { id: 1, name: 'Marcus Johnson', title: 'Master Barber', rating: 4.9, image: '/src/assets/images/34428106.jpg' },
  { id: 2, name: 'David Rodriguez', title: 'Senior Stylist', rating: 4.8, image: '/src/assets/images/37603.jpg' },
  { id: 3, name: 'Anthony Williams', title: 'Style Specialist', rating: 4.7, image: '/src/assets/images/900.jpg' }
])

const availableTimes = ref([
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
])

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1: return selectedService.value !== null
    case 2: return selectedStylist.value !== null
    case 3: return selectedDate.value && selectedTime.value
    default: return false
  }
})

const canSubmit = computed(() => {
  return customerInfo.value.name && 
         customerInfo.value.email && 
         customerInfo.value.phone &&
         selectedService.value &&
         selectedStylist.value &&
         selectedDate.value &&
         selectedTime.value
})

const selectService = (service) => {
  selectedService.value = service
}

const selectStylist = (stylist) => {
  selectedStylist.value = stylist
}

const selectTime = (time) => {
  selectedTime.value = time
}

const nextStep = () => {
  if (canProceed.value && currentStep.value < 4) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const handleBooking = () => {
  // Frontend-only booking simulation
  const bookingData = {
    service: selectedService.value,
    stylist: selectedStylist.value,
    date: selectedDate.value,
    time: selectedTime.value,
    customer: customerInfo.value,
    bookingId: 'BK' + Date.now()
  }
  
  // Store booking data in localStorage for demo purposes
  localStorage.setItem('lastBooking', JSON.stringify(bookingData))
  
  // Redirect to payment page
  router.push('/payment')
}

onMounted(() => {
  // Any initialization logic
})
</script>

<style scoped>
.booking {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 100px var(--spacing-lg) var(--spacing-2xl);
}

.booking-container {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-2xl);
}

.booking-header {
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.booking-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.booking-header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.booking-form {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.form-step h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
}

.service-options,
.stylist-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.service-option,
.stylist-option {
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.service-option:hover,
.stylist-option:hover,
.service-option.active,
.stylist-option.active {
  border-color: var(--accent-primary);
  background: var(--button-hover);
}

.service-option h3,
.stylist-option h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.service-details {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-md);
}

.price {
  font-weight: 600;
  color: var(--accent-primary);
}

.stylist-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.stylist-option img {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.stylist-rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--accent-primary);
}

.datetime-selection {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.time-slot {
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--card-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.time-slot:hover,
.time-slot.active {
  border-color: var(--accent-primary);
  background: var(--accent-primary);
  color: var(--bg-primary);
}

.form-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.booking-summary {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: 0 4px 20px var(--shadow-color);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.booking-summary h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--accent-primary);
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 2px solid var(--accent-primary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .booking-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .booking-summary {
    position: static;
  }

  .form-navigation {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .time-slots {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-sm);
  }

  .time-slot {
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .booking {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .booking-header h1 {
    font-size: 2rem;
  }

  .time-slots {
    grid-template-columns: repeat(2, 1fr);
  }

  .booking-summary {
    padding: var(--spacing-lg);
  }

  .summary-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .form-navigation .btn {
    width: 100%;
  }
}
</style>
