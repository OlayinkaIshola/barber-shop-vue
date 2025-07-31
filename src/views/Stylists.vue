<template>
  <div class="stylists">
    <!-- Hero Section -->
    <section class="stylists-hero">
      <div class="container">
        <div class="hero-content">
          <h1>Meet Our Expert Team</h1>
          <p>Skilled professionals dedicated to creating your perfect look</p>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section section">
      <div class="container">
        <div class="team-grid">
          <div
            class="stylist-card"
            :class="{ 'expanded': expandedStylist === stylist.id }"
            v-for="stylist in stylists"
            :key="stylist.id"
          >
            <div class="stylist-image">
              <img :src="stylist.image" :alt="stylist.name" loading="lazy" />
              <div class="stylist-overlay">
                <div class="social-links">
                  <a href="#" class="social-link instagram" v-if="stylist.instagram">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="#" class="social-link facebook" v-if="stylist.facebook">
                    <i class="fab fa-facebook"></i>
                  </a>
                  <a href="#" class="social-link twitter" v-if="stylist.twitter">
                    <i class="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="stylist-content">
              <h3>{{ stylist.name }}</h3>
              <p class="stylist-title">{{ stylist.title }}</p>

              <div class="stylist-preview" v-if="expandedStylist !== stylist.id">
                <p class="stylist-bio-short">{{ getShortBio(stylist.bio) }}</p>
                <div class="stylist-stats-compact">
                  <div class="stat-compact">
                    <i class="fas fa-star"></i>
                    <span>{{ stylist.rating }}/5</span>
                  </div>
                  <div class="stat-compact">
                    <i class="fas fa-clock"></i>
                    <span>{{ stylist.experience }}+ years</span>
                  </div>
                </div>
              </div>

              <div class="stylist-expanded" v-if="expandedStylist === stylist.id">
                <p class="stylist-bio-full">{{ stylist.bio }}</p>

                <div class="stylist-stats">
                  <div class="stat">
                    <span class="stat-number">{{ stylist.experience }}</span>
                    <span class="stat-label">Years Experience</span>
                  </div>
                  <div class="stat">
                    <span class="stat-number">{{ stylist.rating }}</span>
                    <span class="stat-label">Rating</span>
                  </div>
                  <div class="stat">
                    <span class="stat-number">{{ getRandomClients() }}</span>
                    <span class="stat-label">Happy Clients</span>
                  </div>
                </div>

                <div class="stylist-specialties">
                  <h4>Specialties:</h4>
                  <div class="specialty-tags">
                    <span class="specialty-tag" v-for="specialty in stylist.specialties" :key="specialty">
                      {{ specialty }}
                    </span>
                  </div>
                </div>

                <div class="stylist-details">
                  <div class="detail-section">
                    <h5><i class="fas fa-graduation-cap"></i> Education & Certifications</h5>
                    <p>{{ getStylistEducation(stylist.name) }}</p>
                  </div>
                  <div class="detail-section">
                    <h5><i class="fas fa-award"></i> Achievements</h5>
                    <p>{{ getStylistAchievements(stylist.name) }}</p>
                  </div>
                </div>
              </div>

              <div class="stylist-actions">
                <button
                  @click="toggleStylist(stylist.id)"
                  class="btn btn-outline read-more-btn"
                >
                  {{ expandedStylist === stylist.id ? 'Read Less' : 'Read More' }}
                  <i :class="expandedStylist === stylist.id ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                </button>

                <router-link to="/booking" class="btn btn-primary stylist-btn">
                  Book with {{ stylist.name.split(' ')[0] }}
                  <i class="fas fa-calendar-alt"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Our Team -->
    <section class="why-choose section">
      <div class="container">
        <div class="section-header">
          <h2>Why Choose Our Team?</h2>
          <p>Experience the difference that expertise and passion make</p>
        </div>
        <div class="benefits-grid grid grid-2">
          <div class="benefit-card card">
            <div class="benefit-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h3>Certified Professionals</h3>
            <p>All our stylists are licensed and continuously trained in the latest techniques and trends.</p>
          </div>
          <div class="benefit-card card">
            <div class="benefit-icon">
              <i class="fas fa-award"></i>
            </div>
            <h3>Award-Winning Service</h3>
            <p>Our team has received multiple awards for excellence in customer service and styling.</p>
          </div>
          <div class="benefit-card card">
            <div class="benefit-icon">
              <i class="fas fa-heart"></i>
            </div>
            <h3>Personalized Approach</h3>
            <p>We take time to understand your style preferences and lifestyle to create the perfect look.</p>
          </div>
          <div class="benefit-card card">
            <div class="benefit-icon">
              <i class="fas fa-clock"></i>
            </div>
            <h3>Flexible Scheduling</h3>
            <p>Book appointments that fit your schedule with our convenient online booking system.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Expanded stylist state
const expandedStylist = ref(null)

// Toggle stylist expansion
const toggleStylist = (stylistId) => {
  expandedStylist.value = expandedStylist.value === stylistId ? null : stylistId
}

// Get short bio for preview
const getShortBio = (bio) => {
  return bio.length > 80 ? bio.substring(0, 80) + '...' : bio
}

// Get random number of clients for display
const getRandomClients = () => {
  return Math.floor(Math.random() * 500) + 200
}

