<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>About Elite Barber Shop</h1>
        <p class="hero-subtitle">Crafting exceptional grooming experiences since 2010</p>
        <div class="hero-stats">
          <div class="stat">
            <h3>14+</h3>
            <p>Years of Excellence</p>
          </div>
          <div class="stat">
            <h3>10,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div class="stat">
            <h3>5</h3>
            <p>Master Barbers</p>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <img :src="require('@/assets/images/About-Us.jpg')" alt="Elite Barber Shop Interior" />
        <div class="hero-image-overlay">
          <div class="overlay-content">
            <i class="fas fa-cut"></i>
            <p>Premium Grooming Experience</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="story-content">
          <div class="story-text">
            <h2>Our Story</h2>
            <p>
              Elite Barber Shop was founded in 2010 with a simple vision: to bring back the classic barbershop experience 
              while incorporating modern techniques and styles. What started as a small neighborhood shop has grown into 
              the premier destination for men's grooming in the city.
            </p>
            <p>
              Our founder, Marcus Johnson, began his journey as an apprentice barber at the age of 16. With over two decades 
              of experience, he has mastered both traditional and contemporary barbering techniques. His passion for the craft 
              and dedication to customer service has been the driving force behind Elite Barber Shop's success.
            </p>
            <p>
              Today, we continue to honor the timeless traditions of barbering while embracing innovation. Every cut, shave, 
              and styling service is performed with meticulous attention to detail and a commitment to excellence that has 
              earned us the trust of thousands of satisfied customers.
            </p>
          </div>
          <div class="story-image">
            <img :src="require('@/assets/images/marcus.webp')" alt="Marcus Johnson - Founder" />
            <div class="image-caption">
              <h4>Marcus Johnson</h4>
              <p>Founder & Master Barber</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <h2>Our Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-image">
              <img :src="require('@/assets/images/luxury-barbershop-barber-doing-haircuts_943281-45859.avif')" alt="Excellence in Service" />
              <div class="value-icon">
                <i class="fas fa-star"></i>
              </div>
            </div>
            <div class="value-content">
              <h3>Excellence</h3>
              <p>We strive for perfection in every service, ensuring each customer leaves looking and feeling their best.</p>
            </div>
          </div>
          <div class="value-card">
            <div class="value-image">
              <img :src="require('@/assets/images/DiMarcos-Barber-Shop-2.jpg')" alt="Integrity and Trust" />
              <div class="value-icon">
                <i class="fas fa-handshake"></i>
              </div>
            </div>
            <div class="value-content">
              <h3>Integrity</h3>
              <p>Honest pricing, transparent service, and building trust through consistent quality and reliability.</p>
            </div>
          </div>
          <div class="value-card">
            <div class="value-image">
              <img :src="require('@/assets/images/corner-barber-shop.jpg')" alt="Community Connection" />
              <div class="value-icon">
                <i class="fas fa-users"></i>
              </div>
            </div>
            <div class="value-content">
              <h3>Community</h3>
              <p>We're more than a barbershop - we're a gathering place where friendships are formed and stories are shared.</p>
            </div>
          </div>
          <div class="value-card">
            <div class="value-image">
              <img :src="require('@/assets/images/work-barber-shop-man-hairstylist-hairdresser-cutting-hair-male-client-man-visiting-hairstylist-barbershop-bearded-man-barber-shop_293990-1825.avif')" alt="Master Craftsmanship" />
              <div class="value-icon">
                <i class="fas fa-graduation-cap"></i>
              </div>
            </div>
            <div class="value-content">
              <h3>Craftsmanship</h3>
              <p>Continuous learning and mastery of both traditional techniques and modern trends in men's grooming.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <h2>Meet Our Master Barbers</h2>
        <div class="team-grid">
          <div class="team-member">
            <div class="member-image">
              <img :src="require('@/assets/images/marcus.webp')" alt="Marcus Johnson" />
            </div>
            <div class="member-info">
              <h3>Marcus Johnson</h3>
              <p class="member-title">Founder & Master Barber</p>
              <p class="member-experience">20+ years experience</p>
              <p class="member-description">
                Specializes in classic cuts, hot towel shaves, and beard sculpting. Marcus has trained under some of the 
                industry's most respected barbers and brings a wealth of knowledge to every service.
              </p>
              <div class="member-specialties">
                <span>Classic Cuts</span>
                <span>Hot Towel Shaves</span>
                <span>Beard Sculpting</span>
              </div>
            </div>
          </div>

          <div class="team-member">
            <div class="member-image">
              <img :src="require('@/assets/images/david.webp')" alt="David Rodriguez" />
            </div>
            <div class="member-info">
              <h3>David Rodriguez</h3>
              <p class="member-title">Senior Barber</p>
              <p class="member-experience">15+ years experience</p>
              <p class="member-description">
                Known for his precision with fades and modern styling techniques. David stays current with the latest trends 
                while maintaining the highest standards of traditional barbering.
              </p>
              <div class="member-specialties">
                <span>Precision Fades</span>
                <span>Modern Styles</span>
                <span>Hair Washing</span>
              </div>
            </div>
          </div>

          <div class="team-member">
            <div class="member-image">
              <img :src="require('@/assets/images/antony.jpg')" alt="Anthony Williams" />
            </div>
            <div class="member-info">
              <h3>Anthony Williams</h3>
              <p class="member-title">Master Barber</p>
              <p class="member-experience">12+ years experience</p>
              <p class="member-description">
                Expert in both traditional and contemporary techniques. Anthony's attention to detail and friendly demeanor 
                have made him a favorite among our regular customers.
              </p>
              <div class="member-specialties">
                <span>Traditional Cuts</span>
                <span>Mustache Grooming</span>
                <span>Scalp Treatments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="experience-section">
      <div class="container">
        <h2>The Elite Experience</h2>
        <div class="experience-content">
          <div class="experience-text">
            <h3>What Sets Us Apart</h3>
            <ul class="experience-list">
              <li>
                <i class="fas fa-check"></i>
                <div>
                  <strong>Premium Products:</strong> We use only the finest grooming products from trusted brands like 
                  Baxter of California, American Crew, and Proraso.
                </div>
              </li>
              <li>
                <i class="fas fa-check"></i>
                <div>
                  <strong>Personalized Service:</strong> Every service is tailored to your individual style, face shape, 
                  and lifestyle preferences.
                </div>
              </li>
              <li>
                <i class="fas fa-check"></i>
                <div>
                  <strong>Relaxing Atmosphere:</strong> Enjoy complimentary beverages, comfortable seating, and a 
                  welcoming environment designed for relaxation.
                </div>
              </li>
              <li>
                <i class="fas fa-check"></i>
                <div>
                  <strong>Attention to Detail:</strong> From the initial consultation to the final styling touches, 
                  we ensure every detail is perfect.
                </div>
              </li>
              <li>
                <i class="fas fa-check"></i>
                <div>
                  <strong>Ongoing Education:</strong> Our barbers regularly attend workshops and training sessions to 
                  stay current with industry trends and techniques.
                </div>
              </li>
            </ul>
          </div>
          <div class="experience-image">
            <img :src="require('@/assets/images/happy-young-man-getting-haircut-professional-barber-barbershop-127675790.webp')" alt="Barber at work" />
          </div>
        </div>
      </div>
    </section>

    <!-- Awards Section -->
    <section class="awards-section">
      <div class="container">
        <h2>Recognition & Awards</h2>
        <div class="awards-grid">
          <div class="award-item">
            <div class="award-icon">
              <i class="fas fa-trophy"></i>
            </div>
            <h4>Best Barbershop 2023</h4>
            <p>City's Choice Awards</p>
          </div>
          <div class="award-item">
            <div class="award-icon">
              <i class="fas fa-medal"></i>
            </div>
            <h4>Excellence in Service</h4>
            <p>Local Business Association</p>
          </div>
          <div class="award-item">
            <div class="award-icon">
              <i class="fas fa-star"></i>
            </div>
            <h4>5-Star Rating</h4>
            <p>Google Reviews & Yelp</p>
          </div>
          <div class="award-item">
            <div class="award-icon">
              <i class="fas fa-certificate"></i>
            </div>
            <h4>Certified Master Barbers</h4>
            <p>National Barber Association</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Experience the Elite Difference</h2>
          <p>Join thousands of satisfied customers who trust us with their grooming needs.</p>
          <div class="cta-buttons">
            <router-link to="/booking" class="btn btn-primary">
              <i class="fas fa-calendar-plus"></i>
              Book Your Appointment
            </router-link>
            <router-link to="/contact" class="btn btn-outline">
              <i class="fas fa-phone"></i>
              Contact Us
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No reactive data needed for this static page
</script>

