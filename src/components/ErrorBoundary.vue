<template>
  <div class="error-boundary">
    <div v-if="hasError" class="error-display">
      <div class="error-container">
        <div class="error-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        
        <div class="error-content">
          <h2 class="error-title">{{ errorTitle }}</h2>
          <p class="error-message">{{ errorMessage }}</p>
          
          <div v-if="showDetails && errorDetails" class="error-details">
            <button 
              @click="toggleDetails" 
              class="details-toggle"
              type="button"
            >
              <i :class="showDetailsExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
              {{ showDetailsExpanded ? 'Hide Details' : 'Show Details' }}
            </button>
            
            <div v-if="showDetailsExpanded" class="details-content">
              <pre class="error-stack">{{ errorDetails }}</pre>
            </div>
          </div>
          
          <div class="error-actions">
            <button 
              @click="retry" 
              class="btn btn-primary"
              :disabled="isRetrying"
              type="button"
            >
              <i v-if="isRetrying" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-redo"></i>
              {{ isRetrying ? 'Retrying...' : 'Try Again' }}
            </button>
            
            <button 
              @click="goHome" 
              class="btn btn-secondary"
              type="button"
            >
              <i class="fas fa-home"></i>
              Go Home
            </button>
            
            <button 
              v-if="canReload"
              @click="reloadPage" 
              class="btn btn-outline"
              type="button"
            >
              <i class="fas fa-sync"></i>
              Reload Page
            </button>
          </div>
          
          <div v-if="showReportOption" class="error-report">
            <button 
              @click="reportError" 
              class="report-btn"
              :disabled="isReporting"
              type="button"
            >
              <i v-if="isReporting" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-bug"></i>
              {{ isReporting ? 'Reporting...' : 'Report This Issue' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import { useErrorHandler } from '../composables/useErrorHandler'

const props = defineProps({
  fallbackComponent: {
    type: Object,
    default: null
  },
  showDetails: {
    type: Boolean,
    default: true
  },
  showReportOption: {
    type: Boolean,
    default: true
  },
  canReload: {
    type: Boolean,
    default: true
  },
  onError: {
    type: Function,
    default: null
  },
  onRetry: {
    type: Function,
    default: null
  }
})

const emit = defineEmits(['error', 'retry', 'recover'])

const router = useRouter()
const { reportError: reportErrorToService, showErrorToast } = useErrorHandler()

// State
const hasError = ref(false)
const error = ref(null)
const errorInfo = ref(null)
const showDetailsExpanded = ref(false)
const isRetrying = ref(false)
const isReporting = ref(false)
const retryCount = ref(0)

// Computed
const errorTitle = computed(() => {
  if (!error.value) return 'Something went wrong'
  
  if (error.value.name === 'ChunkLoadError') {
    return 'Loading Error'
  }
  
  if (error.value.name === 'NetworkError') {
    return 'Connection Error'
  }
  
  return 'Application Error'
})

const errorMessage = computed(() => {
  if (!error.value) return 'An unexpected error occurred'
  
  if (error.value.name === 'ChunkLoadError') {
    return 'Failed to load application resources. This might be due to a network issue or an application update.'
  }
  
  if (error.value.name === 'NetworkError') {
    return 'Unable to connect to the server. Please check your internet connection.'
  }
  
  return error.value.message || 'An unexpected error occurred while running the application.'
})

const errorDetails = computed(() => {
  if (!error.value) return null
  
  let details = `Error: ${error.value.name || 'Unknown'}\n`
  details += `Message: ${error.value.message || 'No message'}\n`
  
  if (error.value.stack) {
    details += `\nStack Trace:\n${error.value.stack}`
  }
  
  if (errorInfo.value) {
    details += `\n\nComponent Info:\n${errorInfo.value}`
  }
  
  return details
})

// Methods
const captureError = (err, info = null) => {
  hasError.value = true
  error.value = err
  errorInfo.value = info
  
  // Call custom error handler if provided
  if (props.onError) {
    props.onError(err, info)
  }
  
  // Emit error event
  emit('error', { error: err, errorInfo: info })
  
  // Report to error service
  reportErrorToService({
    message: err.message,
    stack: err.stack,
    name: err.name,
    componentInfo: info
  })
  
  console.error('Error captured by ErrorBoundary:', err, info)
}

const retry = async () => {
  if (isRetrying.value) return
  
  isRetrying.value = true
  retryCount.value++
  
  try {
    // Call custom retry handler if provided
    if (props.onRetry) {
      await props.onRetry()
    }
    
    // Reset error state
    hasError.value = false
    error.value = null
    errorInfo.value = null
    showDetailsExpanded.value = false
    
    emit('retry', { retryCount: retryCount.value })
    
    showErrorToast('Retrying...')
    
    // Small delay to show the retry action
    setTimeout(() => {
      isRetrying.value = false
    }, 1000)
    
  } catch (retryError) {
    console.error('Retry failed:', retryError)
    showErrorToast('Retry failed. Please try again.')
    isRetrying.value = false
  }
}

const goHome = () => {
  router.push('/').catch(() => {
    // If routing fails, reload the page
    window.location.href = '/'
  })
}

const reloadPage = () => {
  window.location.reload()
}

const toggleDetails = () => {
  showDetailsExpanded.value = !showDetailsExpanded.value
}

const reportError = async () => {
  if (isReporting.value) return
  
  isReporting.value = true
  
  try {
    // In a real application, this would send the error to a reporting service
    const errorReport = {
      error: {
        name: error.value?.name,
        message: error.value?.message,
        stack: error.value?.stack
      },
      errorInfo: errorInfo.value,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      retryCount: retryCount.value
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Error report sent:', errorReport)
    showErrorToast('Error report sent successfully. Thank you!')
    
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError)
    showErrorToast('Failed to send error report. Please try again.')
  } finally {
    isReporting.value = false
  }
}

// Error capture for Vue errors
onErrorCaptured((err, instance, info) => {
  captureError(err, info)
  return false // Prevent the error from propagating further
})

// Global error handlers
onMounted(() => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    captureError(new Error(event.reason), 'Unhandled Promise Rejection')
    event.preventDefault()
  })
  
  // Handle JavaScript errors
  window.addEventListener('error', (event) => {
    captureError(event.error || new Error(event.message), 'JavaScript Error')
  })
  
  // Handle chunk loading errors (common in SPAs)
  window.addEventListener('error', (event) => {
    if (event.target && event.target.tagName === 'SCRIPT') {
      captureError(new Error('ChunkLoadError'), 'Script Loading Error')
    }
  }, true)
})

