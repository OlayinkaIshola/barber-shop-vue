<template>
  <div class="view-schedule">
    <NavigationControls />
    
    <div class="schedule-container">
      <!-- Header -->
      <div class="schedule-header">
        <div class="header-content">
          <h1>Staff Schedule</h1>
          <p>View and manage staff schedules and availability</p>
        </div>
        <div class="header-actions">
          <button @click="toggleView" class="view-toggle">
            <i :class="viewMode === 'week' ? 'fas fa-calendar-day' : 'fas fa-calendar-week'"></i>
            {{ viewMode === 'week' ? 'Day View' : 'Week View' }}
          </button>
          <div class="date-navigation">
            <button @click="previousPeriod" class="nav-btn">
              <i class="fas fa-chevron-left"></i>
            </button>
            <span class="current-period">{{ getCurrentPeriodLabel() }}</span>
            <button @click="nextPeriod" class="nav-btn">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Schedule Grid -->
      <div class="schedule-grid" :class="{ 'day-view': viewMode === 'day' }">
        <!-- Time Column -->
        <div class="time-column">
          <div class="time-header">Time</div>
          <div v-for="hour in timeSlots" :key="hour" class="time-slot">
            {{ formatTime(hour) }}
          </div>
        </div>

        <!-- Staff Columns -->
        <div v-for="staff in staffMembers" :key="staff.id" class="staff-column">
          <div class="staff-header">
            <img :src="staff.avatar" :alt="staff.name" class="staff-avatar" />
            <div class="staff-info">
              <h3>{{ staff.name }}</h3>
              <p>{{ staff.role }}</p>
            </div>
          </div>
          
          <!-- Schedule Slots -->
          <div class="schedule-slots">
            <div v-for="hour in timeSlots" :key="hour" class="schedule-slot">
              <div 
                v-for="appointment in getAppointmentsForSlot(staff.id, hour)" 
                :key="appointment.id"
                class="appointment"
                :class="appointment.status"
                @click="viewAppointment(appointment)"
              >
                <div class="appointment-time">{{ appointment.time }}</div>
                <div class="appointment-client">{{ appointment.clientName }}</div>
                <div class="appointment-service">{{ appointment.service }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="schedule-legend">
        <h3>Legend</h3>
        <div class="legend-items">
          <div class="legend-item">
            <div class="legend-color confirmed"></div>
            <span>Confirmed</span>
          </div>
          <div class="legend-item">
            <div class="legend-color pending"></div>
            <span>Pending</span>
          </div>
          <div class="legend-item">
            <div class="legend-color completed"></div>
            <span>Completed</span>
          </div>
          <div class="legend-item">
            <div class="legend-color cancelled"></div>
            <span>Cancelled</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Appointment Modal -->
    <div v-if="selectedAppointment" class="modal-overlay" @click="closeModal">
      <div class="appointment-modal" @click.stop>
        <div class="modal-header">
          <h3>Appointment Details</h3>
          <button @click="closeModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-content">
          <div class="appointment-details">
            <div class="detail-row">
              <label>Client:</label>
              <span>{{ selectedAppointment.clientName }}</span>
            </div>
            <div class="detail-row">
              <label>Service:</label>
              <span>{{ selectedAppointment.service }}</span>
            </div>
            <div class="detail-row">
              <label>Staff:</label>
              <span>{{ selectedAppointment.staffName }}</span>
            </div>
            <div class="detail-row">
              <label>Date & Time:</label>
              <span>{{ formatAppointmentDateTime(selectedAppointment) }}</span>
            </div>
            <div class="detail-row">
              <label>Duration:</label>
              <span>{{ selectedAppointment.duration }} minutes</span>
            </div>
            <div class="detail-row">
              <label>Price:</label>
              <span>${{ selectedAppointment.price }}</span>
            </div>
            <div class="detail-row">
              <label>Status:</label>
              <span class="status-badge" :class="selectedAppointment.status">
                {{ selectedAppointment.status }}
              </span>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="editAppointment" class="btn btn-primary">
            <i class="fas fa-edit"></i>
            Edit
          </button>
          <button @click="cancelAppointment" class="btn btn-danger">
            <i class="fas fa-times"></i>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavigationControls from '../components/NavigationControls.vue'

// Reactive data
const viewMode = ref('week') // 'week' or 'day'
const currentDate = ref(new Date())
const selectedAppointment = ref(null)

// Time slots (9 AM to 6 PM)
const timeSlots = ref([
  9, 10, 11, 12, 13, 14, 15, 16, 17, 18
])

// Staff members
const staffMembers = ref([
  {
    id: 1,
    name: 'Marcus Johnson',
    role: 'Master Barber',
    avatar: require('@/assets/images/34428106.jpg')
  },
  {
    id: 2,
    name: 'David Rodriguez',
    role: 'Senior Stylist',
    avatar: require('@/assets/images/37603.jpg')
  },
  {
    id: 3,
    name: 'Anthony Williams',
    role: 'Style Specialist',
    avatar: require('@/assets/images/900.jpg')
  },
  {
    id: 4,
    name: 'James Thompson',
    role: 'Barber',
    avatar: require('@/assets/images/barber-work-side-view-young-bearded-men-getting-haircut-hairdresser-sitting-chair-barbershop-70127409.webp')
  }
])

// Sample appointments
const appointments = ref([
  {
    id: 1,
    staffId: 1,
    clientName: 'John Doe',
    service: 'Classic Haircut',
    date: new Date(),
    time: '10:00',
    duration: 45,
    price: 35,
    status: 'confirmed',
    staffName: 'Marcus Johnson'
  },
  {
    id: 2,
    staffId: 1,
    clientName: 'Mike Smith',
    service: 'Beard Trim',
    date: new Date(),
    time: '11:00',
    duration: 30,
    price: 25,
    status: 'pending',
    staffName: 'Marcus Johnson'
  },
  {
    id: 3,
    staffId: 2,
    clientName: 'Robert Johnson',
    service: 'Hair Styling',
    date: new Date(),
    time: '14:00',
    duration: 60,
    price: 45,
    status: 'confirmed',
    staffName: 'David Rodriguez'
  },
  {
    id: 4,
    staffId: 3,
    clientName: 'William Brown',
    service: 'Shampoo & Cut',
    date: new Date(),
    time: '16:00',
    duration: 50,
    price: 40,
    status: 'completed',
    staffName: 'Anthony Williams'
  }
])

// Methods
const toggleView = () => {
  viewMode.value = viewMode.value === 'week' ? 'day' : 'week'
}

const previousPeriod = () => {
  if (viewMode.value === 'week') {
    currentDate.value.setDate(currentDate.value.getDate() - 7)
  } else {
    currentDate.value.setDate(currentDate.value.getDate() - 1)
  }
  currentDate.value = new Date(currentDate.value)
}

const nextPeriod = () => {
  if (viewMode.value === 'week') {
    currentDate.value.setDate(currentDate.value.getDate() + 7)
  } else {
    currentDate.value.setDate(currentDate.value.getDate() + 1)
  }
  currentDate.value = new Date(currentDate.value)
}

const getCurrentPeriodLabel = () => {
  if (viewMode.value === 'week') {
    const startOfWeek = new Date(currentDate.value)
    startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    
    return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`
  } else {
    return currentDate.value.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
}

const formatTime = (hour) => {
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:00 ${period}`
}

const getAppointmentsForSlot = (staffId, hour) => {
  return appointments.value.filter(appointment => {
    const appointmentHour = parseInt(appointment.time.split(':')[0])
    return appointment.staffId === staffId && appointmentHour === hour
  })
}

const viewAppointment = (appointment) => {
  selectedAppointment.value = appointment
}

const closeModal = () => {
  selectedAppointment.value = null
}

const formatAppointmentDateTime = (appointment) => {
  return `${appointment.date.toLocaleDateString()} at ${appointment.time}`
}

const editAppointment = () => {
  // Implement edit functionality
  console.log('Edit appointment:', selectedAppointment.value)
  closeModal()
}

const cancelAppointment = () => {
  // Implement cancel functionality
  if (selectedAppointment.value) {
    selectedAppointment.value.status = 'cancelled'
  }
  closeModal()
}
</script>

<style scoped>
.view-schedule {
  min-height: 100vh;
  background: var(--bg-primary);
  padding-top: 80px;
}

.schedule-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

/* Header */
.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.header-content h1 {
  color: var(--text-primary);
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 var(--spacing-sm) 0;
}

.header-content p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 1.1rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.view-toggle {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all 0.3s ease;
}

.view-toggle:hover {
  background: var(--accent-secondary);
  transform: translateY(-2px);
}

.date-navigation {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.nav-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.current-period {
  font-weight: 600;
  color: var(--text-primary);
  min-width: 200px;
  text-align: center;
}

/* Schedule Grid */
.schedule-grid {
  display: grid;
  grid-template-columns: 120px repeat(auto-fit, minmax(200px, 1fr));
  gap: 1px;
  background: var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: var(--spacing-2xl);
}

.schedule-grid.day-view {
  grid-template-columns: 120px 1fr;
}

.time-column,
.staff-column {
  background: var(--bg-secondary);
}

.time-header,
.staff-header {
  padding: var(--spacing-lg);
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-primary);
}

.staff-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.staff-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.staff-info h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--text-primary);
}