<style scoped>
.about-page {
  background: var(--bg-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
  min-height: 100vh;
  padding: 100px var(--spacing-lg) var(--spacing-2xl);
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.6;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

.stat {
  text-align: center;
}

.stat h3 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-sm);
}

.stat p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.hero-image {
  position: relative;
}

.hero-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 40px var(--shadow-color);
}

.hero-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.6) 0%, rgba(212, 175, 55, 0.3) 100%);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.hero-image:hover .hero-image-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-content i {
  font-size: 3rem;
  color: var(--accent-primary);
  margin-bottom: var(--spacing-md);
}

.overlay-content p {
  font-size: 1.25rem;
  font-weight: 600;
}

/* Story Section */
.story-section {
  padding: var(--spacing-4xl) 0;
  background: var(--bg-secondary);
}

.story-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.story-text h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
}

.story-text p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
  font-size: 1.1rem;
}

.story-image {
  text-align: center;
}

.story-image img {
  width: 100%;
  max-width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px var(--shadow-color);
}

.image-caption {
  margin-top: var(--spacing-lg);
}

.image-caption h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.image-caption p {
  color: var(--accent-primary);
  font-weight: 500;
}

/* Values Section */
.values-section {
  padding: var(--spacing-4xl) 0;
}

.values-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-2xl);
}

