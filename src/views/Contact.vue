<template>
  <div class="contact-page">
    <div class="contact-container">
      <!-- Header Section -->
      <div class="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with Elite Barber Shop. We're here to help with any questions or to schedule your appointment.</p>
      </div>

      <!-- Contact Content -->
      <div class="contact-content">
        <!-- Contact Form -->
        <div class="contact-form-section">
          <h2>Send us a Message</h2>
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  v-model="form.firstName"
                  :class="{ 'error': errors.firstName }"
                  required
                />
                <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  v-model="form.lastName"
                  :class="{ 'error': errors.lastName }"
                  required
                />
                <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  :class="{ 'error': errors.email }"
                  required
                />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <select
                id="subject"
                v-model="form.subject"
                :class="{ 'error': errors.subject }"
                required
              >
                <option value="">Select a subject</option>
                <option value="appointment">Appointment Inquiry</option>
                <option value="services">Services Information</option>
                <option value="complaint">Complaint</option>
                <option value="compliment">Compliment</option>
                <option value="general">General Question</option>
                <option value="other">Other</option>
              </select>
              <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea
                id="message"
                v-model="form.message"
                :class="{ 'error': errors.message }"
                rows="6"
                placeholder="Tell us how we can help you..."
                required
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="form.newsletter"
                />
                <span class="checkmark"></span>
                Subscribe to our newsletter for updates and special offers
              </label>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-paper-plane"></i>
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="contact-info-section">
          <h2>Visit Our Shop</h2>
          
          <div class="info-card">
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <h4>Address</h4>
                <p>123 Main Street<br>Downtown District<br>City, State 12345</p>
              </div>
            </div>

            <div class="info-item">
              <i class="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p><a href="tel:+15551234567">(555) 123-4567</a></p>
              </div>
            </div>

            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:info@elitebarbershop.com">info@elitebarbershop.com</a></p>
              </div>
            </div>

            <div class="info-item">
              <i class="fas fa-clock"></i>
              <div>
                <h4>Business Hours</h4>
                <div class="hours-list">
                  <div class="hours-item">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div class="hours-item">
                    <span>Saturday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div class="hours-item">
                    <span>Sunday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="social-section">
            <h3>Follow Us</h3>
            <div class="social-links">
              <a href="#" class="social-link facebook">
                <i class="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </a>
              <a href="#" class="social-link instagram">
                <i class="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
              <a href="#" class="social-link twitter">
                <i class="fab fa-twitter"></i>
                <span>Twitter</span>
              </a>
              <a href="#" class="social-link youtube">
                <i class="fab fa-youtube"></i>
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions">
            <h3>Quick Actions</h3>
            <div class="action-buttons">
              <router-link to="/booking" class="btn btn-primary">
                <i class="fas fa-calendar-plus"></i>
                Book Appointment
              </router-link>
              <router-link to="/services" class="btn btn-outline">
                <i class="fas fa-cut"></i>
                View Services
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Map Section (Placeholder) -->
      <div class="map-section">
        <h2>Find Us</h2>
        <div class="map-placeholder">
          <i class="fas fa-map-marked-alt"></i>
          <p>Interactive map would be displayed here</p>
          <small>123 Main Street, Downtown District, City, State 12345</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const isSubmitting = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  let isValid = true

  // First name validation
  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  }

  // Last name validation
  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  }

  // Email validation
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Subject validation
  if (!form.subject) {
    errors.subject = 'Please select a subject'
    isValid = false
  }

  // Message validation
  if (!form.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long'
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Success
    toast.success('Thank you for your message! We\'ll get back to you soon.')
    
    // Reset form
    Object.keys(form).forEach(key => {
      if (typeof form[key] === 'boolean') {
        form[key] = false
      } else {
        form[key] = ''
      }
    })
  } catch (error) {
    toast.error('Sorry, there was an error sending your message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 100px var(--spacing-lg) var(--spacing-2xl);
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.contact-header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.contact-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.contact-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.contact-form-section,
.contact-info-section {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.contact-form-section h2,
.contact-info-section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all var(--transition-normal);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: var(--spacing-xs);
  display: block;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  cursor: pointer;
  font-weight: normal;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.info-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item i {
  font-size: 1.5rem;
  color: var(--accent-primary);
  margin-top: var(--spacing-xs);
}

.info-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.info-item p,
.info-item a {
  color: var(--text-secondary);
  text-decoration: none;
  line-height: 1.5;
}

.info-item a:hover {
  color: var(--accent-primary);
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-section {
  margin-bottom: var(--spacing-xl);
}

.social-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.social-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-primary);
  transition: all var(--transition-normal);
}

.social-link:hover {
  background: var(--button-hover);
  transform: translateY(-2px);
}

.social-link i {
  font-size: 1.2rem;
}

.quick-actions h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.map-section {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
  text-align: center;
}

.map-section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
}

.map-placeholder {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
}

.map-placeholder i {
  font-size: 3rem;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-lg);
}

.map-placeholder p {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-header h1 {
    font-size: 2.5rem;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    grid-template-columns: 1fr;
  }
}
</style>
