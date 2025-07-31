<template>
  <div class="barber-dashboard">
    <!-- Navigation Controls -->
    <NavigationControls />
    
    <div class="dashboard-container">
      <div class="dashboard-form">
        <div class="form-header">
          <div class="header-image">
            <img src="@/assets/images/barber-work-side-view-young-bearded-men-getting-haircut-hairdresser-sitting-chair-barbershop-70127409.webp" 
                 alt="Barber Portal" class="header-logo" />
          </div>
          <h1>Barber Portal</h1>
          <p>Manage your appointments, clients, and schedule</p>
        </div>

        <!-- Barber Information Form -->
        <form @submit.prevent="updateBarberInfo">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">
                <i class="fas fa-user"></i>
                First Name
              </label>
              <input 
                type="text" 
                v-model="barberData.firstName" 
                class="form-input" 
                placeholder="Enter your first name"
                required 
              />
            </div>
            <div class="form-group">
              <label class="form-label">
                <i class="fas fa-user"></i>
                Last Name
              </label>
              <input 
                type="text" 
                v-model="barberData.lastName" 
                class="form-input" 
                placeholder="Enter your last name"
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-envelope"></i>
              Email Address
            </label>
            <input 
              type="email" 
              v-model="barberData.email" 
              class="form-input" 
              placeholder="Enter your email"
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-phone"></i>
              Phone Number
            </label>
            <input 
              type="tel" 
              v-model="barberData.phone" 
              class="form-input" 
              placeholder="Enter your phone number"
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-cut"></i>
              Specialization
            </label>
            <select v-model="barberData.specialization" class="form-input" required>
              <option value="">Select your specialization</option>
              <option value="classic-cuts">Classic Cuts</option>
              <option value="beard-styling">Beard Styling</option>
              <option value="hot-towel-shave">Hot Towel Shave</option>
              <option value="modern-styles">Modern Styles</option>
              <option value="hair-washing">Hair Washing & Treatment</option>
              <option value="full-service">Full Service Package</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-star"></i>
              Experience Level
            </label>
            <select v-model="barberData.experience" class="form-input" required>
              <option value="">Select experience level</option>
              <option value="junior">Junior Barber (1-2 years)</option>
              <option value="experienced">Experienced Barber (3-5 years)</option>
              <option value="senior">Senior Barber (6-10 years)</option>
              <option value="master">Master Barber (10+ years)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-clock"></i>
              Available Hours
            </label>
            <div class="time-range">
              <input 
                type="time" 
                v-model="barberData.startTime" 
                class="form-input time-input" 
                required 
              />
              <span class="time-separator">to</span>
              <input 
                type="time" 
                v-model="barberData.endTime" 
                class="form-input time-input" 
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-calendar-alt"></i>
              Working Days
            </label>
            <div class="checkbox-group">
              <label v-for="day in weekDays" :key="day.value" class="checkbox-label">
                <input 
                  type="checkbox" 
                  :value="day.value" 
                  v-model="barberData.workingDays"
                  class="checkbox-input"
                />
                <span class="checkbox-custom"></span>
                {{ day.label }}
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-info-circle"></i>
              Bio / Description
            </label>
            <textarea 
              v-model="barberData.bio" 
              class="form-input textarea" 
              placeholder="Tell clients about yourself, your experience, and specialties..."
              rows="4"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="updating">
              <i v-if="updating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-save"></i>
              {{ updating ? 'Updating...' : 'Update Profile' }}
            </button>
            <button type="button" @click="logout" class="btn btn-secondary">
              <i class="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </form>

        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">8</span>
              <span class="stat-label">Today's Appointments</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">$420</span>
              <span class="stat-label">Today's Earnings</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-star"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">4.9</span>
              <span class="stat-label">Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavigationControls from '../components/NavigationControls.vue'

const router = useRouter()

// Reactive data for barber information
const barberData = ref({
  firstName: 'Marcus',
  lastName: 'Johnson',
  email: 'marcus.johnson@elitebarber.com',
  phone: '(555) 123-4567',
  specialization: 'classic-cuts',
  experience: 'master',
  startTime: '09:00',
  endTime: '18:00',
  workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  bio: 'Master barber with over 15 years of experience in classic cuts, beard styling, and hot towel shaves. Passionate about delivering exceptional grooming experiences.'
})

const weekDays = ref([
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' }
])

const updating = ref(false)

// Methods
const updateBarberInfo = async () => {
  updating.value = true
  
  // Simulate API call
  setTimeout(() => {
    updating.value = false
    // Show success message
    alert('Profile updated successfully!')
  }, 1500)
}

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.barber-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  position: relative;
  padding: 2rem 0;
}

.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.dashboard-form {
  background: var(--card-background);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-image {
  margin-bottom: 1.5rem;
}

.header-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-color);
}

.form-header h1 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-size: 2.5rem;
  font-weight: 700;
}

.form-header p {
  margin: 0;
  color: var(--text-muted);
  font-size: 1.1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.95rem;
}

.form-label i {
  color: var(--primary-color);
  width: 16px;
}

.form-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--background-color);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.textarea {
  resize: vertical;
  min-height: 100px;
}

.time-range {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time-input {
  flex: 1;
}

.time-separator {
  color: var(--text-muted);
  font-weight: 500;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.checkbox-label:hover {
  background: var(--background-color);
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  text-align: center;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  flex: 1;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--background-color);
  border-color: var(--primary-color);
}

.quick-stats {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--background-color);
  border-radius: 12px;
  margin-bottom: 1rem;
}

.stat-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 0 1rem;
  }

  .dashboard-form {
    padding: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .checkbox-group {
    grid-template-columns: repeat(2, 1fr);
  }

  .form-actions {
    flex-direction: column;
  }

  .time-range {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