// Expose methods for parent components
defineExpose({
  captureError,
  retry,
  reset: () => {
    hasError.value = false
    error.value = null
    errorInfo.value = null
    retryCount.value = 0
  }
})
</script>

<style scoped>
.error-boundary {
  width: 100%;
  height: 100%;
}

.error-display {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  background: var(--bg-primary);
}

.error-container {
  max-width: 600px;
  width: 100%;
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: 0 10px 40px var(--shadow-color);
  text-align: center;
}

.error-icon {
  margin-bottom: var(--spacing-xl);
}

.error-icon i {
  font-size: 4rem;
  color: #e74c3c;
}

.error-content {
  margin-bottom: var(--spacing-xl);
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.error-message {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-xl);
}

.error-details {
  margin-bottom: var(--spacing-xl);
  text-align: left;
}

.details-toggle {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-md);
}

.details-toggle:hover {
  border-color: var(--accent-primary);
  color: var(--text-primary);
}

.details-content {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-color);
}

.error-stack {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--text-secondary);
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-xl);
}

.btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  font-size: 1rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--accent-primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--accent-secondary);
}

.btn-secondary {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--button-hover);
  border-color: var(--accent-primary);
}

.btn-outline {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-outline:hover:not(:disabled) {
  background: var(--button-hover);
  color: var(--text-primary);
  border-color: var(--accent-primary);
}

.error-report {
  border-top: 1px solid var(--border-color);
  padding-top: var(--spacing-lg);
}

.report-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: color var(--transition-normal);
}

.report-btn:hover:not(:disabled) {
  color: var(--accent-primary);
}

.report-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive design */
@media (max-width: 768px) {
  .error-display {
    padding: var(--spacing-md);
  }
  
  .error-container {
    padding: var(--spacing-xl);
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}

/* Animation */
.error-icon i {
  animation: errorPulse 2s ease-in-out infinite;
}

@keyframes errorPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Disable animation for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .error-icon i {
    animation: none;
  }
}
</style>
