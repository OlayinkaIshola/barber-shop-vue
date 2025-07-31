<template>
  <div :class="['loading-spinner', sizeClass, { overlay: overlay }]">
    <div class="spinner-container">
      <div :class="['spinner', spinnerType]">
        <div v-if="spinnerType === 'dots'" class="dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div v-else-if="spinnerType === 'bars'" class="bars">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <div v-else-if="spinnerType === 'pulse'" class="pulse">
          <div class="pulse-ring"></div>
          <div class="pulse-ring"></div>
          <div class="pulse-ring"></div>
        </div>
        <div v-else class="circle">
          <div class="circle-path"></div>
        </div>
      </div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  type: {
    type: String,
    default: 'circle',
    validator: (value) => ['circle', 'dots', 'bars', 'pulse'].includes(value)
  },
  message: {
    type: String,
    default: ''
  },
  overlay: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'primary'
  }
})

const sizeClass = computed(() => `size-${props.size}`)
const spinnerType = computed(() => props.type)
</script>

<style scoped>
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.loading-spinner.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.loading-message {
  color: var(--text-primary);
  font-weight: 500;
  text-align: center;
  margin: 0;
}

.overlay .loading-message {
  color: white;
}

/* Size variations */
.size-small .spinner {
  width: 24px;
  height: 24px;
}

.size-medium .spinner {
  width: 40px;
  height: 40px;
}

.size-large .spinner {
  width: 60px;
  height: 60px;
}

/* Circle Spinner */
.spinner.circle {
  position: relative;
}

.circle-path {
  width: 100%;
  height: 100%;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Dots Spinner */
.spinner.dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.dots .dot {
  width: 8px;
  height: 8px;
  background: var(--accent-primary);
  border-radius: 50%;
  animation: dotPulse 1.4s ease-in-out infinite both;
}

.dots .dot:nth-child(1) { animation-delay: -0.32s; }
.dots .dot:nth-child(2) { animation-delay: -0.16s; }
.dots .dot:nth-child(3) { animation-delay: 0s; }

@keyframes dotPulse {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Bars Spinner */
.spinner.bars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
}

.bars .bar {
  width: 4px;
  background: var(--accent-primary);
  animation: barStretch 1.2s infinite ease-in-out;
}

.size-small .bars .bar {
  height: 20px;
}

.size-medium .bars .bar {
  height: 32px;
}

.size-large .bars .bar {
  height: 48px;
}

.bars .bar:nth-child(1) { animation-delay: -1.2s; }
.bars .bar:nth-child(2) { animation-delay: -1.1s; }
.bars .bar:nth-child(3) { animation-delay: -1.0s; }
.bars .bar:nth-child(4) { animation-delay: -0.9s; }
.bars .bar:nth-child(5) { animation-delay: -0.8s; }

@keyframes barStretch {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    opacity: 0.5;
  }
  20% {
    transform: scaleY(1);
    opacity: 1;
  }
}

/* Pulse Spinner */
.spinner.pulse {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-ring {
  position: absolute;
  border: 3px solid var(--accent-primary);
  border-radius: 50%;
  animation: pulseRing 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.pulse-ring:nth-child(1) {
  animation-delay: 0s;
}

.pulse-ring:nth-child(2) {
  animation-delay: 0.25s;
}

.pulse-ring:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes pulseRing {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.size-small .pulse-ring {
  width: 24px;
  height: 24px;
}

.size-medium .pulse-ring {
  width: 40px;
  height: 40px;
}

.size-large .pulse-ring {
  width: 60px;
  height: 60px;
}

/* Color variations */
.spinner[data-color="primary"] .circle-path {
  border-top-color: var(--accent-primary);
}

.spinner[data-color="primary"] .dot,
.spinner[data-color="primary"] .bar {
  background: var(--accent-primary);
}

.spinner[data-color="primary"] .pulse-ring {
  border-color: var(--accent-primary);
}

.spinner[data-color="secondary"] .circle-path {
  border-top-color: var(--text-secondary);
}

.spinner[data-color="secondary"] .dot,
.spinner[data-color="secondary"] .bar {
  background: var(--text-secondary);
}

.spinner[data-color="secondary"] .pulse-ring {
  border-color: var(--text-secondary);
}

.spinner[data-color="white"] .circle-path {
  border-color: rgba(255, 255, 255, 0.3);
  border-top-color: white;
}

.spinner[data-color="white"] .dot,
.spinner[data-color="white"] .bar {
  background: white;
}

.spinner[data-color="white"] .pulse-ring {
  border-color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .loading-spinner {
    padding: var(--spacing-md);
  }
  
  .loading-message {
    font-size: 0.9rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .circle-path,
  .dot,
  .bar,
  .pulse-ring {
    animation-duration: 2s;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .overlay {
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>
