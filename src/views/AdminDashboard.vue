<template>
  <div class="admin-dashboard">
    <!-- Sidebar Navigation -->
    <aside class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo-container">
          <img :src="require('@/assets/images/DiMarcos-Barber-Shop-2.jpg')" alt="Elite Barber Shop" class="sidebar-logo" />
          <span v-if="!sidebarCollapsed" class="sidebar-title">Admin Portal</span>
        </div>
        <button @click="toggleSidebar" class="sidebar-toggle">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <a @click="setActiveSection('overview')"
           :class="{ 'active': activeSection === 'overview' }"
           class="nav-item">
          <i class="fas fa-tachometer-alt"></i>
          <span v-if="!sidebarCollapsed">Overview</span>
        </a>
        <a @click="setActiveSection('appointments')"
           :class="{ 'active': activeSection === 'appointments' }"
           class="nav-item">
          <i class="fas fa-calendar-alt"></i>
          <span v-if="!sidebarCollapsed">Appointments</span>
        </a>
        <a @click="setActiveSection('employees')"
           :class="{ 'active': activeSection === 'employees' }"
           class="nav-item">
          <i class="fas fa-user-tie"></i>
          <span v-if="!sidebarCollapsed">Staff</span>
        </a>
        <a @click="setActiveSection('customers')"
           :class="{ 'active': activeSection === 'customers' }"
           class="nav-item">
          <i class="fas fa-users"></i>
          <span v-if="!sidebarCollapsed">Customers</span>
        </a>
        <a @click="setActiveSection('services')"
           :class="{ 'active': activeSection === 'services' }"
           class="nav-item">
          <i class="fas fa-cut"></i>
          <span v-if="!sidebarCollapsed">Services</span>
        </a>
        <a @click="setActiveSection('reports')"
           :class="{ 'active': activeSection === 'reports' }"
           class="nav-item">
          <i class="fas fa-chart-bar"></i>
          <span v-if="!sidebarCollapsed">Analytics</span>
        </a>
        <a @click="setActiveSection('schedule')"
           :class="{ 'active': activeSection === 'schedule' }"
           class="nav-item">
          <i class="fas fa-calendar-week"></i>
          <span v-if="!sidebarCollapsed">Schedule</span>
        </a>
        <a @click="setActiveSection('settings')"
           :class="{ 'active': activeSection === 'settings' }"
           class="nav-item">
          <i class="fas fa-cog"></i>
          <span v-if="!sidebarCollapsed">Settings</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <div class="user-profile" :class="{ 'collapsed': sidebarCollapsed }">
          <img :src="require('@/assets/images/34428106.jpg')" alt="Admin" class="user-avatar" />
          <div v-if="!sidebarCollapsed" class="user-info">
            <span class="user-name">Admin User</span>
            <span class="user-role">Administrator</span>
          </div>
        </div>
        <button @click="logout" class="logout-btn" :title="sidebarCollapsed ? 'Logout' : ''">
          <i class="fas fa-sign-out-alt"></i>
          <span v-if="!sidebarCollapsed">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Header -->
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">{{ getSectionTitle() }}</h1>
          <p class="page-subtitle">{{ getSectionSubtitle() }}</p>
        </div>
        <div class="header-right">
          <div class="header-actions">
            <button @click="toggleTheme" class="theme-toggle" :title="`Switch to ${isDark ? 'light' : 'dark'} mode`">
              <i :class="themeIcon"></i>
            </button>
            <div class="notifications">
              <button class="notification-btn">
                <i class="fas fa-bell"></i>
                <span class="notification-badge">3</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="dashboard-content">
        <!-- Overview Section -->
        <div v-if="activeSection === 'overview'" class="section overview-section">
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon appointments">
                <i class="fas fa-calendar-check"></i>
              </div>
              <div class="stat-content">
                <h3>{{ stats.todayAppointments }}</h3>
                <p>Today's Appointments</p>
                <span class="stat-change positive">+12%</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon revenue">
                <i class="fas fa-dollar-sign"></i>
              </div>
              <div class="stat-content">
                <h3>${{ stats.monthlyRevenue }}</h3>
                <p>Monthly Revenue</p>
                <span class="stat-change positive">+8%</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon customers">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-content">
                <h3>{{ stats.totalCustomers }}</h3>
                <p>Total Customers</p>
                <span class="stat-change positive">+15%</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon staff">
                <i class="fas fa-user-tie"></i>
              </div>
              <div class="stat-content">
                <h3>{{ stats.activeEmployees }}</h3>
                <p>Active Staff</p>
                <span class="stat-change neutral">0%</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions-grid">
            <button @click="setActiveSection('appointments')" class="action-card">
              <i class="fas fa-plus"></i>
              <span>New Appointment</span>
            </button>
            <button @click="setActiveSection('employees')" class="action-card">
              <i class="fas fa-user-plus"></i>
              <span>Add Staff</span>
            </button>
            <button @click="setActiveSection('services')" class="action-card">
              <i class="fas fa-cut"></i>
              <span>Manage Services</span>
            </button>
            <button @click="setActiveSection('reports')" class="action-card">
              <i class="fas fa-chart-bar"></i>
              <span>View Reports</span>
            </button>
          </div>

          <!-- Recent Activity -->
          <div class="recent-activity">
            <h3>Recent Activity</h3>
            <div class="activity-list">
              <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
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
        </div>

        <!-- Other Sections -->
        <div v-if="activeSection === 'appointments'" class="section appointments-section">
          <h3>Appointment Management</h3>
          <p>Manage all appointments and bookings</p>
        </div>

        <div v-if="activeSection === 'employees'" class="section employees-section">
          <h3>Staff Management</h3>
          <p>Manage staff members and their schedules</p>
        </div>

        <div v-if="activeSection === 'customers'" class="section customers-section">
          <h3>Customer Management</h3>
          <p>View and manage customer information</p>
        </div>

        <div v-if="activeSection === 'services'" class="section services-section">
          <h3>Service Management</h3>
          <p>Manage services and pricing</p>
        </div>

        <div v-if="activeSection === 'reports'" class="section reports-section">
          <h3>Analytics & Reports</h3>
          <p>View business analytics and generate reports</p>
        </div>

        <div v-if="activeSection === 'schedule'" class="section schedule-section">
          <h3>Schedule Management</h3>
          <p>View and manage staff schedules</p>
          <router-link to="/view-schedule" class="btn btn-primary">
            <i class="fas fa-calendar-week"></i>
            View Full Schedule
          </router-link>
        </div>

        <div v-if="activeSection === 'settings'" class="section settings-section">
          <h3>System Settings</h3>
          <p>Configure system settings and preferences</p>
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

