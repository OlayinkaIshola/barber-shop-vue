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
        <div class="services-grid grid grid-2">
          <div class="service-card card" v-for="service in services" :key="service.id">
            <div class="service-image">
              <img :src="service.image" :alt="service.name" loading="lazy" />
              <div class="service-overlay">
                <div class="service-price">${{ service.price }}</div>
              </div>
            </div>
            <div class="service-content">
              <h3>{{ service.name }}</h3>
              <p>{{ service.description }}</p>
              <div class="service-details">
                <div class="service-duration">
                  <i class="fas fa-clock"></i>
                  <span>{{ service.duration }} min</span>
                </div>
                <div class="service-rating">
                  <i class="fas fa-star"></i>
                  <span>{{ service.rating }}/5</span>
                </div>
              </div>
              <router-link to="/booking" class="btn btn-primary service-btn">
                Book Now
                <i class="fas fa-calendar-alt"></i>
              </router-link>
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
            <div class="addon-icon">
              <i :class="addon.icon"></i>
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

const services = ref([
  {
    id: 1,
    name: 'Classic Haircut',
    description: 'Traditional scissor cut with styling. Perfect for a timeless, professional look.',
    price: 35,
    duration: 45,
    rating: 4.8,
    image: '/src/assets/images/34428106.jpg'
  },
  {
    id: 2,
    name: 'Beard Trim & Shape',
    description: 'Professional beard trimming and shaping to complement your facial structure.',
    price: 25,
    duration: 30,
    rating: 4.9,
    image: '/src/assets/images/37603.jpg'
  },
  {
    id: 3,
    name: 'Hot Towel Shave',
    description: 'Luxurious traditional shave with hot towel treatment and premium products.',
    price: 45,
    duration: 60,
    rating: 5.0,
    image: '/src/assets/images/900.jpg'
  },
  {
    id: 4,
    name: 'Hair Wash & Style',
    description: 'Deep cleansing wash followed by professional styling with premium products.',
    price: 30,
    duration: 40,
    rating: 4.7,
    image: '/src/assets/images/91d6037c183ccc9644cdd59a70857524.jpg'
  },
  {
    id: 5,
    name: 'Full Service Package',
    description: 'Complete grooming experience including haircut, beard trim, and hot towel shave.',
    price: 85,
    duration: 90,
    rating: 4.9,
    image: '/src/assets/images/AE-Barber-Shop-Baldwin-5.jpg'
  },
  {
    id: 6,
    name: 'Kids Haircut',
    description: 'Gentle, patient service for children with fun and comfortable experience.',
    price: 20,
    duration: 30,
    rating: 4.8,
    image: '/src/assets/images/About-Us.jpg'
  }
])

const addons = ref([
  {
    id: 1,
    name: 'Hair Wash',
    price: 10,
    description: 'Premium shampoo and conditioning treatment',
    icon: 'fas fa-shower'
  },
  {
    id: 2,
    name: 'Scalp Massage',
    price: 15,
    description: 'Relaxing scalp massage with essential oils',
    icon: 'fas fa-spa'
  },
  {
    id: 3,
    name: 'Eyebrow Trim',
    price: 8,
    description: 'Professional eyebrow shaping and trimming',
    icon: 'fas fa-eye'
  },
  {
    id: 4,
    name: 'Mustache Trim',
    price: 12,
    description: 'Precise mustache trimming and styling',
    icon: 'fas fa-cut'
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
  gap: var(--spacing-2xl);
}

.service-card {
  overflow: hidden;
  transition: all var(--transition-normal);
}

.service-card:hover {
  transform: translateY(-10px);
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
}

.service-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.service-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.service-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md) 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
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

.service-btn {
  width: 100%;
  justify-content: center;
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

.addon-icon {
  font-size: 2.5rem;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-lg);
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
