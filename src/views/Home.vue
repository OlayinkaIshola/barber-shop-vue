<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>
      </div>
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">Elite Barber</span>
            <span class="title-line">Shop</span>
          </h1>
          <p class="hero-subtitle">Where Style Meets Excellence</p>
          <p class="hero-description">
            Experience premium haircuts and styling services from our expert barbers.
            Your perfect look awaits.
          </p>
          <div class="hero-buttons">
            <router-link to="/services" class="btn btn-primary">
              <span>Explore Services</span>
              <i class="fas fa-arrow-right"></i>
            </router-link>
            <router-link to="/stylists" class="btn btn-secondary">
              <span>Meet Our Team</span>
            </router-link>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-container animated-float">
            <img :src="require('@/assets/images/barber-work-side-view-young-bearded-men-getting-haircut-hairdresser-sitting-chair-barbershop-70127409.webp')"
                 alt="Professional Barber Service"
                 loading="lazy"
                 class="animated-image" />
            <div class="image-overlay animated-pulse"></div>
            <div class="decorative-elements">
              <div class="element element-1"></div>
              <div class="element element-2"></div>
              <div class="element element-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features section">
      <div class="container">
        <div class="section-header">
          <h2>Why Choose Elite Barber Shop?</h2>
          <p>Experience the difference with our premium services and expert craftsmanship</p>
        </div>
        <div class="features-grid grid grid-3">
          <div class="feature-card card">
            <div class="feature-icon">
              <i class="fas fa-cut"></i>
            </div>
            <h3>Expert Stylists</h3>
            <p>Our skilled barbers have years of experience in creating the perfect look for every client.</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">
              <i class="fas fa-clock"></i>
            </div>
            <h3>Quick Service</h3>
            <p>Efficient service without compromising quality. Book online and skip the wait.</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">
              <i class="fas fa-star"></i>
            </div>
            <h3>Premium Quality</h3>
            <p>We use only the finest products and tools to ensure exceptional results every time.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery section">
      <div class="container">
        <div class="section-header">
          <h2>Our Work</h2>
          <p>See the transformations and quality craftsmanship that sets us apart</p>
        </div>
        <div class="gallery-grid grid grid-4">
          <div class="gallery-item">
            <img src="@/assets/images/34428106.jpg" alt="Barber work example" loading="lazy" />
          </div>
          <div class="gallery-item">
            <img src="@/assets/images/37603.jpg" alt="Haircut example" loading="lazy" />
          </div>
          <div class="gallery-item">
            <img src="@/assets/images/900.jpg" alt="Styling example" loading="lazy" />
          </div>
          <div class="gallery-item">
            <img src="@/assets/images/AE-Barber-Shop-Baldwin-5.jpg" alt="Shop interior" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready for Your Perfect Look?</h2>
          <p>Book your appointment today and experience the Elite Barber Shop difference</p>
          <div class="cta-buttons">
            <router-link to="/booking" class="btn btn-primary">
              <span>Book Now</span>
              <i class="fas fa-calendar-alt"></i>
            </router-link>
            <router-link to="/services" class="btn btn-secondary">
              <span>View Services</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Add any initialization logic here
  console.log('Home page loaded')
})
</script>

<style scoped>
.home {
  padding-top: 80px; /* Account for fixed navbar */
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 10%;
  right: 30%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.hero-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.hero-text {
  max-width: 500px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.title-line {
  display: block;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-md);
}

.hero-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  position: relative;
  max-width: 500px;
  width: 100%;
}

.image-container.animated-float {
  animation: gentleFloat 6s ease-in-out infinite;
}

.animated-image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 40px var(--shadow-color);
  animation: subtleGlow 4s ease-in-out infinite alternate;
  transition: all 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 0%, rgba(212, 175, 55, 0.1) 100%);
  border-radius: var(--radius-lg);
}

.image-overlay.animated-pulse {
  animation: overlayPulse 3s ease-in-out infinite;
}

.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.element {
  position: absolute;
  border-radius: 50%;
  background: var(--accent-primary);
  opacity: 0.3;
}

.element-1 {
  width: 20px;
  height: 20px;
  top: 10%;
  right: 10%;
  animation: floatElement1 8s ease-in-out infinite;
}

.element-2 {
  width: 15px;
  height: 15px;
  bottom: 20%;
  left: 15%;
  animation: floatElement2 6s ease-in-out infinite reverse;
}

.element-3 {
  width: 25px;
  height: 25px;
  top: 60%;
  right: 20%;
  animation: floatElement3 10s ease-in-out infinite;
}

/* Animation keyframes */
@keyframes gentleFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(1deg);
  }
  50% {
    transform: translateY(-5px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(-1deg);
  }
}

@keyframes subtleGlow {
  0% {
    box-shadow: 0 20px 40px var(--shadow-color);
  }
  100% {
    box-shadow: 0 25px 50px var(--shadow-color), 0 0 30px rgba(212, 175, 55, 0.2);
  }
}

@keyframes overlayPulse {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes floatElement1 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(10px, -15px) scale(1.2);
  }
  66% {
    transform: translate(-5px, -10px) scale(0.8);
  }
}

@keyframes floatElement2 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-15px, 20px) scale(1.5);
  }
}

@keyframes floatElement3 {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  25% {
    transform: translate(15px, -10px) scale(0.7) rotate(90deg);
  }
  50% {
    transform: translate(5px, -20px) scale(1.3) rotate(180deg);
  }
  75% {
    transform: translate(-10px, -5px) scale(0.9) rotate(270deg);
  }
}

.features {
  background: var(--bg-secondary);
}

.features-grid {
  margin-top: var(--spacing-2xl);
}

.feature-card {
  text-align: center;
  padding: var(--spacing-2xl);
}

.feature-icon {
  font-size: 3rem;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-lg);
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.gallery {
  background: var(--bg-primary);
}

.gallery-grid {
  margin-top: var(--spacing-2xl);
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  aspect-ratio: 1;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.cta-section {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  color: var(--bg-primary);
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.cta-content p {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
}

.cta-section .btn-primary {
  background: var(--bg-primary);
  color: var(--accent-primary);
  border-color: var(--bg-primary);
}

.cta-section .btn-secondary {
  background: transparent;
  color: var(--bg-primary);
  border-color: var(--bg-primary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--spacing-xl);
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
}
</style>
