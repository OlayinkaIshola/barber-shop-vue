<template>
  <div class="nav-controls">
    <button @click="goBack" class="control-btn back-btn" title="Go Back">
      <i class="fas fa-arrow-left"></i>
    </button>
    <button @click="goHome" class="control-btn home-btn" title="Go Home">
      <i class="fas fa-home"></i>
    </button>
    <button @click="toggleTheme" class="control-btn theme-btn" :title="`Switch to ${isDark ? 'light' : 'dark'} mode`">
      <i :class="themeIcon"></i>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { isDark, themeIcon, toggleTheme } = useTheme()

// Navigation methods
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
/* Navigation Controls */
.nav-controls {
  position: fixed;
  top: var(--spacing-lg);
  left: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-sm);
  z-index: 1000;
}

.control-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.control-btn:hover {
  background: var(--accent-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.control-btn:active {
  transform: translateY(0);
}

.back-btn:hover {
  background: #3498db;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.home-btn:hover {
  background: #2ecc71;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
}

.theme-btn:hover {
  background: var(--accent-primary);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .nav-controls {
    top: var(--spacing-md);
    left: var(--spacing-md);
  }
  
  .control-btn {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .nav-controls {
    top: var(--spacing-sm);
    left: var(--spacing-sm);
  }
  
  .control-btn {
    width: 35px;
    height: 35px;
    font-size: 0.875rem;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .control-btn {
    border-width: 3px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .control-btn {
    transition: none;
  }
  
  .control-btn:hover {
    transform: none;
  }
}

/* Focus styles for accessibility */
.control-btn:focus {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

.control-btn:focus:not(:focus-visible) {
  outline: none;
}

/* Dark theme adjustments */
[data-theme="dark"] .control-btn {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

[data-theme="dark"] .control-btn:hover {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
}

/* Animation for better UX */
@keyframes controlPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.control-btn:active {
  animation: controlPulse 0.2s ease;
}
</style>
