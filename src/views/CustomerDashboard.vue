<template>
  <div class="customer-dashboard">
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <div class="welcome-section">
          <h1>Welcome back, {{ user?.name }}!</h1>
          <p>Manage your appointments and profile</p>
        </div>
        <div class="quick-actions">
          <router-link to="/booking" class="btn btn-primary">
            <i class="fas fa-calendar-plus"></i>
            Book Appointment
          </router-link>
          <button @click="logout" class="btn btn-secondary">
            <i class="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.totalAppointments }}</h3>
            <p>Total Appointments</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.upcomingAppointments }}</h3>
            <p>Upcoming</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.loyaltyPoints }}</h3>
            <p>Loyalty Points</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div class="stat-content">
            <h3>${{ stats.totalSpent }}</h3>
            <p>Total Spent</p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="dashboard-content">
        <!-- Upcoming Appointments -->
        <div class="content-section">
          <div class="section-header">
            <h2>Upcoming Appointments</h2>
            <router-link to="/booking" class="btn btn-outline">
              <i class="fas fa-plus"></i>
              New Appointment
            </router-link>
          </div>
          <div class="appointments-list">
            <div class="appointment-card" v-for="appointment in upcomingAppointments" :key="appointment.id">
              <div class="appointment-date">
                <span class="day">{{ formatDay(appointment.date) }}</span>
                <span class="month">{{ formatMonth(appointment.date) }}</span>
              </div>
              <div class="appointment-details">
                <h3>{{ appointment.service }}</h3>
                <p class="stylist">with {{ appointment.stylist }}</p>
                <p class="time">
                  <i class="fas fa-clock"></i>
                  {{ appointment.time }}
                </p>
              </div>
              <div class="appointment-actions">
                <button class="btn btn-sm btn-outline">Reschedule</button>
                <button class="btn btn-sm btn-danger">Cancel</button>
              </div>
            </div>
            <div class="empty-state" v-if="upcomingAppointments.length === 0">
              <i class="fas fa-calendar"></i>
              <p>No upcoming appointments</p>
              <router-link to="/booking" class="btn btn-primary">Book Your First Appointment</router-link>
            </div>
          </div>
        </div>

        <!-- Recent History -->
        <div class="content-section">
          <div class="section-header">
            <h2>Recent History</h2>
            <button class="btn btn-outline">View All</button>
          </div>
          <div class="history-list">
            <div class="history-item" v-for="item in recentHistory" :key="item.id">
              <div class="history-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="history-details">
                <h4>{{ item.service }}</h4>
                <p>{{ item.stylist }} • {{ formatDate(item.date) }}</p>
              </div>
              <div class="history-rating">
                <div class="stars">
                  <i v-for="n in 5" :key="n" 
                     :class="n <= item.rating ? 'fas fa-star' : 'far fa-star'"></i>
                </div>
                <span>${{ item.price }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Section -->
        <div class="content-section">
          <div class="section-header">
            <h2>Profile Information</h2>
            <button class="btn btn-outline">Edit Profile</button>
          </div>
          <div class="profile-card">
            <div class="profile-info">
              <div class="info-item">
                <i class="fas fa-user"></i>
                <div>
                  <strong>Full Name</strong>
                  <span>{{ user?.name }}</span>
                </div>
              </div>
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <strong>Email</strong>
                  <span>{{ user?.email }}</span>
                </div>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <div>
                  <strong>Phone</strong>
                  <span>{{ user?.phone || '(555) 123-4567' }}</span>
                </div>
              </div>
              <div class="info-item">
                <i class="fas fa-calendar"></i>
                <div>
                  <strong>Member Since</strong>
                  <span>{{ formatDate(user?.memberSince || new Date()) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

const stats = ref({
  totalAppointments: 12,
  upcomingAppointments: 2,
  loyaltyPoints: 450,
  totalSpent: 680
})

const upcomingAppointments = ref([
  {
    id: 1,
    service: 'Classic Haircut',
    stylist: 'Marcus Johnson',
    date: '2024-08-05',
    time: '2:00 PM'
  },
  {
    id: 2,
    service: 'Beard Trim & Shape',
    stylist: 'David Rodriguez',
    date: '2024-08-12',
    time: '10:30 AM'
  }
])

const recentHistory = ref([
  {
    id: 1,
    service: 'Hot Towel Shave',
    stylist: 'Anthony Williams',
    date: '2024-07-20',
    rating: 5,
    price: 45
  },
  {
    id: 2,
    service: 'Classic Haircut',
    stylist: 'Marcus Johnson',
    date: '2024-07-05',
    rating: 4,
    price: 35
  },
  {
    id: 3,
    service: 'Full Service Package',
    stylist: 'David Rodriguez',
    date: '2024-06-18',
    rating: 5,
    price: 85
  }
])

const formatDay = (dateString) => {
  return new Date(dateString).getDate()
}

const formatMonth = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short' })
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(() => {
  // Load user data from localStorage
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  } else {
    router.push('/login')
  }
})
</script>

<style scoped>
.customer-dashboard {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 100px var(--spacing-lg) var(--spacing-2xl);
}

.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 2px solid var(--border-color);
}

.welcome-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.welcome-section p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.quick-actions {
  display: flex;
  gap: var(--spacing-md);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.stat-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: 0 4px 20px var(--shadow-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.stat-icon {
  font-size: 2.5rem;
  color: var(--accent-primary);
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.stat-content p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.dashboard-content {
  display: grid;
  gap: var(--spacing-2xl);
}

.content-section {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.appointments-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.appointment-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

.appointment-card:hover {
  border-color: var(--accent-primary);
  background: var(--button-hover);
}

.appointment-date {
  text-align: center;
  min-width: 60px;
}

.appointment-date .day {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-primary);
}

.appointment-date .month {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.appointment-details {
  flex: 1;
}

.appointment-details h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.appointment-details .stylist {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.appointment-details .time {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--accent-primary);
  font-weight: 500;
}

.appointment-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: var(--spacing-lg);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.history-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.history-item:last-child {
  border-bottom: none;
}

.history-icon {
  color: #27ae60;
  font-size: 1.2rem;
}

.history-details {
  flex: 1;
}

.history-details h4 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.history-details p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.history-rating {
  text-align: right;
}

.stars {
  color: var(--accent-primary);
  margin-bottom: var(--spacing-xs);
}

.history-rating span {
  font-weight: 600;
  color: var(--text-primary);
}

.profile-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.profile-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.info-item i {
  font-size: 1.2rem;
  color: var(--accent-primary);
  width: 20px;
}

.info-item strong {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.info-item span {
  color: var(--text-secondary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  .welcome-section h1 {
    font-size: 2rem;
  }
  
  .quick-actions {
    justify-content: center;
  }
  
  .appointment-card {
    flex-direction: column;
    text-align: center;
  }
  
  .appointment-actions {
    justify-content: center;
  }
  
  .profile-info {
    grid-template-columns: 1fr;
  }
}
</style>
