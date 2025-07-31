<template>
  <div class="terms-page">
    <!-- Navigation Controls -->
    <NavigationControls />

    <div class="terms-container">
      <!-- Header -->
      <div class="terms-header">
        <h1>Terms of Service</h1>
        <p class="last-updated">Last updated: {{ lastUpdated }}</p>
        <p class="intro">
          Welcome to Elite Barber Shop. These Terms of Service ("Terms") govern your use of our website and services. 
          By accessing or using our services, you agree to be bound by these Terms. Please read them carefully.
        </p>
      </div>

      <!-- Table of Contents -->
      <div class="table-of-contents">
        <h2>Table of Contents</h2>
        <ul>
          <li><a href="#acceptance">Acceptance of Terms</a></li>
          <li><a href="#services">Our Services</a></li>
          <li><a href="#appointments">Appointments and Bookings</a></li>
          <li><a href="#payments">Payments and Pricing</a></li>
          <li><a href="#cancellations">Cancellations and Refunds</a></li>
          <li><a href="#user-conduct">User Conduct</a></li>
          <li><a href="#intellectual-property">Intellectual Property</a></li>
          <li><a href="#privacy">Privacy and Data Protection</a></li>
          <li><a href="#disclaimers">Disclaimers and Limitations</a></li>
          <li><a href="#termination">Termination</a></li>
          <li><a href="#governing-law">Governing Law</a></li>
          <li><a href="#contact">Contact Information</a></li>
        </ul>
      </div>

      <!-- Content Sections -->
      <div class="terms-content">
        <!-- Acceptance of Terms -->
        <section id="acceptance" class="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Elite Barber Shop's website, mobile application, or services, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, 
            please do not use our services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and Elite Barber Shop. We reserve the right to modify 
            these Terms at any time, and such modifications will be effective immediately upon posting on our website.
          </p>
        </section>

        <!-- Our Services -->
        <section id="services" class="terms-section">
          <h2>2. Our Services</h2>
          <p>Elite Barber Shop provides professional grooming services including:</p>
          <ul>
            <li>Haircuts and styling</li>
            <li>Beard trimming and shaping</li>
            <li>Hot towel shaves</li>
            <li>Mustache grooming</li>
            <li>Hair washing and conditioning</li>
            <li>Scalp treatments</li>
            <li>Grooming consultations</li>
          </ul>
          
          <h3>Service Standards</h3>
          <p>
            We strive to provide high-quality services performed by licensed and experienced barbers. All services are subject to 
            availability and may vary based on individual needs and preferences.
          </p>
        </section>

        <!-- Appointments and Bookings -->
        <section id="appointments" class="terms-section">
          <h2>3. Appointments and Bookings</h2>
          
          <h3>Booking Requirements</h3>
          <ul>
            <li>You must be at least 18 years old to book appointments independently</li>
            <li>Minors must be accompanied by a parent or guardian</li>
            <li>Accurate contact information is required for all bookings</li>
            <li>Special requests should be noted at the time of booking</li>
          </ul>

          <h3>Appointment Confirmation</h3>
          <p>
            All appointments are subject to confirmation by Elite Barber Shop. You will receive a confirmation email or text message 
            with your appointment details. If you do not receive confirmation within 24 hours, please contact us directly.
          </p>

          <h3>Punctuality</h3>
          <p>
            Please arrive on time for your appointment. Late arrivals may result in shortened service time or rescheduling, 
            depending on availability. Customers who arrive more than 15 minutes late may be considered a no-show.
          </p>
        </section>

        <!-- Payments and Pricing -->
        <section id="payments" class="terms-section">
          <h2>4. Payments and Pricing</h2>
          
          <h3>Pricing</h3>
          <p>
            All prices are listed on our website and are subject to change without notice. Current pricing will be confirmed 
            at the time of booking and service delivery.
          </p>

          <h3>Payment Methods</h3>
          <p>We accept the following payment methods:</p>
          <ul>
            <li>Cash</li>
            <li>Credit and debit cards (Visa, MasterCard, American Express)</li>
            <li>Digital payments (Apple Pay, Google Pay)</li>
            <li>Gift cards and store credit</li>
          </ul>

          <h3>Payment Terms</h3>
          <p>
            Payment is due at the time of service unless other arrangements have been made in advance. For online bookings, 
            payment may be required at the time of booking or upon arrival.
          </p>

          <h3>Gratuities</h3>
          <p>
            Gratuities are appreciated but not required. Tips can be added to card payments or given in cash directly to your barber.
          </p>
        </section>

        <!-- Cancellations and Refunds -->
        <section id="cancellations" class="terms-section">
          <h2>5. Cancellations and Refunds</h2>
          
          <h3>Cancellation Policy</h3>
          <ul>
            <li>Appointments can be cancelled up to 24 hours in advance without penalty</li>
            <li>Cancellations made less than 24 hours in advance may incur a cancellation fee</li>
            <li>No-shows will be charged the full service amount</li>
            <li>Emergency cancellations will be considered on a case-by-case basis</li>
          </ul>

          <h3>Rescheduling</h3>
          <p>
            Appointments can be rescheduled up to 24 hours in advance subject to availability. Same-day rescheduling requests 
            will be accommodated when possible but cannot be guaranteed.
          </p>

          <h3>Refund Policy</h3>
          <p>
            Refunds are generally not provided for completed services. If you are unsatisfied with your service, please speak 
            with your barber or management immediately so we can address your concerns.
          </p>
        </section>

        <!-- User Conduct -->
        <section id="user-conduct" class="terms-section">
          <h2>6. User Conduct</h2>
          <p>When using our services, you agree to:</p>
          <ul>
            <li>Treat all staff and other customers with respect and courtesy</li>
            <li>Follow all posted rules and guidelines</li>
            <li>Provide accurate information when booking appointments</li>
            <li>Maintain appropriate hygiene standards</li>
            <li>Refrain from disruptive or inappropriate behavior</li>
            <li>Respect our no-smoking policy</li>
            <li>Keep personal belongings secure</li>
          </ul>

          <h3>Prohibited Activities</h3>
          <p>The following activities are strictly prohibited:</p>
          <ul>
            <li>Harassment, discrimination, or abusive behavior</li>
            <li>Use of illegal substances on the premises</li>
            <li>Bringing weapons or dangerous items</li>
            <li>Recording or photographing without permission</li>
            <li>Soliciting other customers or staff</li>
            <li>Damaging property or equipment</li>
          </ul>
        </section>

        <!-- Intellectual Property -->
        <section id="intellectual-property" class="terms-section">
          <h2>7. Intellectual Property</h2>
          <p>
            All content on our website, including text, images, logos, graphics, and software, is the property of Elite Barber Shop 
            or our licensors and is protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h3>Limited License</h3>
          <p>
            You are granted a limited, non-exclusive, non-transferable license to access and use our website for personal, 
            non-commercial purposes. You may not reproduce, distribute, modify, or create derivative works from our content 
            without written permission.
          </p>

          <h3>User Content</h3>
          <p>
            By submitting reviews, photos, or other content to our website or social media, you grant us a non-exclusive, 
            royalty-free license to use, reproduce, and display such content for promotional purposes.
          </p>
        </section>

        <!-- Privacy -->
        <section id="privacy" class="terms-section">
          <h2>8. Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. Our collection, use, and protection of your personal information is governed by 
            our Privacy Policy, which is incorporated into these Terms by reference.
          </p>
          
          <p>
            By using our services, you consent to the collection and use of your information as described in our Privacy Policy. 
            Please review our Privacy Policy to understand our practices.
          </p>
        </section>

        <!-- Disclaimers -->
        <section id="disclaimers" class="terms-section">
          <h2>9. Disclaimers and Limitations</h2>
          
          <h3>Service Disclaimers</h3>
          <p>
            While we strive to provide excellent service, we cannot guarantee specific results. Hair and grooming services 
            involve personal preferences and individual hair characteristics that may affect outcomes.
          </p>

          <h3>Health and Safety</h3>
          <p>
            Please inform your barber of any allergies, skin conditions, or health concerns before receiving services. 
            We are not responsible for adverse reactions to products or services when proper disclosure has not been made.
          </p>

          <h3>Limitation of Liability</h3>
          <p>
            Elite Barber Shop's liability for any claims arising from our services is limited to the amount paid for the 
            specific service in question. We are not liable for indirect, incidental, or consequential damages.
          </p>

          <h3>Website Availability</h3>
          <p>
            We strive to maintain website availability but cannot guarantee uninterrupted access. We are not responsible 
            for technical issues that may prevent booking or accessing our services online.
          </p>
        </section>

        <!-- Termination -->
        <section id="termination" class="terms-section">
          <h2>10. Termination</h2>
          <p>
            We reserve the right to refuse service or terminate your access to our services at any time for violation of 
            these Terms, inappropriate behavior, or any other reason at our sole discretion.
          </p>
          
          <p>
            You may discontinue using our services at any time. Upon termination, your account information may be deleted, 
            and any outstanding appointments may be cancelled.
          </p>
        </section>

        <!-- Governing Law -->
        <section id="governing-law" class="terms-section">
          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the state in which Elite Barber Shop 
            operates, without regard to conflict of law principles.
          </p>
          
          <p>
            Any disputes arising from these Terms or our services will be resolved through binding arbitration or in the 
            courts of competent jurisdiction in our operating location.
          </p>
        </section>

        <!-- Contact -->
        <section id="contact" class="terms-section">
          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          
          <div class="contact-info">
            <div class="contact-method">
              <h4>Email</h4>
              <p><a href="mailto:legal@elitebarbershop.com">legal@elitebarbershop.com</a></p>
            </div>
            
            <div class="contact-method">
              <h4>Phone</h4>
              <p><a href="tel:+15551234567">(555) 123-4567</a></p>
            </div>
            
            <div class="contact-method">
              <h4>Address</h4>
              <p>
                Elite Barber Shop<br>
                123 Main Street<br>
                Downtown District<br>
                City, State 12345
              </p>
            </div>
          </div>
        </section>
      </div>

      <!-- Footer Actions -->
      <div class="terms-footer">
        <div class="footer-actions">
          <router-link to="/contact" class="btn btn-primary">
            <i class="fas fa-envelope"></i>
            Contact Us
          </router-link>
          <router-link to="/privacy" class="btn btn-outline">
            <i class="fas fa-shield-alt"></i>
            Privacy Policy
          </router-link>
        </div>
        
        <div class="footer-links">
          <router-link to="/privacy">Privacy Policy</router-link>
          <span class="separator">|</span>
          <router-link to="/contact">Contact</router-link>
          <span class="separator">|</span>
          <router-link to="/about">About Us</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavigationControls from '../components/NavigationControls.vue'

