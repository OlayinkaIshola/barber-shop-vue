<template>
  <div class="admin-dashboard">
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <div class="welcome-section">
          <h1>Admin Dashboard</h1>
          <p>Manage your barber shop operations</p>
        </div>
        <div class="quick-actions">
          <button class="btn btn-primary">
            <i class="fas fa-plus"></i>
            Add Employee
          </button>
          <button @click="logout" class="btn btn-secondary">
            <i class="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-calendar-check"></i>
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
            <h3>{{ stats.totalCustomers }}</h3>
            <p>Total Customers</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-user-tie"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.activeEmployees }}</h3>
            <p>Active Employees</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="stat-content">
            <h3>${{ stats.monthlyRevenue }}</h3>
            <p>Monthly Revenue</p>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="content-section">
        <div class="section-header">
          <h2>Recent Activity</h2>
          <button class="btn btn-outline">View All</button>
        </div>
        <div class="activity-list">
          <div class="activity-item" v-for="activity in recentActivity" :key="activity.id">
            <div class="activity-icon">
              <i :class="activity.icon"></i>
            </div>
            <div class="activity-content">
              <p>{{ activity.description }}</p>
              <span class="activity-time">{{ formatTime(activity.timestamp) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Employee Performance -->
      <div class="content-section">
        <div class="section-header">
          <h2>Employee Performance</h2>
          <button class="btn btn-outline">Detailed Report</button>
        </div>
        <div class="performance-list">
          <div class="performance-item" v-for="employee in employeePerformance" :key="employee.id">
            <div class="employee-info">
              <img :src="employee.avatar" :alt="employee.name" />
              <div>
                <h4>{{ employee.name }}</h4>
                <p>{{ employee.role }}</p>
              </div>
            </div>
            <div class="performance-stats">
              <div class="stat">
                <span class="stat-label">Appointments</span>
                <span class="stat-value">{{ employee.appointments }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Rating</span>
                <span class="stat-value">{{ employee.rating }}/5</span>
              </div>
              <div class="stat">
                <span class="stat-label">Revenue</span>
                <span class="stat-value">${{ employee.revenue }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="content-section">
        <div class="section-header">
          <h2>Business Insights</h2>
        </div>
        <div class="insights-grid">
          <div class="insight-card">
            <h4>Peak Hours</h4>
            <p>2:00 PM - 4:00 PM</p>
            <small>Highest booking volume</small>
          </div>
          <div class="insight-card">
            <h4>Popular Service</h4>
            <p>Classic Haircut</p>
            <small>45% of all bookings</small>
          </div>
          <div class="insight-card">
            <h4>Customer Retention</h4>
            <p>78%</p>
            <small>Return customer rate</small>
          </div>
          <div class="insight-card">
            <h4>Average Rating</h4>
            <p>4.8/5</p>
            <small>Customer satisfaction</small>
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

const stats = ref({
  todayAppointments: 24,
  totalCustomers: 1250,
  activeEmployees: 6,
  monthlyRevenue: 18500
})

const recentActivity = ref([
  {
    id: 1,
    icon: 'fas fa-user-plus',
    description: 'New customer John Doe registered',
    timestamp: new Date(Date.now() - 300000) // 5 minutes ago
  },
  {
    id: 2,
    icon: 'fas fa-calendar-check',
    description: 'Appointment completed by Marcus Johnson',
    timestamp: new Date(Date.now() - 900000) // 15 minutes ago
  },
  {
    id: 3,
    icon: 'fas fa-star',
    description: 'New 5-star review received',
    timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
  }
])

const employeePerformance = ref([
  {
    id: 1,
    name: 'Marcus Johnson',
    role: 'Master Barber',
    avatar: '/src/assets/images/34428106.jpg',
    appointments: 45,
    rating: 4.9,
    revenue: 2250
  },
  {
    id: 2,
    name: 'David Rodriguez',
    role: 'Senior Stylist',
    avatar: '/src/assets/images/37603.jpg',
    appointments: 38,
    rating: 4.8,
    revenue: 1900
  },
  {
    id: 3,
    name: 'Anthony Williams',
    role: 'Style Specialist',
    avatar: '/src/assets/images/900.jpg',
    appointments: 32,
    rating: 4.7,
    revenue: 1600
  }
])

const formatTime = (timestamp) => {
  const now = new Date()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 60) {
    return `${minutes} minutes ago`
  } else {
    const hours = Math.floor(minutes / 60)
    return `${hours} hours ago`
  }
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
    const user = JSON.parse(userData)
    if (user.role !== 'admin') {
      router.push('/customer-dashboard')
    }
  } else {
    router.push('/login')
  }
})
</script>

<style scoped>
.admin-dashboard {
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

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.activity-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  font-size: 1.2rem;
  color: var(--accent-primary);
  width: 20px;
}

.activity-content p {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.activity-time {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.performance-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.performance-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
}

.employee-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.employee-info img {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.employee-info h4 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.employee-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.performance-stats {
  display: flex;
  gap: var(--spacing-xl);
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin-bottom: var(--spacing-xs);
}

.stat-value {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.1rem;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.insight-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
}

.insight-card h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.insight-card p {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-sm);
}

.insight-card small {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  .performance-item {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  .performance-stats {
    justify-content: center;
  }
}
</style>
