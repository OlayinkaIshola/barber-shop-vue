<template>
  <div class="booking-history-page">
    <div class="history-container">
      <!-- Header -->
      <div class="history-header">
        <h1>Booking History</h1>
        <p>View and manage your appointment history</p>
      </div>

      <!-- Filters -->
      <div class="history-filters">
        <div class="filter-group">
          <label for="statusFilter">Status</label>
          <select id="statusFilter" v-model="filters.status" @change="applyFilters">
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No Show</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="dateRange">Date Range</label>
          <select id="dateRange" v-model="filters.dateRange" @change="applyFilters">
            <option value="">All Time</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-6-months">Last 6 Months</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="serviceFilter">Service</label>
          <select id="serviceFilter" v-model="filters.service" @change="applyFilters">
            <option value="">All Services</option>
            <option value="haircut">Haircut</option>
            <option value="beard-trim">Beard Trim</option>
            <option value="hot-towel-shave">Hot Towel Shave</option>
            <option value="full-service">Full Service</option>
          </select>
        </div>
        
        <button @click="clearFilters" class="btn btn-outline">
          <i class="fas fa-times"></i>
          Clear Filters
        </button>
      </div>

      <!-- Statistics -->
      <div class="history-stats">
        <div class="stat-card">
          <i class="fas fa-calendar-check"></i>
          <div>
            <h3>{{ stats.totalBookings }}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-clock"></i>
          <div>
            <h3>{{ stats.upcomingBookings }}</h3>
            <p>Upcoming</p>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-dollar-sign"></i>
          <div>
            <h3>${{ stats.totalSpent }}</h3>
            <p>Total Spent</p>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-star"></i>
          <div>
            <h3>{{ stats.averageRating }}</h3>
            <p>Avg Rating</p>
          </div>
        </div>
      </div>

      <!-- Booking List -->
      <div class="history-list">
        <div v-if="filteredBookings.length === 0" class="empty-state">
          <i class="fas fa-calendar"></i>
          <h3>No bookings found</h3>
          <p>{{ filters.status || filters.dateRange || filters.service ? 'Try adjusting your filters' : 'You haven\'t made any bookings yet' }}</p>
          <router-link to="/booking" class="btn btn-primary">
            <i class="fas fa-calendar-plus"></i>
            Book Your First Appointment
          </router-link>
        </div>

        <div v-else class="booking-cards">
          <div 
            v-for="booking in filteredBookings" 
            :key="booking.id"
            class="booking-card"
            :class="booking.status"
          >
            <div class="booking-date">
              <span class="day">{{ formatDay(booking.date) }}</span>
              <span class="month">{{ formatMonth(booking.date) }}</span>
              <span class="year">{{ formatYear(booking.date) }}</span>
            </div>
            
            <div class="booking-details">
              <div class="booking-header">
                <h3>{{ booking.service }}</h3>
                <span :class="['status-badge', booking.status]">
                  {{ formatStatus(booking.status) }}
                </span>
              </div>
              
              <div class="booking-info">
                <p class="stylist">
                  <i class="fas fa-user"></i>
                  {{ booking.stylist }}
                </p>
                <p class="time">
                  <i class="fas fa-clock"></i>
                  {{ booking.time }}
                </p>
                <p class="duration">
                  <i class="fas fa-hourglass-half"></i>
                  {{ booking.duration }} minutes
                </p>
                <p class="price">
                  <i class="fas fa-dollar-sign"></i>
                  ${{ booking.price }}
                </p>
              </div>
              
              <div v-if="booking.notes" class="booking-notes">
                <p><strong>Notes:</strong> {{ booking.notes }}</p>
              </div>
            </div>
            
            <div class="booking-actions">
              <div v-if="booking.status === 'upcoming'" class="upcoming-actions">
                <button @click="rescheduleBooking(booking)" class="btn btn-sm btn-outline">
                  <i class="fas fa-calendar-alt"></i>
                  Reschedule
                </button>
                <button @click="cancelBooking(booking)" class="btn btn-sm btn-danger">
                  <i class="fas fa-times"></i>
                  Cancel
                </button>
              </div>
              
              <div v-else-if="booking.status === 'completed'" class="completed-actions">
                <div v-if="booking.rating" class="rating-display">
                  <div class="stars">
                    <i v-for="n in 5" :key="n" 
                       :class="n <= booking.rating ? 'fas fa-star' : 'far fa-star'"></i>
                  </div>
                  <span>{{ booking.rating }}/5</span>
                </div>
                <button v-else @click="rateBooking(booking)" class="btn btn-sm btn-primary">
                  <i class="fas fa-star"></i>
                  Rate Service
                </button>
                <button @click="rebookService(booking)" class="btn btn-sm btn-outline">
                  <i class="fas fa-redo"></i>
                  Book Again
                </button>
              </div>
              
              <div v-else-if="booking.status === 'cancelled'" class="cancelled-actions">
                <button @click="rebookService(booking)" class="btn btn-sm btn-primary">
                  <i class="fas fa-redo"></i>
                  Book Again
                </button>
              </div>
              
              <button @click="viewBookingDetails(booking)" class="btn btn-sm btn-outline">
                <i class="fas fa-eye"></i>
                Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="btn btn-outline"
        >
          <i class="fas fa-chevron-left"></i>
          Previous
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="currentPage = page"
            :class="['btn', page === currentPage ? 'btn-primary' : 'btn-outline']"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="btn btn-outline"
        >
          Next
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Rating Modal -->
    <div v-if="showRatingModal" class="modal-overlay" @click="closeRatingModal">
      <div class="modal-content" @click.stop>
        <h3>Rate Your Experience</h3>
        <div class="rating-section">
          <p>How was your experience with {{ selectedBooking?.stylist }}?</p>
          <div class="rating-stars">
            <i 
              v-for="n in 5" 
              :key="n"
              @click="setRating(n)"
              :class="n <= tempRating ? 'fas fa-star active' : 'far fa-star'"
            ></i>
          </div>
          <textarea 
            v-model="reviewText" 
            placeholder="Share your experience (optional)"
            rows="4"
          ></textarea>
        </div>
        <div class="modal-actions">
          <button @click="closeRatingModal" class="btn btn-secondary">Cancel</button>
          <button @click="submitRating" class="btn btn-primary" :disabled="tempRating === 0">
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