const lastUpdated = ref('July 31, 2024')
</script>

<style scoped>
.terms-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 100px var(--spacing-lg) var(--spacing-2xl);
}

.terms-container {
  max-width: 900px;
  margin: 0 auto;
}

.terms-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.terms-header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.last-updated {
  color: var(--text-secondary);
  font-style: italic;
  margin-bottom: var(--spacing-lg);
}

.intro {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.table-of-contents {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.table-of-contents h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.table-of-contents ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-sm);
}

.table-of-contents li {
  margin-bottom: var(--spacing-sm);
}

.table-of-contents a {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-normal);
}

.table-of-contents a:hover {
  color: var(--text-primary);
  text-decoration: underline;
}

.terms-content {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.terms-section {
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-2xl);
  border-bottom: 1px solid var(--border-color);
}

.terms-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.terms-section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  padding-top: var(--spacing-lg);
}

.terms-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: var(--spacing-lg) 0 var(--spacing-md);
}

.terms-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: var(--spacing-md) 0 var(--spacing-sm);
}

.terms-section p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.terms-section ul {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  padding-left: var(--spacing-lg);
}

.terms-section li {
  margin-bottom: var(--spacing-sm);
}

.terms-section strong {
  color: var(--text-primary);
  font-weight: 600;
}

.terms-section a {
  color: var(--accent-primary);
  text-decoration: none;
}

.terms-section a:hover {
  text-decoration: underline;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
  margin: var(--spacing-xl) 0;
  padding: var(--spacing-xl);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.contact-method h4 {
  color: var(--accent-primary);
  margin-bottom: var(--spacing-sm);
}

.contact-method p {
  margin: 0;
}

.contact-method a {
  color: var(--text-primary);
  text-decoration: none;
}

.contact-method a:hover {
  color: var(--accent-primary);
}

.terms-footer {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 4px 20px var(--shadow-color);
  text-align: center;
}

.footer-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  color: var(--text-secondary);
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-normal);
}

.footer-links a:hover {
  color: var(--accent-primary);
}

.separator {
  color: var(--border-color);
}

/* Responsive Design */
@media (max-width: 768px) {
  .terms-header h1 {
    font-size: 2.5rem;
  }
  
  .table-of-contents ul {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  .footer-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .footer-links {
    flex-wrap: wrap;
  }
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Highlight target sections */
.terms-section:target {
  background: var(--button-hover);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin: var(--spacing-lg) 0;
  transition: background var(--transition-normal);
}
</style>
