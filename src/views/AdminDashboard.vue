<template>
  <div class="admin-dashboard">
    <!-- Dashboard Navigation -->
    <nav class="dashboard-nav">
      <div class="nav-brand">
        <img src="@/assets/images/barber-work-side-view-young-bearded-men-getting-haircut-hairdresser-sitting-chair-barbershop-70127409.webp"
             alt="Elite Barber Shop" class="nav-logo" />
        <span class="nav-title">Admin Portal</span>
      </div>

      <div class="nav-menu">
        <a href="#overview" class="nav-link active">
          <i class="fas fa-tachometer-alt"></i>
          <span>Overview</span>
        </a>
        <a href="#appointments" class="nav-link">
          <i class="fas fa-calendar-alt"></i>
          <span>Appointments</span>
        </a>
        <a href="#employees" class="nav-link">
          <i class="fas fa-user-tie"></i>
          <span>Employees</span>
        </a>
        <a href="#customers" class="nav-link">
          <i class="fas fa-users"></i>
          <span>Customers</span>
        </a>
        <a href="#services" class="nav-link">
          <i class="fas fa-cut"></i>
          <span>Services</span>
        </a>
        <a href="#reports" class="nav-link">
          <i class="fas fa-chart-bar"></i>
          <span>Reports</span>
        </a>
        <a href="#settings" class="nav-link">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </a>
      </div>

      <div class="nav-profile">
        <div class="profile-info">
          <img src="@/assets/images/34428106.jpg" alt="Profile" class="profile-avatar" />
          <div class="profile-details">
            <span class="profile-name">Admin User</span>
            <span class="profile-role">System Administrator</span>
          </div>
        </div>
        <div class="profile-actions">
          <button @click="toggleTheme" class="action-btn" :title="`Switch to ${isDark ? 'light' : 'dark'} mode`">
            <i :class="themeIcon"></i>
          </button>
          <router-link to="/profile" class="action-btn">
            <i class="fas fa-user-cog"></i>
          </router-link>
          <button @click="logout" class="action-btn logout-btn">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="dashboard-main">
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
          <button class="btn btn-outline">
            <i class="fas fa-download"></i>
            Export Data
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
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { isDark, themeIcon, toggleTheme } = useTheme()

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
  display: flex;
  min-height: 100vh;
  background: var(--bg-primary);
}

/* Dashboard Navigation */
.dashboard-nav {
  width: 280px;
  background: var(--card-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.nav-brand {
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.nav-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.nav-menu {
  flex: 1;
  padding: var(--spacing-lg) 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-xl);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-normal);
  border-left: 3px solid transparent;
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent-primary);
  background: rgba(212, 175, 55, 0.1);
  border-left-color: var(--accent-primary);
}

.nav-link i {
  width: 20px;
  text-align: center;
}

.nav-profile {
  padding: var(--spacing-xl);
  border-top: 1px solid var(--border-color);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.profile-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-name {
  font-weight: 600;
  color: var(--text-primary);
  display: block;
}

.profile-role {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.profile-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.action-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: var(--bg-primary);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
}

.action-btn:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.logout-btn:hover {
  background: #e74c3c;
  border-color: #e74c3c;
}

/* Main Content */
.dashboard-main {
  flex: 1;
  margin-left: 280px;
  padding: var(--spacing-2xl);
  overflow-y: auto;
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
