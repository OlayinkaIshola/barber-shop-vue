<template>
  <div class="reviews-page">
    <div class="reviews-container">
      <!-- Header -->
      <div class="reviews-header">
        <h1>Customer Reviews</h1>
        <p>See what our customers are saying about Elite Barber Shop</p>
        <div class="overall-rating">
          <div class="rating-display">
            <div class="stars">
              <i v-for="n in 5" :key="n" 
                 :class="n <= Math.round(overallRating) ? 'fas fa-star' : 'far fa-star'"></i>
            </div>
            <span class="rating-number">{{ overallRating }}/5</span>
            <span class="review-count">({{ reviews.length }} reviews)</span>
          </div>
        </div>
      </div>

      <!-- Write Review Section -->
      <div v-if="isLoggedIn" class="write-review-section">
        <div class="write-review-card">
          <h2>Share Your Experience</h2>
          <form @submit.prevent="submitReview" class="review-form">
            <div class="form-group">
              <label>Your Rating</label>
              <div class="rating-input">
                <i 
                  v-for="n in 5" 
                  :key="n"
                  @click="setRating(n)"
                  :class="n <= newReview.rating ? 'fas fa-star active' : 'far fa-star'"
                ></i>
              </div>
            </div>

            <div class="form-group">
              <label for="reviewTitle">Review Title</label>
              <input
                type="text"
                id="reviewTitle"
                v-model="newReview.title"
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div class="form-group">
              <label for="reviewText">Your Review</label>
              <textarea
                id="reviewText"
                v-model="newReview.text"
                rows="4"
                placeholder="Tell us about your experience at Elite Barber Shop..."
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label for="serviceReceived">Service Received</label>
              <select id="serviceReceived" v-model="newReview.service">
                <option value="">Select a service</option>
                <option value="Classic Haircut">Classic Haircut</option>
                <option value="Beard Trim">Beard Trim</option>
                <option value="Hot Towel Shave">Hot Towel Shave</option>
                <option value="Full Service">Full Service</option>
                <option value="Mustache Grooming">Mustache Grooming</option>
              </select>
            </div>

            <div class="form-group">
              <label for="stylistName">Stylist</label>
              <select id="stylistName" v-model="newReview.stylist">
                <option value="">Select your stylist</option>
                <option value="Marcus Johnson">Marcus Johnson</option>
                <option value="David Rodriguez">David Rodriguez</option>
                <option value="Anthony Williams">Anthony Williams</option>
              </select>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting || newReview.rating === 0">
                <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-paper-plane"></i>
                {{ isSubmitting ? 'Submitting...' : 'Submit Review' }}
              </button>
              <button type="button" @click="resetForm" class="btn btn-secondary">
                <i class="fas fa-undo"></i>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Login Prompt for Non-logged Users -->
      <div v-else class="login-prompt">
        <div class="prompt-card">
          <i class="fas fa-user-circle"></i>
          <h3>Share Your Experience</h3>
          <p>Login to write a review and share your experience with other customers.</p>
          <router-link to="/login" class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i>
            Login to Write Review
          </router-link>
        </div>
      </div>

      <!-- Filters -->
      <div class="reviews-filters">
        <div class="filter-group">
          <label for="ratingFilter">Filter by Rating</label>
          <select id="ratingFilter" v-model="filters.rating" @change="applyFilters">
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="serviceFilter">Filter by Service</label>
          <select id="serviceFilter" v-model="filters.service" @change="applyFilters">
            <option value="">All Services</option>
            <option value="Classic Haircut">Classic Haircut</option>
            <option value="Beard Trim">Beard Trim</option>
            <option value="Hot Towel Shave">Hot Towel Shave</option>
            <option value="Full Service">Full Service</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="sortBy">Sort By</label>
          <select id="sortBy" v-model="filters.sortBy" @change="applyFilters">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
        
        <button @click="clearFilters" class="btn btn-outline">
          <i class="fas fa-times"></i>
          Clear Filters
        </button>
      </div>

      <!-- Reviews List -->
      <div class="reviews-list">
        <div v-if="filteredReviews.length === 0" class="empty-state">
          <i class="fas fa-star"></i>
          <h3>No reviews found</h3>
          <p>{{ hasFilters ? 'Try adjusting your filters' : 'Be the first to leave a review!' }}</p>
        </div>

        <div v-else class="review-cards">
          <div 
            v-for="review in paginatedReviews" 
            :key="review.id"
            class="review-card"
          >
            <div class="review-header">
              <div class="reviewer-info">
                <div class="reviewer-avatar">
                  <i class="fas fa-user-circle"></i>
                </div>
                <div class="reviewer-details">
                  <h4>{{ review.customerName }}</h4>
                  <p class="review-date">{{ formatDate(review.date) }}</p>
                </div>
              </div>
              <div class="review-rating">
                <div class="stars">
                  <i v-for="n in 5" :key="n" 
                     :class="n <= review.rating ? 'fas fa-star' : 'far fa-star'"></i>
                </div>
                <span class="rating-number">{{ review.rating }}/5</span>
              </div>
            </div>

            <div class="review-content">
              <h3 class="review-title">{{ review.title }}</h3>
              <p class="review-text">{{ review.text }}</p>
              
              <div class="review-details">
                <div v-if="review.service" class="review-service">
                  <i class="fas fa-cut"></i>
                  <span>{{ review.service }}</span>
                </div>
                <div v-if="review.stylist" class="review-stylist">
                  <i class="fas fa-user"></i>
                  <span>{{ review.stylist }}</span>
                </div>
              </div>
            </div>

            <div class="review-actions">
              <button @click="toggleHelpful(review)" class="helpful-btn">
                <i :class="review.isHelpful ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'"></i>
                Helpful ({{ review.helpfulCount }})
              </button>
              <button @click="reportReview(review)" class="report-btn">
                <i class="fas fa-flag"></i>
                Report
              </button>
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
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

