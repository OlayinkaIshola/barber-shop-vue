<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="hero-content">
        <h1>Elite Barber Shop Blog</h1>
        <p>Stay updated with the latest trends, tips, and stories from the world of professional grooming</p>
      </div>
      <div class="hero-image">
        <img src="@/assets/images/luxury-barbershop-barber-doing-haircuts_943281-45859.avif" alt="Professional Barbering" />
      </div>
    </section>

    <!-- Featured Post -->
    <section class="featured-post">
      <div class="container">
        <div class="featured-content">
          <div class="featured-image">
            <img src="@/assets/images/work-barber-shop-man-hairstylist-hairdresser-cutting-hair-male-client-man-visiting-hairstylist-barbershop-bearded-man-barber-shop_293990-1825.avif" alt="Featured Post" />
            <div class="featured-badge">Featured</div>
          </div>
          <div class="featured-text">
            <div class="post-meta">
              <span class="category">Grooming Tips</span>
              <span class="date">{{ formatDate(new Date()) }}</span>
            </div>
            <h2>The Art of Traditional Barbering: A Timeless Craft</h2>
            <p>Discover the rich history and enduring appeal of traditional barbering techniques that have been passed down through generations. From straight razor shaves to classic scissor cuts, learn why these time-honored methods continue to define excellence in men's grooming.</p>
            <router-link to="/blog/traditional-barbering" class="read-more-btn">
              Read Full Article
              <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Categories -->
    <section class="blog-categories">
      <div class="container">
        <h2>Explore Categories</h2>
        <div class="categories-grid">
          <div v-for="category in categories" :key="category.id" class="category-card" @click="filterByCategory(category.slug)">
            <div class="category-image">
              <img :src="category.image" :alt="category.name" />
            </div>
            <div class="category-content">
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
              <span class="post-count">{{ category.postCount }} articles</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Posts -->
    <section class="recent-posts">
      <div class="container">
        <div class="section-header">
          <h2>Recent Articles</h2>
          <div class="filter-tabs">
            <button 
              v-for="filter in filters" 
              :key="filter"
              @click="activeFilter = filter"
              :class="['filter-btn', { active: activeFilter === filter }]"
            >
              {{ filter }}
            </button>
          </div>
        </div>
        
        <div class="posts-grid">
          <article v-for="post in filteredPosts" :key="post.id" class="post-card">
            <div class="post-image">
              <img :src="post.image" :alt="post.title" />
              <div class="post-category">{{ post.category }}</div>
            </div>
            <div class="post-content">
              <div class="post-meta">
                <span class="author">
                  <i class="fas fa-user"></i>
                  {{ post.author }}
                </span>
                <span class="date">
                  <i class="fas fa-calendar"></i>
                  {{ formatDate(post.date) }}
                </span>
                <span class="read-time">
                  <i class="fas fa-clock"></i>
                  {{ post.readTime }} min read
                </span>
              </div>
              <h3>{{ post.title }}</h3>
              <p>{{ post.excerpt }}</p>
              <div class="post-footer">
                <div class="post-tags">
                  <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <router-link :to="`/blog/${post.slug}`" class="read-more">
                  Read More
                  <i class="fas fa-chevron-right"></i>
                </router-link>
              </div>
            </div>
          </article>
        </div>

        <!-- Load More Button -->
        <div class="load-more-section">
          <button @click="loadMorePosts" class="load-more-btn" :disabled="loading">
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
            <span>{{ loading ? 'Loading...' : 'Load More Articles' }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter and never miss the latest grooming tips, trends, and exclusive offers.</p>
          </div>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <div class="input-group">
              <input 
                v-model="email" 
                type="email" 
                placeholder="Enter your email address" 
                required 
                class="newsletter-input"
              />
              <button type="submit" class="newsletter-btn" :disabled="subscribing">
                <i v-if="subscribing" class="fas fa-spinner fa-spin"></i>
                <span>{{ subscribing ? 'Subscribing...' : 'Subscribe' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const activeFilter = ref('All')
const loading = ref(false)
const email = ref('')
const subscribing = ref(false)

const filters = ['All', 'Grooming Tips', 'Style Trends', 'Barbershop Life', 'Product Reviews']

const categories = [
  {
    id: 1,
    name: 'Grooming Tips',
    slug: 'grooming-tips',
    description: 'Expert advice for maintaining your best look',
    image: '@/assets/images/man-makes-stowage-barbershop_1311477-31668.avif',
    postCount: 12
  },
  {
    id: 2,
    name: 'Style Trends',
    slug: 'style-trends',
    description: 'Latest trends in men\'s hairstyles and fashion',
    image: '@/assets/images/happy-young-man-getting-haircut-professional-barber-barbershop-127675790.webp',
    postCount: 8
  },
  {
    id: 3,
    name: 'Barbershop Life',
    slug: 'barbershop-life',
    description: 'Behind the scenes stories and experiences',
    image: '@/assets/images/DiMarcos-Barber-Shop-2.jpg',
    postCount: 15
  },
  {
    id: 4,
    name: 'Product Reviews',
    slug: 'product-reviews',
    description: 'Honest reviews of grooming products and tools',
    image: '@/assets/images/71JQQddna0L._AC_SL1500_.jpg',
    postCount: 6
  }
]

const posts = ref([
  {
    id: 1,
    title: 'The Perfect Beard Trim: A Step-by-Step Guide',
    slug: 'perfect-beard-trim-guide',
    excerpt: 'Learn the professional techniques for achieving the perfect beard trim that complements your face shape and personal style.',
    image: '@/assets/images/pexels-thgusstavo-santana-2076932-683x1024.jpg',
    category: 'Grooming Tips',
    author: 'Marcus Johnson',
    date: new Date('2024-01-15'),
    readTime: 5,
    tags: ['Beard Care', 'Grooming', 'Tutorial']
  },
  {
    id: 2,
    title: 'Top 5 Hairstyles for 2024: What\'s Trending Now',
    slug: 'top-hairstyles-2024',
    excerpt: 'Discover the most popular men\'s hairstyles this year and find the perfect cut that suits your lifestyle and personality.',
    image: '@/assets/images/Vs-Barbershop-Hoboken-2.jpg',
    category: 'Style Trends',
    author: 'David Rodriguez',
    date: new Date('2024-01-10'),
    readTime: 7,
    tags: ['Hairstyles', 'Trends', '2024']
  },
  {
    id: 3,
    title: 'The History of Barbershops: From Ancient Times to Modern Day',
    slug: 'history-of-barbershops',
    excerpt: 'Take a journey through time and explore how barbershops have evolved from ancient civilizations to today\'s modern establishments.',
    image: '@/assets/images/Pennsport-Barber-Shop-1.jpg',
    category: 'Barbershop Life',
    author: 'Sarah Thompson',
    date: new Date('2024-01-05'),
    readTime: 10,
    tags: ['History', 'Culture', 'Barbershop']
  },
  {
    id: 4,
    title: 'Best Hair Products for Different Hair Types',
    slug: 'best-hair-products-guide',
    excerpt: 'Find the right hair products for your specific hair type and learn how to use them effectively for optimal results.',
    image: '@/assets/images/348s.jpg',
    category: 'Product Reviews',
    author: 'Mike Chen',
    date: new Date('2024-01-01'),
    readTime: 6,
    tags: ['Products', 'Hair Care', 'Reviews']
  },
  {
    id: 5,
    title: 'Maintaining Your Haircut: Tips for Longer-Lasting Style',
    slug: 'maintaining-haircut-tips',
    excerpt: 'Extend the life of your haircut with these professional tips and tricks that will keep you looking sharp between visits.',
    image: '@/assets/images/corner-barber-shop.jpg',
    category: 'Grooming Tips',
    author: 'James Wilson',
    date: new Date('2023-12-28'),
    readTime: 4,
    tags: ['Maintenance', 'Hair Care', 'Tips']
  },
  {
    id: 6,
    title: 'The Art of the Straight Razor Shave',
    slug: 'straight-razor-shave-art',
    excerpt: 'Experience the luxury and precision of a traditional straight razor shave and learn why this classic technique remains unmatched.',
    image: '@/assets/images/10th-Ward-Barbershop-Pittsburgh-5.jpg',
    category: 'Barbershop Life',
    author: 'Antonio Garcia',
    date: new Date('2023-12-25'),
    readTime: 8,
    tags: ['Shaving', 'Traditional', 'Luxury']
  }
])

// Computed properties
const filteredPosts = computed(() => {
  if (activeFilter.value === 'All') {
    return posts.value
  }
  return posts.value.filter(post => post.category === activeFilter.value)
})

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const filterByCategory = (slug) => {
  const category = categories.find(cat => cat.slug === slug)
  if (category) {
    activeFilter.value = category.name
  }
}

const loadMorePosts = () => {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    // In a real app, you would load more posts here
  }, 1000)
}

const subscribeNewsletter = () => {
  subscribing.value = true
  // Simulate API call
  setTimeout(() => {
    subscribing.value = false
    email.value = ''
    // Show success message
    alert('Thank you for subscribing to our newsletter!')
  }, 1000)
}

onMounted(() => {
  // Initialize any required data
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* Hero Section */
.blog-hero {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  color: white;
  padding: 120px 0 80px;
  display: flex;
  align-items: center;
  min-height: 60vh;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.25rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-image {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.hero-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* Featured Post */
.featured-post {
  padding: var(--spacing-4xl) 0;
  background: var(--card-bg);
}

.featured-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.featured-image {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.featured-content:hover .featured-image img {
  transform: scale(1.05);
}

.featured-badge {
  position: absolute;
  top: var(--spacing-lg);
  left: var(--spacing-lg);
  background: var(--accent-primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
}

.post-meta {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.category {
  background: rgba(212, 175, 55, 0.1);
  color: var(--accent-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.featured-text h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.3;
}

.featured-text p {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--accent-primary);
  color: white;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-normal);
}

.read-more-btn:hover {
  background: var(--accent-secondary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
}

/* Blog Categories */
.blog-categories {
  padding: var(--spacing-4xl) 0;
  background: var(--bg-primary);
}

.blog-categories h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-2xl);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
}

.category-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 20px var(--shadow-color);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px var(--shadow-color);
}

.category-image {
  height: 200px;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.category-card:hover .category-image img {
  transform: scale(1.1);
}

.category-content {
  padding: var(--spacing-xl);
}

.category-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.category-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.post-count {
  color: var(--accent-primary);
  font-weight: 600;
  font-size: 0.875rem;
}

/* Recent Posts */
.recent-posts {
  padding: var(--spacing-4xl) 0;
  background: var(--card-bg);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.filter-tabs {
  display: flex;
  gap: var(--spacing-sm);
}

.filter-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 2px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: 500;
}

.filter-btn.active,
.filter-btn:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.post-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 20px var(--shadow-color);
  transition: all var(--transition-normal);
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px var(--shadow-color);
}

.post-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.post-card:hover .post-image img {
  transform: scale(1.05);
}

.post-category {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  background: var(--accent-primary);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

.post-content {
  padding: var(--spacing-xl);
}

.post-content .post-meta {
  margin-bottom: var(--spacing-md);
  font-size: 0.8rem;
}

.post-content .post-meta span {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.post-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  line-height: 1.4;
}

.post-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.tag {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
}

.read-more {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all var(--transition-normal);
}

.read-more:hover {
  color: var(--accent-secondary);
  transform: translateX(3px);
}

/* Load More */
.load-more-section {
  text-align: center;
}

.load-more-btn {
  background: var(--accent-primary);
  color: white;
  border: none;
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.load-more-btn:hover:not(:disabled) {
  background: var(--accent-secondary);
  transform: translateY(-2px);
}

.load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Newsletter */
.newsletter-section {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  color: white;
  padding: var(--spacing-4xl) 0;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.newsletter-text h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.newsletter-text p {
  font-size: 1.125rem;
  opacity: 0.9;
  line-height: 1.6;
}

.newsletter-form {
  max-width: 500px;
}

.input-group {
  display: flex;
  gap: var(--spacing-sm);
}

.newsletter-input {
  flex: 1;
  padding: var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  background: white;
  color: var(--text-primary);
}

.newsletter-input:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
}

.newsletter-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  white-space: nowrap;
}

.newsletter-btn:hover:not(:disabled) {
  background: white;
  color: var(--accent-primary);
}

.newsletter-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content,
  .featured-content,
  .newsletter-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-content h1,
  .featured-text h2,
  .newsletter-text h2 {
    font-size: 2.5rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: var(--spacing-lg);
    align-items: stretch;
  }
  
  .filter-tabs {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .newsletter-btn {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .blog-hero {
    padding: 100px 0 60px;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .featured-text h2 {
    font-size: 2rem;
  }
  
  .section-header h2,
  .blog-categories h2,
  .newsletter-text h2 {
    font-size: 2rem;
  }
  
  .post-content {
    padding: var(--spacing-lg);
  }
  
  .post-footer {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: flex-start;
  }
}
</style>