// State
const bookings = ref([])
const currentPage = ref(1)
const itemsPerPage = 10
const showRatingModal = ref(false)
const selectedBooking = ref(null)
const tempRating = ref(0)
const reviewText = ref('')

// Filters
const filters = reactive({
  status: '',
  dateRange: '',
  service: ''
})

// Stats
const stats = reactive({
  totalBookings: 0,
  upcomingBookings: 0,
  totalSpent: 0,
  averageRating: 0
})

// Mock data
const mockBookings = [
  {
    id: 1,
    service: 'Classic Haircut',
    stylist: 'Marcus Johnson',
    date: '2024-07-25',
    time: '2:00 PM',
    duration: 45,
    price: 35,
    status: 'completed',
    rating: 5,
    notes: 'Regular trim, fade on sides'
  },
  {
    id: 2,
    service: 'Hot Towel Shave',
    stylist: 'Anthony Williams',
    date: '2024-08-05',
    time: '10:30 AM',
    duration: 60,
    price: 45,
    status: 'upcoming',
    notes: 'First time hot towel shave'
  },
  {
    id: 3,
    service: 'Beard Trim & Shape',
    stylist: 'David Rodriguez',
    date: '2024-06-15',
    time: '4:00 PM',
    duration: 30,
    price: 25,
    status: 'completed',
    rating: 4
  },
  {
    id: 4,
    service: 'Full Service Package',
    stylist: 'Marcus Johnson',
    date: '2024-05-20',
    time: '1:00 PM',
    duration: 90,
    price: 85,
    status: 'cancelled',
    notes: 'Had to cancel due to emergency'
  },
  {
    id: 5,
    service: 'Classic Haircut',
    stylist: 'David Rodriguez',
    date: '2024-08-12',
    time: '11:00 AM',
    duration: 45,
    price: 35,
    status: 'upcoming'
  }
]

// Computed
const filteredBookings = computed(() => {
  let filtered = [...bookings.value]
  
  if (filters.status) {
    filtered = filtered.filter(booking => booking.status === filters.status)
  }
  
  if (filters.service) {
    filtered = filtered.filter(booking => 
      booking.service.toLowerCase().includes(filters.service.toLowerCase())
    )
  }
  
  if (filters.dateRange) {
    const now = new Date()
    const filterDate = new Date()
    
    switch (filters.dateRange) {
      case 'last-month':
        filterDate.setMonth(now.getMonth() - 1)
        break
      case 'last-3-months':
        filterDate.setMonth(now.getMonth() - 3)
        break
      case 'last-6-months':
        filterDate.setMonth(now.getMonth() - 6)
        break
      case 'this-year':
        filterDate.setFullYear(now.getFullYear(), 0, 1)
        break
    }
    
    filtered = filtered.filter(booking => new Date(booking.date) >= filterDate)
  }
  
  // Sort by date (newest first)
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  let filtered = [...bookings.value]
  
  if (filters.status) {
    filtered = filtered.filter(booking => booking.status === filters.status)
  }
  
  if (filters.service) {
    filtered = filtered.filter(booking => 
      booking.service.toLowerCase().includes(filters.service.toLowerCase())
    )
  }
  
  return Math.ceil(filtered.length / itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const formatDay = (dateString) => {
  return new Date(dateString).getDate()
}

const formatMonth = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short' })
}

const formatYear = (dateString) => {
  return new Date(dateString).getFullYear()
}

const formatStatus = (status) => {
  const statusMap = {
    completed: 'Completed',
    upcoming: 'Upcoming',
    cancelled: 'Cancelled',
    'no-show': 'No Show'
  }
  return statusMap[status] || status
}

const applyFilters = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  filters.status = ''
  filters.dateRange = ''
  filters.service = ''
  currentPage.value = 1
}

const rescheduleBooking = (booking) => {
  // In a real app, this would navigate to a reschedule page
  toast.info('Reschedule functionality would be implemented here')
}

const cancelBooking = (booking) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    booking.status = 'cancelled'
    toast.success('Booking cancelled successfully')
    calculateStats()
  }
}