// State
const isLoggedIn = ref(false)
const reviews = ref([])
const currentPage = ref(1)
const itemsPerPage = 10
const isSubmitting = ref(false)

// New review form
const newReview = reactive({
  rating: 0,
  title: '',
  text: '',
  service: '',
  stylist: ''
})

// Filters
const filters = reactive({
  rating: '',
  service: '',
  sortBy: 'newest'
})

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    customerName: 'John D.',
    rating: 5,
    title: 'Excellent service and attention to detail',
    text: 'Marcus gave me the best haircut I\'ve had in years. Very professional and took time to understand exactly what I wanted.',
    service: 'Classic Haircut',
    stylist: 'Marcus Johnson',
    date: '2024-07-20',
    helpfulCount: 12,
    isHelpful: false
  },
  {
    id: 2,
    customerName: 'Mike R.',
    rating: 5,
    title: 'Amazing hot towel shave experience',
    text: 'The hot towel shave was incredibly relaxing and the results were perfect. Anthony is a true professional.',
    service: 'Hot Towel Shave',
    stylist: 'Anthony Williams',
    date: '2024-07-18',
    helpfulCount: 8,
    isHelpful: false
  },
  {
    id: 3,
    customerName: 'David L.',
    rating: 4,
    title: 'Great atmosphere and skilled barbers',
    text: 'Really enjoyed the classic barbershop atmosphere. David did a great job with my beard trim.',
    service: 'Beard Trim',
    stylist: 'David Rodriguez',
    date: '2024-07-15',
    helpfulCount: 6,
    isHelpful: false
  },
  {
    id: 4,
    customerName: 'Robert S.',
    rating: 5,
    title: 'Consistently excellent service',
    text: 'I\'ve been coming here for over a year and the quality never disappoints. Highly recommend!',
    service: 'Full Service',
    stylist: 'Marcus Johnson',
    date: '2024-07-12',
    helpfulCount: 15,
    isHelpful: false
  },
  {
    id: 5,
    customerName: 'James W.',
    rating: 4,
    title: 'Professional and friendly staff',
    text: 'Clean shop, professional service, and reasonable prices. Will definitely be back.',
    service: 'Classic Haircut',
    stylist: 'David Rodriguez',
    date: '2024-07-10',
    helpfulCount: 4,
    isHelpful: false
  }
]

// Computed
const overallRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const hasFilters = computed(() => {
  return filters.rating || filters.service || filters.sortBy !== 'newest'
})