.value-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 20px var(--shadow-color);
  transition: transform var(--transition-normal);
  display: flex;
  flex-direction: column;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.value-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.value-card:hover .value-image img {
  transform: scale(1.05);
}

.value-icon {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: var(--accent-primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.value-icon i {
  font-size: 1.25rem;
  color: white;
}

.value-content {
  padding: var(--spacing-2xl);
  text-align: center;
  flex: 1;
}

.value-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.value-content p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Team Section */
.team-section {
  padding: var(--spacing-4xl) 0;
  background: var(--bg-secondary);
}

.team-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.team-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.team-member {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-2xl);
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.member-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--radius-lg);
}

.member-info h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.member-title {
  color: var(--accent-primary);
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xs);
}

.member-experience {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-lg);
}

.member-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.member-specialties {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.member-specialties span {
  background: var(--accent-primary);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
}

/* Experience Section */
.experience-section {
  padding: var(--spacing-4xl) 0;
}

.experience-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.experience-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.experience-text h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
}

.experience-list {
  list-style: none;
  padding: 0;
}

.experience-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.experience-list i {
  color: var(--accent-primary);
  font-size: 1.2rem;
  margin-top: var(--spacing-xs);
}

.experience-list strong {
  color: var(--text-primary);
}

.experience-list div {
  color: var(--text-secondary);
  line-height: 1.6;
}

.experience-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px var(--shadow-color);
}

/* Awards Section */
.awards-section {
  padding: var(--spacing-4xl) 0;
  background: var(--bg-secondary);
}

.awards-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
}

.award-item {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: 0 4px 20px var(--shadow-color);
}

.award-icon {
  width: 60px;
  height: 60px;
  background: var(--accent-primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
}

.award-icon i {
  font-size: 1.5rem;
  color: white;
}

.award-item h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.award-item p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-4xl) 0;
  background: var(--accent-primary);
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: var(--spacing-lg);
}

.cta-content p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--spacing-2xl);
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
}

.cta-buttons .btn {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1.1rem;
}

.cta-buttons .btn-outline {
  background: transparent;
  color: white;
  border-color: white;
}

.cta-buttons .btn-outline:hover {
  background: white;
  color: var(--accent-primary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .story-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .team-member {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .experience-content {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