// Reactive data
const sidebarCollapsed = ref(false)
const activeSection = ref('overview')

// Stats data
const stats = ref({
  todayAppointments: 24,
  monthlyRevenue: 15420,
  totalCustomers: 1250,
  activeEmployees: 8
})

// Recent activity data
const recentActivity = ref([
  {
    id: 1,
    icon: 'fas fa-calendar-plus',
    description: 'New appointment booked by John Doe',
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: 2,
    icon: 'fas fa-user-plus',
    description: 'New customer registered: Jane Smith',
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: 3,
    icon: 'fas fa-star',
    description: 'Mike Johnson left a 5-star review',
    timestamp: new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
  },
  {
    id: 4,
    icon: 'fas fa-dollar-sign',
    description: 'Payment received: $85.00',
    timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
  }
])

// Methods
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const setActiveSection = (section) => {
  activeSection.value = section
}

const getSectionTitle = () => {
  const titles = {
    overview: 'Dashboard Overview',
    appointments: 'Appointment Management',
    employees: 'Staff Management',
    customers: 'Customer Management',
    services: 'Service Management',
    reports: 'Analytics & Reports',
    schedule: 'Schedule Management',
    settings: 'System Settings'
  }
  return titles[activeSection.value] || 'Dashboard'
}

const getSectionSubtitle = () => {
  const subtitles = {
    overview: 'Welcome to your admin dashboard',
    appointments: 'Manage all appointments and bookings',
    employees: 'Manage staff members and schedules',
    customers: 'View and manage customer information',
    services: 'Manage services and pricing',
    reports: 'View business analytics and reports',
    schedule: 'View and manage staff schedules',
    settings: 'Configure system settings'
  }
  return subtitles[activeSection.value] || ''
}

const formatTime = (timestamp) => {
  const now = new Date()
  const diff = now - timestamp
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else {
    return timestamp.toLocaleDateString()
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
    if (user.role !== 'admin' && user.role !== 'manager') {
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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.sidebar-logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  object-fit: cover;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.sidebar-toggle:hover {
  background: var(--button-hover);
  color: var(--text-primary);
}

.sidebar-nav {
  flex: 1;
  padding: var(--spacing-lg) 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 500;
}

.nav-item:hover {
  background: var(--button-hover);
  color: var(--text-primary);
}

.nav-item.active {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  font-weight: 600;
}

.nav-item i {
  width: 20px;
  text-align: center;
  font-size: 1.1rem;
}

.sidebar-footer {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.user-profile.collapsed {
  justify-content: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.user-role {
  display: block;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.logout-btn {
  width: 100%;
  padding: var(--spacing-sm);
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: 0.9rem;
}

.logout-btn:hover {
  background: #dc3545;
  border-color: #dc3545;
  color: white;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.sidebar.collapsed + .main-content {
  margin-left: 80px;
}

.top-header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: var(--spacing-lg) var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
}

.header-left h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-xs) 0;
}

.header-left p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.95rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.theme-toggle,
.notification-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.theme-toggle:hover,
.notification-btn:hover {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
  transform: translateY(-2px);
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

/* Dashboard Content */
.dashboard-content {
  flex: 1;
  padding: var(--spacing-xl);
  overflow-y: auto;
}

.section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-icon.appointments {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.revenue {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-icon.customers {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-icon.staff {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-xs) 0;
}

.stat-content p {
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-change {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
}

.stat-change.positive {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.stat-change.neutral {
  background: rgba(156, 163, 175, 0.1);
  color: #9ca3af;
}

/* Quick Actions Grid */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.action-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: var(--text-secondary);
}

.action-card:hover {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
}

.action-card i {
  font-size: 1.5rem;
}

.action-card span {
  font-weight: 600;
  font-size: 0.9rem;
}

/* Recent Activity */
.recent-activity {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: var(--spacing-xl);
}

.recent-activity h3 {
  color: var(--text-primary);
  margin: 0 0 var(--spacing-lg) 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.activity-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: var(--button-hover);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.activity-time {
  color: var(--text-muted);
  font-size: 0.8rem;
}

/* Other Sections */
.section h3 {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 var(--spacing-md) 0;
}

.section p {
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-lg) 0;
}

.btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    width: 80px;
  }

  .sidebar-title,
  .nav-item span,
  .user-info,
  .logout-btn span {
    display: none;
  }

  .main-content {
    margin-left: 80px;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    z-index: 1000;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .top-header {
    padding: var(--spacing-md) var(--spacing-lg);
  }

  .header-left h1 {
    font-size: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-content {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .quick-actions-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: var(--spacing-lg);
  }

  .stat-content h3 {
    font-size: 1.5rem;
  }
}
</style>
