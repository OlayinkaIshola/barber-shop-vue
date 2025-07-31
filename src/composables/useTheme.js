import { ref, computed, watch, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    updateTheme()
  }

  // Update CSS custom properties and body class
  const updateTheme = () => {
    const root = document.documentElement

    if (isDark.value) {
      // Dark theme colors
      root.style.setProperty('--bg-primary', '#1a1a1a')
      root.style.setProperty('--bg-secondary', '#2d2d2d')
      root.style.setProperty('--bg-tertiary', '#3a3a3a')
      root.style.setProperty('--text-primary', '#e8e8e8')
      root.style.setProperty('--text-secondary', '#b8b8b8')
      root.style.setProperty('--text-muted', '#888888')
      root.style.setProperty('--accent-primary', '#d4af37')
      root.style.setProperty('--accent-secondary', '#f4e4bc')
      root.style.setProperty('--border-color', '#404040')
      root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)')
      root.style.setProperty('--nav-bg', 'linear-gradient(180deg, rgba(44, 44, 44, 0.95) 0%, rgba(44, 44, 44, 0.8) 70%, transparent 100%)')
      root.style.setProperty('--card-bg', 'rgba(45, 45, 45, 0.8)')
      root.style.setProperty('--input-bg', '#2d2d2d')
      root.style.setProperty('--button-hover', 'rgba(212, 175, 55, 0.1)')

      // Set data-theme attribute for CSS selectors
      root.setAttribute('data-theme', 'dark')
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
    } else {
      // Light theme colors
      root.style.setProperty('--bg-primary', '#ffffff')
      root.style.setProperty('--bg-secondary', '#f8f9fa')
      root.style.setProperty('--bg-tertiary', '#e9ecef')
      root.style.setProperty('--text-primary', '#2c2c2c')
      root.style.setProperty('--text-secondary', '#495057')
      root.style.setProperty('--text-muted', '#6c757d')
      root.style.setProperty('--accent-primary', '#d4af37')
      root.style.setProperty('--accent-secondary', '#b8860b')
      root.style.setProperty('--border-color', '#dee2e6')
      root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)')
      root.style.setProperty('--nav-bg', 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 70%, transparent 100%)')
      root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.9)')
      root.style.setProperty('--input-bg', '#ffffff')
      root.style.setProperty('--button-hover', 'rgba(212, 175, 55, 0.1)')

      // Set data-theme attribute for CSS selectors
      root.setAttribute('data-theme', 'light')
      document.body.classList.add('light-theme')
      document.body.classList.remove('dark-theme')
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  // Computed properties
  const currentTheme = computed(() => isDark.value ? 'dark' : 'light')
  const themeIcon = computed(() => isDark.value ? 'fas fa-moon' : 'fas fa-sun')

  // Watch for theme changes and save to localStorage
  watch(isDark, (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
    updateTheme()
  })

  // Listen for system theme changes
  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches
      }
    })
  })

  return {
    isDark,
    currentTheme,
    themeIcon,
    toggleTheme,
    initializeTheme
  }
}