const rateBooking = (booking) => {
  selectedBooking.value = booking
  tempRating.value = 0
  reviewText.value = ''
  showRatingModal.value = true
}

const setRating = (rating) => {
  tempRating.value = rating
}

const submitRating = () => {
  if (selectedBooking.value && tempRating.value > 0) {
    selectedBooking.value.rating = tempRating.value
    selectedBooking.value.review = reviewText.value
    
    toast.success('Thank you for your rating!')
    closeRatingModal()
    calculateStats()
  }
}

const closeRatingModal = () => {
  showRatingModal.value = false
  selectedBooking.value = null
  tempRating.value = 0
  reviewText.value = ''
}

const rebookService = (booking) => {
  // Navigate to booking page with pre-filled service
  router.push({
    path: '/booking',
    query: { service: booking.service, stylist: booking.stylist }
  })
}

const viewBookingDetails = (booking) => {
  // In a real app, this would show detailed booking information
  toast.info('Detailed booking view would be implemented here')
}

const calculateStats = () => {
  stats.totalBookings = bookings.value.length
  stats.upcomingBookings = bookings.value.filter(b => b.status === 'upcoming').length
  stats.totalSpent = bookings.value
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0)
  
  const ratedBookings = bookings.value.filter(b => b.rating)
  stats.averageRating = ratedBookings.length > 0 
    ? (ratedBookings.reduce((sum, b) => sum + b.rating, 0) / ratedBookings.length).toFixed(1)
    : 0
}

const loadBookingHistory = () => {
  // In a real app, this would fetch from an API
  bookings.value = mockBookings
  calculateStats()
}

// Lifecycle
onMounted(() => {
  loadBookingHistory()
})
</script>

<style scoped>
.booking-history-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 100px var(--spacing-lg) var(--spacing-2xl);
}

.history-container {
  max-width: 1200px;
  margin: 0 auto;
}

.history-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.history-header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.history-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.history-filters {
  display: flex;
  gap: var(--spacing-lg);
  align-items: end;
  margin-bottom: var(--spacing-2xl);
  background: var(--card-bg);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.filter-group {
  flex: 1;
}

.filter-group label {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.filter-group select {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.history-stats {
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

.stat-card i {
  font-size: 2.5rem;
  color: var(--accent-primary);
}

.stat-card h3 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.stat-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.history-list {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
  margin-bottom: var(--spacing-xl);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.empty-state h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.booking-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.booking-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

.booking-card:hover {
  border-color: var(--accent-primary);
  background: var(--button-hover);
}

.booking-card.upcoming {
  border-left: 4px solid #3498db;
}

.booking-card.completed {
  border-left: 4px solid #27ae60;
}

.booking-card.cancelled {
  border-left: 4px solid #e74c3c;
}

.booking-date {
  text-align: center;
  min-width: 80px;
}

.booking-date .day {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-primary);
}

.booking-date .month {
  display: block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.booking-date .year {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.booking-details {
  flex: 1;
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.booking-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
}

.status-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.upcoming {
  background: #e3f2fd;
  color: #1976d2;
}

.status-badge.completed {
  background: #e8f5e8;
  color: #2e7d32;
}

.status-badge.cancelled {
  background: #ffebee;
  color: #c62828;
}

.booking-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.booking-info p {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.booking-info i {
  color: var(--accent-primary);
  width: 16px;
}

.booking-notes {
  background: var(--bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-top: var(--spacing-md);
}

.booking-notes p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

.booking-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  min-width: 120px;
}

.upcoming-actions,
.completed-actions,
.cancelled-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.rating-display {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.rating-display .stars {
  color: var(--accent-primary);
}

.rating-display span {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
}

.page-numbers {
  display: flex;
  gap: var(--spacing-sm);
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
  max-width: 500px;
  width: 90%;
}

.modal-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.rating-section {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.rating-section p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.rating-stars {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.rating-stars i {
  font-size: 2rem;
  cursor: pointer;
  color: var(--border-color);
  transition: color var(--transition-normal);
}

.rating-stars i.active {
  color: var(--accent-primary);
}

.rating-stars i:hover {
  color: var(--accent-primary);
}

.rating-section textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

/* Responsive Design */
@media (max-width: 768px) {
  .history-filters {
    flex-direction: column;
  }
  
  .booking-card {
    flex-direction: column;
    text-align: center;
  }
  
  .booking-header {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .booking-info {
    grid-template-columns: 1fr;
  }
  
  .booking-actions {
    width: 100%;
  }
  
  .upcoming-actions,
  .completed-actions,
  .cancelled-actions {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
