<template>
  <div class="services">
    <!-- Hero Section -->
    <section class="services-hero">
      <div class="container">
        <div class="hero-content">
          <h1>Our Services</h1>
          <p>Professional grooming services tailored to your style and preferences</p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-section section">
      <div class="container">
        <div class="services-grid">
          <div
            class="service-card"
            :class="{ 'expanded': expandedService === service.id }"
            v-for="service in services"
            :key="service.id"
          >
            <div class="service-image">
              <img :src="service.image" :alt="service.name" loading="lazy" />
              <div class="service-overlay">
                <div class="service-price">${{ service.price }}</div>
              </div>
            </div>

            <div class="service-content">
              <h3>{{ service.name }}</h3>

              <div class="service-preview" v-if="expandedService !== service.id">
                <p class="service-description-short">{{ getShortDescription(service.description) }}</p>
                <div class="service-meta">
                  <div class="service-duration">
                    <i class="fas fa-clock"></i>
                    <span>{{ service.duration }} min</span>
                  </div>
                  <div class="service-rating">
                    <i class="fas fa-star"></i>
                    <span>{{ service.rating }}/5</span>
                  </div>
                </div>
              </div>

              <div class="service-expanded" v-if="expandedService === service.id">
                <p class="service-description-full">{{ service.description }}</p>
                <div class="service-details-expanded">
                  <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span><strong>Duration:</strong> {{ service.duration }} minutes</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-star"></i>
                    <span><strong>Rating:</strong> {{ service.rating }}/5 ({{ getRandomReviews() }} reviews)</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span><strong>Price:</strong> ${{ service.price }}</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-cut"></i>
                    <span><strong>Includes:</strong> {{ getServiceIncludes(service.name) }}</span>
                  </div>
                </div>
              </div>

              <div class="service-actions">
                <button
                  @click="toggleService(service.id)"
                  class="btn btn-outline read-more-btn"
                >
                  {{ expandedService === service.id ? 'Read Less' : 'Read More' }}
                  <i :class="expandedService === service.id ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                </button>

                <router-link to="/booking" class="btn btn-primary service-btn">
                  Book Now
                  <i class="fas fa-calendar-alt"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Services -->
    <section class="additional-services section">
      <div class="container">
        <div class="section-header">
          <h2>Additional Services</h2>
          <p>Complete your look with our premium add-on services</p>
        </div>
        <div class="addon-services grid grid-4">
          <div class="addon-card card" v-for="addon in addons" :key="addon.id">
            <div class="addon-image">
              <img :src="addon.image" :alt="addon.name" loading="lazy" />
            </div>
            <h4>{{ addon.name }}</h4>
            <p class="addon-price">${{ addon.price }}</p>
            <p class="addon-description">{{ addon.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Info -->
    <section class="pricing-info section">
      <div class="container">
        <div class="pricing-content">
          <h2>Transparent Pricing</h2>
          <p>No hidden fees, no surprises. What you see is what you pay.</p>
          <div class="pricing-features">
            <div class="pricing-feature">
              <i class="fas fa-check-circle"></i>
              <span>All prices include consultation</span>
            </div>
            <div class="pricing-feature">
              <i class="fas fa-check-circle"></i>
              <span>Premium products included</span>
            </div>
            <div class="pricing-feature">
              <i class="fas fa-check-circle"></i>
              <span>Satisfaction guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Expanded service state
const expandedService = ref(null)

// Toggle service expansion
const toggleService = (serviceId) => {
  expandedService.value = expandedService.value === serviceId ? null : serviceId
}

// Get short description for preview
const getShortDescription = (description) => {
  return description.length > 60 ? description.substring(0, 60) + '...' : description
}

// Get random number of reviews for display
const getRandomReviews = () => {
  return Math.floor(Math.random() * 50) + 20
}

// Get service includes based on service name
const getServiceIncludes = (serviceName) => {
  const includes = {
    'Classic Haircut': 'Consultation, wash, cut, style, finishing products',
    'Beard Trim & Shape': 'Beard analysis, trimming, shaping, moisturizing treatment',
    'Hot Towel Shave': 'Pre-shave oil, hot towel treatment, shave, aftershave balm',
    'Hair Wash & Style': 'Deep cleansing shampoo, conditioning, blow dry, styling',
    'Full Service Package': 'All services combined with premium treatment',
    'Kids Haircut': 'Patient consultation, gentle cut, fun experience, small gift'
  }
  return includes[serviceName] || 'Professional service with premium products'
}

const services = ref([
  {
    id: 1,
    name: 'Classic Haircut',
    description: 'Traditional scissor cut with styling. Perfect for a timeless, professional look.',
    price: 35,
    duration: 45,
    rating: 4.8,
    image: '/src/assets/images/classic-cut.jpg'
  },
  {
    id: 2,
    name: 'Beard Trim & Shape',
    description: 'Professional beard trimming and shaping to complement your facial structure.',
    price: 25,
    duration: 30,
    rating: 4.9,
    image: '/src/assets/images/beard.jpg'
  },
  {
    id: 3,
    name: 'Hot Towel Shave',
    description: 'Luxurious traditional shave with hot towel treatment and premium products.',
    price: 45,
    duration: 60,
    rating: 5.0,
    image: '/src/assets/images/Hot-Towel-Shave.png'
  },
  {
    id: 4,
    name: 'Hair Wash & Style',
    description: 'Deep cleansing wash followed by professional styling with premium products.',
    price: 30,
    duration: 40,
    rating: 4.7,
    image: '/src/assets/images/hairwash.avif'
  },
  {
    id: 5,
    name: 'Full Service Package',
    description: 'Complete grooming experience including haircut, beard trim, and hot towel shave.',
    price: 85,
    duration: 90,
    rating: 4.9,
    image: '/src/assets/images/full-package.jpg'
  },
  {
    id: 6,
    name: 'Kids Haircut',
    description: 'Gentle, patient service for children with fun and comfortable experience.',
    price: 20,
    duration: 30,
    rating: 4.8,
    image: '/src/assets/images/kids.webp'
  }
])

const addons = ref([
  {
    id: 1,
    name: 'Hair Wash',
    price: 10,
    description: 'Premium shampoo and conditioning treatment',
    image: '/src/assets/images/luxury-barbershop-barber-doing-haircuts_943281-45859.avif'
  },
  {
    id: 2,
    name: 'Scalp Massage',
    price: 15,
    description: 'Relaxing scalp massage with essential oils',
    image: '/src/assets/images/man-makes-stowage-barbershop_1311477-31668.avif'
  },
  {
    id: 3,
    name: 'Eyebrow Trim',
    price: 8,
    description: 'Professional eyebrow shaping and trimming',
    image: '/src/assets/images/work-barber-shop-man-hairstylist-hairdresser-cutting-hair-male-client-man-visiting-hairstylist-barbershop-bearded-man-barber-shop_293990-1825.avif'
  },
  {
    id: 4,
    name: 'Mustache Trim',
    price: 12,
    description: 'Precise mustache trimming and styling',
    image: '/src/assets/images/happy-young-man-getting-haircut-professional-barber-barbershop-127675790.webp'
  }
])
</script>

<style scoped>
.services {
  padding-top: 80px;
}

.services-hero {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: var(--spacing-2xl) 0;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.hero-content p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.services-section {
  background: var(--bg-primary);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-2xl);
  margin-top: var(--spacing-2xl);
}

.service-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 20px var(--shadow-color);
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px var(--shadow-color);
}

.service-card.expanded {
  min-height: auto;
  max-height: none;
}

.service-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.service-card:hover .service-image img {
  transform: scale(1.1);
}

.service-overlay {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
}

.service-price {
  background: var(--accent-primary);
  color: var(--bg-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 1.1rem;
}

.service-content {
  padding: var(--spacing-xl);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.service-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.service-preview {
  flex: 1;
}

.service-description-short {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.service-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-sm) 0;
  border-top: 1px solid var(--border-color);
}

.service-expanded {
  flex: 1;
}

.service-description-full {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.service-details-expanded {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-item i {
  color: var(--accent-primary);
  width: 20px;
  text-align: center;
}

.service-duration,
.service-rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
}

.service-duration i,
.service-rating i {
  color: var(--accent-primary);
}

.service-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: auto;
}

.read-more-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.service-btn {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.additional-services {
  background: var(--bg-secondary);
}

.addon-services {
  margin-top: var(--spacing-2xl);
}

.addon-card {
  text-align: center;
  padding: var(--spacing-xl);
}

.addon-image {
  width: 100%;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: var(--spacing-lg);
}

.addon-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.addon-card:hover .addon-image img {
  transform: scale(1.05);
}

.addon-card h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.addon-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-sm);
}

.addon-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.pricing-info {
  background: var(--bg-primary);
}

.pricing-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.pricing-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.pricing-content > p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.pricing-features {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.pricing-feature {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  font-size: 1.1rem;
  color: var(--text-primary);
}

.pricing-feature i {
  color: var(--accent-primary);
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .service-details {
    flex-direction: column;
    gap: var(--spacing-sm);
    text-align: center;
  }
  
  .addon-services {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .pricing-content h2 {
    font-size: 2rem;
  }
  
  .addon-services {
    grid-template-columns: 1fr;
  }
}
</style>
