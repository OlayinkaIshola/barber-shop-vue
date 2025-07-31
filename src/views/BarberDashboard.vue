<template>
  <div class="barber-dashboard">
    <!-- Dashboard Navigation -->
    <nav class="dashboard-nav">
      <div class="nav-brand">
        <img src="@/assets/images/barber-work-side-view-young-bearded-men-getting-haircut-hairdresser-sitting-chair-barbershop-70127409.webp" 
             alt="Elite Barber Shop" class="nav-logo" />
        <span class="nav-title">Barber Portal</span>
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
        <a href="#clients" class="nav-link">
          <i class="fas fa-users"></i>
          <span>Clients</span>
        </a>
        <a href="#schedule" class="nav-link">
          <i class="fas fa-clock"></i>
          <span>Schedule</span>
        </a>
        <a href="#earnings" class="nav-link">
          <i class="fas fa-dollar-sign"></i>
          <span>Earnings</span>
        </a>
      </div>
      
      <div class="nav-profile">
        <div class="profile-info">
          <img src="@/assets/images/barber-work-side-view-young-bearded-men-getting-haircut-hairdresser-sitting-chair-barbershop-70127409.webp" alt="Profile" class="profile-avatar" />
          <div class="profile-details">
            <span class="profile-name">Marcus Johnson</span>
            <span class="profile-role">Master Barber</span>
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
      <!-- Stats Overview -->
      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon appointments">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="stat-content">
              <h3>Today's Appointments</h3>
              <div class="stat-number">8</div>
              <div class="stat-change positive">+2 from yesterday</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon earnings">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <div class="stat-content">
              <h3>Today's Earnings</h3>
              <div class="stat-number">$420</div>
              <div class="stat-change positive">+15% from yesterday</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon clients">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-content">
              <h3>Total Clients</h3>
              <div class="stat-number">156</div>
              <div class="stat-change positive">+3 this week</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon rating">
              <i class="fas fa-star"></i>
            </div>
            <div class="stat-content">
              <h3>Average Rating</h3>
              <div class="stat-number">4.9</div>
              <div class="stat-change neutral">Based on 45 reviews</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Today's Schedule -->
      <section class="schedule-section">
        <div class="section-header">
          <h2>Today's Schedule</h2>
          <div class="header-actions">
            <button class="btn btn-outline">
              <i class="fas fa-plus"></i>
              Add Appointment
            </button>
            <button class="btn btn-primary">
              <i class="fas fa-calendar"></i>
              View Full Calendar
            </button>
          </div>
        </div>
        
        <div class="appointments-list">
          <div class="appointment-card" v-for="appointment in todayAppointments" :key="appointment.id">
            <div class="appointment-time">
              <div class="time">{{ appointment.time }}</div>
              <div class="duration">{{ appointment.duration }} min</div>
            </div>
            <div class="appointment-details">
              <div class="client-info">
                <img :src="appointment.clientAvatar" :alt="appointment.clientName" class="client-avatar" />
                <div class="client-details">
                  <h4>{{ appointment.clientName }}</h4>
                  <p>{{ appointment.service }}</p>
                </div>
              </div>
              <div class="appointment-meta">
                <span class="price">${{ appointment.price }}</span>
                <span :class="['status', appointment.status.toLowerCase()]">{{ appointment.status }}</span>
              </div>
            </div>
            <div class="appointment-actions">
              <button class="action-btn">
                <i class="fas fa-phone"></i>
              </button>
              <button class="action-btn">
                <i class="fas fa-comment"></i>
              </button>
              <button class="action-btn">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="quick-actions-section">
        <div class="section-header">
          <h2>Quick Actions</h2>
        </div>
        
        <div class="actions-grid">
          <button class="action-card">
            <i class="fas fa-user-plus"></i>
            <h3>Add New Client</h3>
            <p>Register a new client to the system</p>
          </button>
          
          <button class="action-card">
            <i class="fas fa-calendar-plus"></i>
            <h3>Book Appointment</h3>
            <p>Schedule a new appointment</p>
          </button>
          
          <button class="action-card">
            <i class="fas fa-chart-line"></i>
            <h3>View Analytics</h3>
            <p>Check your performance metrics</p>
          </button>
          
          <button class="action-card">
            <i class="fas fa-cog"></i>
            <h3>Settings</h3>
            <p>Manage your preferences</p>
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { isDark, themeIcon, toggleTheme } = useTheme()

