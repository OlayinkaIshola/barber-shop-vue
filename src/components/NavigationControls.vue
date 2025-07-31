<template>
  <div class="nav-controls" ref="navControlsRef">
    <!-- Desktop View - Side by side -->
    <div class="desktop-controls">
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

    <!-- Mobile View - Dropdown -->
    <div class="mobile-controls">
      <button @click="toggleMobileControls" class="mobile-toggle-btn" :class="{ 'active': isMobileControlsOpen }">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div class="mobile-dropdown" :class="{ 'active': isMobileControlsOpen }">
        <button @click="goBack" class="control-btn back-btn" title="Go Back">
          <i class="fas fa-arrow-left"></i>
        </button>
        <button @click="goHome" class="control-btn home-btn" title="Go Home">
          <i class="fas fa-home"></i>
        </button>
        <button @click="handleThemeToggle" class="control-btn theme-btn" :title="`Switch to ${isDark ? 'light' : 'dark'} mode`">
          <i :class="themeIcon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { isDark, themeIcon, toggleTheme } = useTheme()

// Mobile controls state
const isMobileControlsOpen = ref(false)
const navControlsRef = ref(null)

// Navigation methods
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
  isMobileControlsOpen.value = false
}

const goHome = () => {
  router.push('/')
  isMobileControlsOpen.value = false
}

const toggleMobileControls = () => {
  isMobileControlsOpen.value = !isMobileControlsOpen.value
}

// Custom theme toggle for mobile
const handleThemeToggle = () => {
  toggleTheme()
  isMobileControlsOpen.value = false
}

// Click outside to close mobile controls
const handleClickOutside = (event) => {
  if (navControlsRef.value && !navControlsRef.value.contains(event.target)) {
    isMobileControlsOpen.value = false
  }
}

// Setup click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Navigation Controls */
.nav-controls {
  position: fixed;
  top: var(--spacing-lg);
  left: var(--spacing-lg);
  z-index: 1000;
}

/* Desktop Controls - Side by side */
.desktop-controls {
  display: flex;
  gap: var(--spacing-sm);
}

/* Mobile Controls - Dropdown */
.mobile-controls {
  display: none;
  position: relative;
}

.mobile-toggle-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  box-shadow: 0 2px 10px var(--shadow-color);
}

.mobile-toggle-btn:hover {
  background: var(--accent-primary);
  color: white;
  border: 2px solid var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.mobile-toggle-btn.active {
  background: var(--accent-primary);
  color: white;
  border: 2px solid var(--accent-primary);
}

.mobile-dropdown {
  position: absolute;
  top: 55px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  background: var(--bg-primary);
  border-radius: 12px;
  padding: var(--spacing-sm);
  box-shadow: 0 8px 25px var(--shadow-color);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.mobile-dropdown.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.control-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  box-shadow: 0 2px 10px var(--shadow-color);
}

.control-btn:hover {
  background: var(--accent-primary);
  color: white;
  border: 2px solid var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.control-btn:active {
  transform: translateY(0);
}

.back-btn:hover {
  background: #007bff;
  border: 2px solid #007bff;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.home-btn:hover {
  background: #28a745;
  border: 2px solid #28a745;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.theme-btn:hover {
  background: var(--accent-primary);
  border: 2px solid var(--accent-primary);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .desktop-controls {
    display: none;
  }

  .mobile-controls {
    display: block;
  }

  .nav-controls {
    top: var(--spacing-md);
    left: var(--spacing-md);
  }

  .control-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .mobile-toggle-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .mobile-dropdown {
    top: 50px;
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
    font-size: 0.9rem;
  }

  .mobile-toggle-btn {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }

  .mobile-dropdown {
    top: 45px;
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

/* Dark theme adjustments */
[data-theme="dark"] .control-btn {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

[data-theme="dark"] .control-btn:hover {
  background: var(--accent-primary);
  color: var(--bg-primary);
}

[data-theme="dark"] .mobile-toggle-btn {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

[data-theme="dark"] .mobile-dropdown {
  background: var(--bg-secondary);
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
