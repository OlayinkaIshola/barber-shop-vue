<template>
  <div class="employee-dashboard">
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <div class="welcome-section">
          <h1>Welcome, {{ user?.name }}!</h1>
          <p>Manage your schedule and clients</p>
        </div>
        <div class="quick-actions">
          <router-link to="/view-schedule" class="btn btn-primary">
            <i class="fas fa-calendar-check"></i>
            View Schedule
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
            <i class="fas fa-calendar-day"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.todayAppointments }}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.totalClients }}</h3>
            <p>Total Clients</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.averageRating }}</h3>
            <p>Average Rating</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div class="stat-content">
            <h3>${{ stats.monthlyEarnings }}</h3>
            <p>This Month</p>
          </div>
        </div>
      </div>

      <!-- Today's Schedule -->
      <div class="content-section">
        <div class="section-header">
          <h2>Today's Schedule</h2>
          <span class="date">{{ formatToday() }}</span>
        </div>
        <div class="schedule-list">
          <div class="schedule-item" v-for="appointment in todaySchedule" :key="appointment.id">
            <div class="time-slot">
              <span class="time">{{ appointment.time }}</span>
              <span class="duration">{{ appointment.duration }}min</span>
            </div>
            <div class="appointment-info">
              <h3>{{ appointment.service }}</h3>
              <p class="client">{{ appointment.client }}</p>
              <p class="phone">{{ appointment.phone }}</p>
            </div>
            <div class="appointment-status">
              <span :class="['status', appointment.status]">{{ appointment.status }}</span>
              <div class="actions">
                <button class="btn btn-sm btn-outline">Contact</button>
                <button class="btn btn-sm btn-primary">Complete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Reviews -->
      <div class="content-section">
        <div class="section-header">
          <h2>Recent Reviews</h2>
          <button class="btn btn-outline">View All</button>
        </div>
        <div class="reviews-list">
          <div class="review-item" v-for="review in recentReviews" :key="review.id">
            <div class="review-rating">
              <div class="stars">
                <i v-for="n in 5" :key="n" 
                   :class="n <= review.rating ? 'fas fa-star' : 'far fa-star'"></i>
              </div>
            </div>
            <div class="review-content">
              <p>"{{ review.comment }}"</p>
              <div class="review-meta">
                <strong>{{ review.client }}</strong>
                <span>{{ formatDate(review.date) }}</span>
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
  todayAppointments: 8,
  totalClients: 156,
  averageRating: 4.8,
  monthlyEarnings: 3250
})

const todaySchedule = ref([
  {
    id: 1,
    time: '9:00 AM',
    duration: 45,
    service: 'Classic Haircut',
    client: 'John Smith',
    phone: '(555) 123-4567',
    status: 'confirmed'
  },
  {
    id: 2,
    time: '10:00 AM',
    duration: 30,
    service: 'Beard Trim',
    client: 'Mike Johnson',
    phone: '(555) 234-5678',
    status: 'in-progress'
  },
  {
    id: 3,
    time: '11:30 AM',
    duration: 60,
    service: 'Hot Towel Shave',
    client: 'David Wilson',
    phone: '(555) 345-6789',
    status: 'pending'
  }
])

const recentReviews = ref([
  {
    id: 1,
    rating: 5,
    comment: 'Excellent service! Marcus always knows exactly what I want.',
    client: 'Robert Davis',
    date: '2024-07-30'
  },
  {
    id: 2,
    rating: 4,
    comment: 'Great haircut and friendly service. Will definitely come back.',
    client: 'James Wilson',
    date: '2024-07-28'
  }
])

const formatToday = () => {
  return new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
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
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  } else {
    router.push('/login')
  }
})
</script>

<style scoped>
.employee-dashboard {
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

.content-section {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
  margin-bottom: var(--spacing-2xl);
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

.date {
  color: var(--text-secondary);
  font-weight: 500;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.time-slot {
  text-align: center;
  min-width: 80px;
}

.time-slot .time {
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent-primary);
}

.time-slot .duration {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.appointment-info {
  flex: 1;
}

.appointment-info h3 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.appointment-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-xs);
}

.appointment-status {
  text-align: right;
}

.status {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: var(--spacing-sm);
}

.status.confirmed { background: #d4edda; color: #155724; }
.status.in-progress { background: #fff3cd; color: #856404; }
.status.pending { background: #f8d7da; color: #721c24; }

.actions {
  display: flex;
  gap: var(--spacing-sm);
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.review-item {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.review-item:last-child {
  border-bottom: none;
}

.review-rating .stars {
  color: var(--accent-primary);
}

.review-content {
  flex: 1;
}

.review-content p {
  color: var(--text-primary);
  font-style: italic;
  margin-bottom: var(--spacing-sm);
}

.review-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-meta strong {
  color: var(--text-primary);
}

.review-meta span {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  .schedule-item {
    flex-direction: column;
    text-align: center;
  }
  
  .actions {
    justify-content: center;
  }
}
</style>