.staff-info p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.time-slot,
.schedule-slot {
  height: 60px;
  padding: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  position: relative;
}

.time-slot {
  justify-content: center;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-primary);
}

.schedule-slots {
  display: flex;
  flex-direction: column;
}

/* Appointments */
.appointment {
  background: var(--accent-primary);
  color: white;
  border-radius: 6px;
  padding: var(--spacing-xs);
  margin: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  line-height: 1.2;
}

.appointment:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.appointment.confirmed {
  background: #22c55e;
}

.appointment.pending {
  background: #f59e0b;
}

.appointment.completed {
  background: #6b7280;
}

.appointment.cancelled {
  background: #ef4444;
  opacity: 0.7;
}

.appointment-time {
  font-weight: 600;
  margin-bottom: 2px;
}

.appointment-client {
  font-weight: 500;
  margin-bottom: 1px;
}

.appointment-service {
  font-size: 0.7rem;
  opacity: 0.9;
}

/* Legend */
.schedule-legend {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: var(--spacing-lg);
}

.schedule-legend h3 {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.legend-items {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-color.confirmed {
  background: #22c55e;
}

.legend-color.pending {
  background: #f59e0b;
}

.legend-color.completed {
  background: #6b7280;
}

.legend-color.cancelled {
  background: #ef4444;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.appointment-modal {
  background: var(--bg-primary);
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--button-hover);
  color: var(--text-primary);
}

.modal-content {
  padding: var(--spacing-lg);
}

.appointment-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row label {
  font-weight: 600;
  color: var(--text-secondary);
}

.detail-row span {
  color: var(--text-primary);
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.confirmed {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-badge.pending {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.status-badge.completed {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.status-badge.cancelled {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.modal-actions {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
}

.btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--accent-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--accent-secondary);
  transform: translateY(-2px);
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1024px) {
  .schedule-grid {
    grid-template-columns: 100px repeat(auto-fit, minmax(180px, 1fr));
  }

  .header-actions {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}

@media (max-width: 768px) {
  .schedule-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-lg);
  }

  .schedule-grid {
    grid-template-columns: 80px 1fr;
    font-size: 0.9rem;
  }

  .staff-header {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-sm);
  }

  .staff-avatar {
    width: 30px;
    height: 30px;
  }

  .time-slot,
  .schedule-slot {
    height: 50px;
  }

  .appointment {
    font-size: 0.7rem;
  }

  .legend-items {
    justify-content: center;
  }

  .modal-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .schedule-container {
    padding: var(--spacing-lg);
  }

  .header-content h1 {
    font-size: 2rem;
  }

  .current-period {
    min-width: 150px;
    font-size: 0.9rem;
  }

  .appointment-modal {
    width: 95%;
  }
}
</style>
