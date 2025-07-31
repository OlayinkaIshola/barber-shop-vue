<template>
  <div class="profile-page">
    <!-- Navigation Controls -->
    <NavigationControls />

    <div class="profile-container">
      <!-- Header -->
      <div class="profile-header">
        <div class="profile-avatar">
          <img :src="profileImage" :alt="user?.name" />
          <button class="avatar-edit-btn" @click="showImageUpload = true">
            <i class="fas fa-camera"></i>
          </button>
        </div>
        <div class="profile-info">
          <h1>{{ user?.name || 'User Profile' }}</h1>
          <p class="user-role">{{ formatRole(user?.role) }}</p>
          <p class="member-since">Member since {{ formatDate(user?.memberSince || new Date()) }}</p>
        </div>
      </div>

      <!-- Profile Tabs -->
      <div class="profile-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
        >
          <i :class="tab.icon"></i>
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Personal Information Tab -->
        <div v-if="activeTab === 'personal'" class="tab-panel">
          <div class="section-card">
            <h2>Personal Information</h2>
            <form @submit.prevent="updateProfile" class="profile-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    v-model="profileForm.firstName"
                    :class="{ 'error': errors.firstName }"
                  />
                  <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    v-model="profileForm.lastName"
                    :class="{ 'error': errors.lastName }"
                  />
                  <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    v-model="profileForm.email"
                    :class="{ 'error': errors.email }"
                  />
                  <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="profileForm.phone"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    v-model="profileForm.dateOfBirth"
                  />
                </div>
                <div class="form-group">
                  <label for="gender">Gender</label>
                  <select id="gender" v-model="profileForm.gender">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="address">Address</label>
                <textarea
                  id="address"
                  v-model="profileForm.address"
                  rows="3"
                  placeholder="Enter your full address"
                ></textarea>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary" :disabled="isUpdating">
                  <i v-if="isUpdating" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-save"></i>
                  {{ isUpdating ? 'Updating...' : 'Update Profile' }}
                </button>
                <button type="button" @click="resetForm" class="btn btn-secondary">
                  <i class="fas fa-undo"></i>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Preferences Tab -->
        <div v-if="activeTab === 'preferences'" class="tab-panel">
          <div class="section-card">
            <h2>Preferences</h2>
            <div class="preferences-form">
              <div class="preference-group">
                <h3>Notifications</h3>
                <div class="preference-item">
                  <label class="switch-label">
                    <input type="checkbox" v-model="preferences.emailNotifications" />
                    <span class="switch"></span>
                    Email Notifications
                  </label>
                  <p>Receive appointment reminders and updates via email</p>
                </div>
                <div class="preference-item">
                  <label class="switch-label">
                    <input type="checkbox" v-model="preferences.smsNotifications" />
                    <span class="switch"></span>
                    SMS Notifications
                  </label>
                  <p>Receive appointment reminders via text message</p>
                </div>
                <div class="preference-item">
                  <label class="switch-label">
                    <input type="checkbox" v-model="preferences.promotionalEmails" />
                    <span class="switch"></span>
                    Promotional Emails
                  </label>
                  <p>Receive special offers and promotions</p>
                </div>
              </div>

              <div class="preference-group">
                <h3>Booking Preferences</h3>
                <div class="form-group">
                  <label for="preferredStylist">Preferred Stylist</label>
                  <select id="preferredStylist" v-model="preferences.preferredStylist">
                    <option value="">No Preference</option>
                    <option value="marcus">Marcus Johnson</option>
                    <option value="david">David Rodriguez</option>
                    <option value="anthony">Anthony Williams</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="preferredTime">Preferred Time</label>
                  <select id="preferredTime" v-model="preferences.preferredTime">
                    <option value="">No Preference</option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="evening">Evening (5PM - 8PM)</option>
                  </select>
                </div>
              </div>

              <div class="form-actions">
                <button @click="updatePreferences" class="btn btn-primary" :disabled="isUpdatingPrefs">
                  <i v-if="isUpdatingPrefs" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-save"></i>
                  {{ isUpdatingPrefs ? 'Saving...' : 'Save Preferences' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Tab -->
        <div v-if="activeTab === 'security'" class="tab-panel">
          <div class="section-card">
            <h2>Security Settings</h2>
            <form @submit.prevent="changePassword" class="security-form">
              <div class="form-group">
                <label for="currentPassword">Current Password</label>
                <div class="password-input">
                  <input
                    :type="showCurrentPassword ? 'text' : 'password'"
                    id="currentPassword"
                    v-model="passwordForm.currentPassword"
                    :class="{ 'error': errors.currentPassword }"
                  />
                  <button type="button" @click="showCurrentPassword = !showCurrentPassword" class="password-toggle">
                    <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <span v-if="errors.currentPassword" class="error-message">{{ errors.currentPassword }}</span>
              </div>

              <div class="form-group">
                <label for="newPassword">New Password</label>
                <div class="password-input">
                  <input
                    :type="showNewPassword ? 'text' : 'password'"
                    id="newPassword"
                    v-model="passwordForm.newPassword"
                    :class="{ 'error': errors.newPassword }"
                  />
                  <button type="button" @click="showNewPassword = !showNewPassword" class="password-toggle">
                    <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <span v-if="errors.newPassword" class="error-message">{{ errors.newPassword }}</span>
              </div>

              <div class="form-group">
                <label for="confirmPassword">Confirm New Password</label>
                <div class="password-input">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    id="confirmPassword"
                    v-model="passwordForm.confirmPassword"
                    :class="{ 'error': errors.confirmPassword }"
                  />
                  <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="password-toggle">
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary" :disabled="isChangingPassword">
                  <i v-if="isChangingPassword" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-lock"></i>
                  {{ isChangingPassword ? 'Changing...' : 'Change Password' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Two-Factor Authentication -->
          <div class="section-card">
            <h2>Two-Factor Authentication</h2>
            <div class="two-factor-section">
              <div class="two-factor-status">
                <i :class="twoFactorEnabled ? 'fas fa-shield-alt text-success' : 'fas fa-shield-alt text-warning'"></i>
                <div>
                  <h4>{{ twoFactorEnabled ? 'Enabled' : 'Disabled' }}</h4>
                  <p>{{ twoFactorEnabled ? 'Your account is protected with 2FA' : 'Add an extra layer of security to your account' }}</p>
                </div>
              </div>
              <button 
                @click="toggleTwoFactor" 
                :class="['btn', twoFactorEnabled ? 'btn-danger' : 'btn-primary']"
              >
                {{ twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Upload Modal -->
    <div v-if="showImageUpload" class="modal-overlay" @click="showImageUpload = false">
      <div class="modal-content" @click.stop>
        <h3>Update Profile Picture</h3>
        <div class="image-upload-area">
          <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" style="display: none" />
          <button @click="$refs.fileInput.click()" class="btn btn-primary">
            <i class="fas fa-upload"></i>
            Choose Image
          </button>
        </div>
        <div class="modal-actions">
          <button @click="showImageUpload = false" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import NavigationControls from '../components/NavigationControls.vue'

const router = useRouter()
const toast = useToast()

// State
const user = ref(null)
const activeTab = ref('personal')
const isUpdating = ref(false)
const isUpdatingPrefs = ref(false)
const isChangingPassword = ref(false)
const showImageUpload = ref(false)
const twoFactorEnabled = ref(false)

// Password visibility
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Tabs configuration
const tabs = [
  { id: 'personal', label: 'Personal Info', icon: 'fas fa-user' },
  { id: 'preferences', label: 'Preferences', icon: 'fas fa-cog' },
  { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' }
]

// Forms
const profileForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: ''
})

const preferences = reactive({
  emailNotifications: true,
  smsNotifications: false,
  promotionalEmails: true,
  preferredStylist: '',
  preferredTime: ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Computed
const profileImage = computed(() => {
  return user.value?.avatar || '/src/assets/images/default-avatar.jpg'
})

// Methods
const formatRole = (role) => {
  const roles = {
    customer: 'Customer',
    barber: 'Barber Professional',
    employee: 'Employee',
    admin: 'Administrator'
  }
  return roles[role] || 'Customer'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  })
}

const loadUserData = () => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
    
    // Populate form with user data
    const names = user.value.name?.split(' ') || ['', '']
    profileForm.firstName = names[0] || ''
    profileForm.lastName = names.slice(1).join(' ') || ''
    profileForm.email = user.value.email || ''
    profileForm.phone = user.value.phone || ''
    profileForm.dateOfBirth = user.value.dateOfBirth || ''
    profileForm.gender = user.value.gender || ''
    profileForm.address = user.value.address || ''
  } else {
    router.push('/login')
  }
}

const validateProfileForm = () => {
  Object.keys(errors).forEach(key => {
    if (key !== 'currentPassword' && key !== 'newPassword' && key !== 'confirmPassword') {
      errors[key] = ''
    }
  })

  let isValid = true

  if (!profileForm.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  }

  if (!profileForm.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  }

  if (!profileForm.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  return isValid
}

const updateProfile = async () => {
  if (!validateProfileForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  isUpdating.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Update user data
    const updatedUser = {
      ...user.value,
      name: `${profileForm.firstName} ${profileForm.lastName}`,
      email: profileForm.email,
      phone: profileForm.phone,
      dateOfBirth: profileForm.dateOfBirth,
      gender: profileForm.gender,
      address: profileForm.address
    }
    
    localStorage.setItem('user', JSON.stringify(updatedUser))
    user.value = updatedUser
    
    toast.success('Profile updated successfully!')
  } catch (error) {
    toast.error('Failed to update profile. Please try again.')
  } finally {
    isUpdating.value = false
  }
}

const updatePreferences = async () => {
  isUpdatingPrefs.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Save preferences to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences))
    
    toast.success('Preferences saved successfully!')
  } catch (error) {
    toast.error('Failed to save preferences. Please try again.')
  } finally {
    isUpdatingPrefs.value = false
  }
}

const validatePasswordForm = () => {
  errors.currentPassword = ''
  errors.newPassword = ''
  errors.confirmPassword = ''

  let isValid = true

  if (!passwordForm.currentPassword) {
    errors.currentPassword = 'Current password is required'
    isValid = false
  }

  if (!passwordForm.newPassword) {
    errors.newPassword = 'New password is required'
    isValid = false
  } else if (passwordForm.newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters long'
    isValid = false
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

const changePassword = async () => {
  if (!validatePasswordForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  isChangingPassword.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success('Password changed successfully!')
    
    // Reset form
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (error) {
    toast.error('Failed to change password. Please try again.')
  } finally {
    isChangingPassword.value = false
  }
}

const toggleTwoFactor = () => {
  twoFactorEnabled.value = !twoFactorEnabled.value
  toast.success(`Two-factor authentication ${twoFactorEnabled.value ? 'enabled' : 'disabled'}`)
}

const resetForm = () => {
  loadUserData()
  toast.info('Form reset to original values')
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // In a real app, you would upload the file to a server
    const reader = new FileReader()
    reader.onload = (e) => {
      // Update user avatar
      const updatedUser = { ...user.value, avatar: e.target.result }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      user.value = updatedUser
      showImageUpload.value = false
      toast.success('Profile picture updated!')
    }
    reader.readAsDataURL(file)
  }
}

// Lifecycle
onMounted(() => {
  loadUserData()
  
  // Load preferences
  const savedPreferences = localStorage.getItem('userPreferences')
  if (savedPreferences) {
    Object.assign(preferences, JSON.parse(savedPreferences))
  }
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 100px var(--spacing-lg) var(--spacing-2xl);
}

.profile-container {
  max-width: 1000px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.profile-avatar {
  position: relative;
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 4px solid var(--accent-primary);
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--accent-primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
}

.avatar-edit-btn:hover {
  transform: scale(1.1);
}

.profile-info h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.user-role {
  color: var(--accent-primary);
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xs);
}

.member-since {
  color: var(--text-secondary);
}

.profile-tabs {
  display: flex;
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: none;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.tab-btn:hover {
  background: var(--button-hover);
  color: var(--text-primary);
}

.tab-btn.active {
  background: var(--accent-primary);
  color: white;
}

.tab-content {
  min-height: 400px;
}

.section-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
  margin-bottom: var(--spacing-xl);
}

.section-card h2 {
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

.form-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
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
}

.preference-group {
  margin-bottom: var(--spacing-2xl);
}

.preference-group h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.preference-item {
  margin-bottom: var(--spacing-lg);
}

.switch-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  cursor: pointer;
  font-weight: 600;
  color: var(--text-primary);
}

.switch {
  position: relative;
  width: 50px;
  height: 24px;
  background: var(--border-color);
  border-radius: 12px;
  transition: background var(--transition-normal);
}

.switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform var(--transition-normal);
}

input[type="checkbox"]:checked + .switch {
  background: var(--accent-primary);
}

input[type="checkbox"]:checked + .switch::after {
  transform: translateX(26px);
}

input[type="checkbox"] {
  display: none;
}

.preference-item p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: var(--spacing-xs);
  margin-left: 66px;
}

.two-factor-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xl);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.two-factor-status {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.two-factor-status i {
  font-size: 2rem;
}

.text-success {
  color: #27ae60;
}

.text-warning {
  color: #f39c12;
}

.two-factor-status h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.two-factor-status p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  max-width: 400px;
  width: 90%;
}

.modal-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.image-upload-area {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-tabs {
    flex-direction: column;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .two-factor-section {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }
}
</style>