// Get stylist education based on name
const getStylistEducation = (name) => {
  const educations = {
    'Marcus Johnson': 'Certified Master Barber, Aveda Institute Graduate, Advanced Razor Techniques Certification',
    'Sarah Williams': 'Licensed Cosmetologist, Redken Color Specialist, Balayage Expert Certification',
    'David Chen': 'Master Barber License, Traditional Shaving Academy Graduate, Beard Styling Specialist',
    'Isabella Rodriguez': 'Advanced Cosmetology License, Olaplex Treatment Specialist, Bridal Hair Expert',
    'James Thompson': 'Master Barber Certification, Fade Specialist Training, Men\'s Grooming Expert',
    'Emma Davis': 'Licensed Hair Stylist, Keratin Treatment Specialist, Color Correction Expert'
  }
  return educations[name] || 'Licensed Professional with Advanced Training'
}

// Get stylist achievements based on name
const getStylistAchievements = (name) => {
  const achievements = {
    'Marcus Johnson': 'Best Barber Award 2023, Featured in Men\'s Style Magazine, 15+ Years Excellence',
    'Sarah Williams': 'Top Colorist Award, Instagram Influencer (50K+ followers), Bridal Specialist of the Year',
    'David Chen': 'Traditional Barber Excellence Award, Beard Competition Judge, Master Craftsman',
    'Isabella Rodriguez': 'Wedding Hair Specialist Award, Featured in Bridal Magazine, Celebrity Stylist',
    'James Thompson': 'Men\'s Grooming Expert, Fade Master Champion, Social Media Influencer',
    'Emma Davis': 'Color Correction Specialist, Advanced Techniques Trainer, Customer Choice Award'
  }
  return achievements[name] || 'Multiple Awards and Recognition in Professional Excellence'
}

const stylists = ref([
  {
    id: 1,
    name: 'Marcus Johnson',
    title: 'Master Barber & Owner',
    bio: 'With over 15 years of experience, Marcus brings traditional barbering techniques with modern styling.',
    experience: 15,
    rating: 4.9,
    image: '/src/assets/images/marcus.webp',
    specialties: ['Classic Cuts', 'Beard Styling', 'Hot Towel Shaves'],
    instagram: true,
    facebook: true
  },
  {
    id: 2,
    name: 'David Rodriguez',
    title: 'Senior Stylist',
    bio: 'Specializing in modern cuts and beard artistry, David creates contemporary looks that turn heads.',
    experience: 8,
    rating: 4.8,
    image: '/src/assets/images/david.webp',
    specialties: ['Modern Cuts', 'Fade Techniques', 'Beard Art'],
    instagram: true,
    facebook: false
  },
  {
    id: 3,
    name: 'Anthony Williams',
    title: 'Style Specialist',
    bio: 'Known for his precision and attention to detail, Anthony ensures every client leaves looking their best.',
    experience: 6,
    rating: 4.7,
    image: '/src/assets/images/antony.jpg',
    specialties: ['Precision Cuts', 'Hair Styling', 'Consultations'],
    instagram: true,
    facebook: true
  },
  {
    id: 4,
    name: 'Michael Chen',
    title: 'Barber Stylist',
    bio: 'Combining traditional techniques with innovative approaches, Michael delivers exceptional results.',
    experience: 5,
    rating: 4.8,
    image: '/src/assets/images/micheal.webp',
    specialties: ['Traditional Cuts', 'Mustache Styling', 'Hair Treatments'],
    instagram: false,
    facebook: true
  },
  {
    id: 5,
    name: 'James Thompson',
    title: 'Junior Barber',
    bio: 'Fresh talent with a passion for the craft, James brings energy and creativity to every cut.',
    experience: 3,
    rating: 4.6,
    image: '/src/assets/images/james.jpeg',
    specialties: ['Trendy Cuts', 'Youth Styles', 'Creative Styling'],
    instagram: true,
    facebook: false
  },
  {
    id: 6,
    name: 'Robert Davis',
    title: 'Master Craftsman',
    bio: 'A true artist with scissors and razor, Robert has been perfecting his craft for over a decade.',
    experience: 12,
    rating: 4.9,
    image: '/src/assets/images/robert.avif',
    specialties: ['Artistic Cuts', 'Razor Work', 'Vintage Styles'],
    instagram: true,
    facebook: true
  }
])
</script>

<style scoped>
.stylists {
  padding-top: 80px;
}

.stylists-hero {
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

.team-section {
  background: var(--bg-primary);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-2xl);
  margin-top: var(--spacing-2xl);
}

.stylist-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 20px var(--shadow-color);
  display: flex;
  flex-direction: column;
  min-height: 500px;
}

.stylist-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px var(--shadow-color);
}

.stylist-card.expanded {
  min-height: auto;
}

.stylist-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.stylist-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.stylist-card:hover .stylist-image img {
  transform: scale(1.1);
}

.stylist-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: var(--spacing-lg);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.stylist-card:hover .stylist-overlay {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--accent-primary);
  color: var(--bg-primary);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-normal);
}

.social-link:hover {
  background: var(--accent-secondary);
  transform: translateY(-3px);
}

.stylist-content {
  padding: var(--spacing-xl);
}

.stylist-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.stylist-title {
  color: var(--accent-primary);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.stylist-bio {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.stylist-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md) 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-primary);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.stylist-specialties {
  margin-bottom: var(--spacing-lg);
}

.stylist-specialties h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.specialty-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.specialty-tag {
  background: var(--accent-primary);
  color: var(--bg-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-lg);
  font-size: 0.8rem;
  font-weight: 500;
}

.stylist-btn {
  width: 100%;
  justify-content: center;
}

.why-choose {
  background: var(--bg-secondary);
}

.benefits-grid {
  margin-top: var(--spacing-2xl);
}

.benefit-card {
  text-align: center;
  padding: var(--spacing-2xl);
}

.benefit-icon {
  font-size: 3rem;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-lg);
}

.benefit-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.benefit-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .stylist-stats {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .specialty-tags {
    justify-content: center;
  }
}
</style>