const todayAppointments = ref([
  {
    id: 1,
    time: '09:00',
    duration: 45,
    clientName: 'John Smith',
    clientAvatar: '/src/assets/images/client1.jpg',
    service: 'Classic Haircut',
    price: 35,
    status: 'Confirmed'
  },
  {
    id: 2,
    time: '10:00',
    duration: 60,
    clientName: 'Mike Johnson',
    clientAvatar: '/src/assets/images/client2.jpg',
    service: 'Haircut + Beard Trim',
    price: 55,
    status: 'In Progress'
  },
  {
    id: 3,
    time: '11:30',
    duration: 30,
    clientName: 'David Wilson',
    clientAvatar: '/src/assets/images/client3.jpg',
    service: 'Beard Trim',
    price: 25,
    status: 'Confirmed'
  },
  {
    id: 4,
    time: '14:00',
    duration: 45,
    clientName: 'Robert Brown',
    clientAvatar: '/src/assets/images/client4.jpg',
    service: 'Classic Haircut',
    price: 35,
    status: 'Pending'
  }
])

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/barber-login')
}
</script>

<style scoped>
.barber-dashboard {
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

/* Stats Section */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.stat-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  box-shadow: 0 2px 10px var(--shadow-color);
  transition: transform var(--transition-normal);
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-icon.appointments { background: linear-gradient(135deg, #3498db, #2980b9); }
.stat-icon.earnings { background: linear-gradient(135deg, #2ecc71, #27ae60); }
.stat-icon.clients { background: linear-gradient(135deg, #e74c3c, #c0392b); }
.stat-icon.rating { background: linear-gradient(135deg, #f39c12, #e67e22); }

.stat-content h3 {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.stat-change {
  font-size: 0.75rem;
}

.stat-change.positive { color: #2ecc71; }
.stat-change.negative { color: #e74c3c; }
.stat-change.neutral { color: var(--text-secondary); }

/* Section Headers */
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

.header-actions {
  display: flex;
  gap: var(--spacing-md);
}

/* Appointments List */
.appointments-list {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 2px 10px var(--shadow-color);
}

.appointment-card {
  display: flex;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  transition: background var(--transition-normal);
}

.appointment-card:last-child {
  border-bottom: none;
}

.appointment-card:hover {
  background: var(--bg-secondary);
}

.appointment-time {
  min-width: 80px;
  text-align: center;
  margin-right: var(--spacing-lg);
}

.time {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.duration {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.appointment-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.client-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.client-details h4 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.client-details p {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.appointment-meta {
  text-align: right;
}

.price {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--accent-primary);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.status {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  font-weight: 600;
}

.status.confirmed { background: rgba(46, 204, 113, 0.2); color: #27ae60; }
.status.pending { background: rgba(243, 156, 18, 0.2); color: #e67e22; }
.status.in-progress { background: rgba(52, 152, 219, 0.2); color: #2980b9; }

.appointment-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-left: var(--spacing-lg);
}

/* Quick Actions */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
}

.action-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px var(--shadow-color);
  border-color: var(--accent-primary);
}

.action-card i {
  font-size: 2rem;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-md);
}

.action-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.action-card p {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard-nav {
    width: 250px;
  }
  
  .dashboard-main {
    margin-left: 250px;
  }
}

@media (max-width: 768px) {
  .dashboard-nav {
    transform: translateX(-100%);
    transition: transform var(--transition-normal);
  }
  
  .dashboard-nav.open {
    transform: translateX(0);
  }
  
  .dashboard-main {
    margin-left: 0;
    padding: var(--spacing-lg);
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .header-actions {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .appointment-card {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }
  
  .appointment-details {
    width: 100%;
  }
}
</style>