const filteredReviews = computed(() => {
  let filtered = [...reviews.value]
  
  if (filters.rating) {
    filtered = filtered.filter(review => review.rating === parseInt(filters.rating))
  }
  
  if (filters.service) {
    filtered = filtered.filter(review => review.service === filters.service)
  }
  
  // Sort reviews
  switch (filters.sortBy) {
    case 'oldest':
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
      break
    case 'highest':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'lowest':
      filtered.sort((a, b) => a.rating - b.rating)
      break
    case 'newest':
    default:
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
  }
  
  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredReviews.value.length / itemsPerPage)
})

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredReviews.value.slice(start, end)
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
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const setRating = (rating) => {
  newReview.rating = rating
}

const submitReview = async () => {
  if (newReview.rating === 0) {
    toast.error('Please select a rating')
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Add new review to the list
    const review = {
      id: reviews.value.length + 1,
      customerName: 'You',
      rating: newReview.rating,
      title: newReview.title,
      text: newReview.text,
      service: newReview.service,
      stylist: newReview.stylist,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      isHelpful: false
    }
    
    reviews.value.unshift(review)
    
    toast.success('Thank you for your review!')
    resetForm()
  } catch (error) {
    toast.error('Failed to submit review. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  newReview.rating = 0
  newReview.title = ''
  newReview.text = ''
  newReview.service = ''
  newReview.stylist = ''
}

const applyFilters = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  filters.rating = ''
  filters.service = ''
  filters.sortBy = 'newest'
  currentPage.value = 1
}

const toggleHelpful = (review) => {
  review.isHelpful = !review.isHelpful
  if (review.isHelpful) {
    review.helpfulCount++
    toast.success('Thank you for your feedback!')
  } else {
    review.helpfulCount--
  }
}

const reportReview = (review) => {
  toast.info('Review reported. Thank you for helping us maintain quality.')
}

const checkLoginStatus = () => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
}

// Lifecycle
onMounted(() => {
  checkLoginStatus()
  reviews.value = mockReviews
})
</script>

<style scoped>
.reviews-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 100px var(--spacing-lg) var(--spacing-2xl);
}

.reviews-container {
  max-width: 1000px;
  margin: 0 auto;
}

.reviews-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.reviews-header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.reviews-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.overall-rating {
  display: flex;
  justify-content: center;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.stars {
  color: var(--accent-primary);
  font-size: 1.5rem;
}

.rating-number {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.review-count {
  color: var(--text-secondary);
}

.write-review-section {
  margin-bottom: var(--spacing-2xl);
}

.write-review-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.write-review-card h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
}

.review-form {
  display: grid;
  gap: var(--spacing-lg);
}

.form-group label {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.rating-input {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.rating-input i {
  font-size: 2rem;
  cursor: pointer;
  color: var(--border-color);
  transition: color var(--transition-normal);
}

.rating-input i.active {
  color: var(--accent-primary);
}

.rating-input i:hover {
  color: var(--accent-primary);
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

.form-actions {
  display: flex;
  gap: var(--spacing-md);
}

.login-prompt {
  margin-bottom: var(--spacing-2xl);
}

.prompt-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
  text-align: center;
}

.prompt-card i {
  font-size: 4rem;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-lg);
}

.prompt-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.prompt-card p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.reviews-filters {
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

.reviews-list {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
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

.review-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.review-card {
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  transition: all var(--transition-normal);
}

.review-card:hover {
  border-color: var(--accent-primary);
  background: var(--button-hover);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.reviewer-avatar i {
  font-size: 2.5rem;
  color: var(--accent-primary);
}

.reviewer-details h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.review-date {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.review-rating .stars {
  color: var(--accent-primary);
}

.review-rating .rating-number {
  font-weight: 600;
  color: var(--text-primary);
}

.review-content {
  margin-bottom: var(--spacing-lg);
}

.review-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.review-text {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.review-details {
  display: flex;
  gap: var(--spacing-lg);
}

.review-service,
.review-stylist {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.review-service i,
.review-stylist i {
  color: var(--accent-primary);
}

.review-actions {
  display: flex;
  gap: var(--spacing-md);
}

.helpful-btn,
.report-btn {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.9rem;
}

.helpful-btn:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.report-btn:hover {
  border-color: #e74c3c;
  color: #e74c3c;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-2xl);
}

.page-numbers {
  display: flex;
  gap: var(--spacing-sm);
}

/* Responsive Design */
@media (max-width: 768px) {
  .reviews-header h1 {
    font-size: 2.5rem;
  }
  
  .reviews-filters {
    flex-direction: column;
  }
  
  .review-header {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
  
  .review-details {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .review-actions {
    justify-content: center;
  }
}
</style>
