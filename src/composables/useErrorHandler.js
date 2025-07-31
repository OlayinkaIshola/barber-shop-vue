import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'

export function useErrorHandler() {
  const toast = useToast()
  
  // Global error state
  const errors = ref([])
  const isLoading = ref(false)
  const lastError = ref(null)

  // Error types
  const ERROR_TYPES = {
    VALIDATION: 'validation',
    NETWORK: 'network',
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    NOT_FOUND: 'not_found',
    SERVER: 'server',
    CLIENT: 'client',
    UNKNOWN: 'unknown'
  }

  // Error severity levels
  const SEVERITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
  }

  // Create standardized error object
  const createError = (message, type = ERROR_TYPES.UNKNOWN, severity = SEVERITY_LEVELS.MEDIUM, details = null) => {
    return {
      id: Date.now() + Math.random(),
      message,
      type,
      severity,
      details,
      timestamp: new Date().toISOString(),
      resolved: false
    }
  }

  // Add error to the global error list
  const addError = (error) => {
    if (typeof error === 'string') {
      error = createError(error)
    }
    
    errors.value.push(error)
    lastError.value = error
    
    // Auto-show toast for certain error types
    if (error.severity === SEVERITY_LEVELS.HIGH || error.severity === SEVERITY_LEVELS.CRITICAL) {
      showErrorToast(error.message)
    }
    
    return error
  }

  // Remove error from the list
  const removeError = (errorId) => {
    const index = errors.value.findIndex(error => error.id === errorId)
    if (index > -1) {
      errors.value.splice(index, 1)
    }
  }

  // Clear all errors
  const clearErrors = () => {
    errors.value = []
    lastError.value = null
  }

  // Mark error as resolved
  const resolveError = (errorId) => {
    const error = errors.value.find(error => error.id === errorId)
    if (error) {
      error.resolved = true
    }
  }

  // Handle different types of errors
  const handleValidationError = (message, field = null) => {
    const error = createError(message, ERROR_TYPES.VALIDATION, SEVERITY_LEVELS.MEDIUM, { field })
    addError(error)
    return error
  }

  const handleNetworkError = (message = 'Network connection failed', details = null) => {
    const error = createError(message, ERROR_TYPES.NETWORK, SEVERITY_LEVELS.HIGH, details)
    addError(error)
    showErrorToast('Connection problem. Please check your internet connection.')
    return error
  }

  const handleAuthenticationError = (message = 'Authentication failed') => {
    const error = createError(message, ERROR_TYPES.AUTHENTICATION, SEVERITY_LEVELS.HIGH)
    addError(error)
    showErrorToast('Please log in to continue.')
    return error
  }

  const handleAuthorizationError = (message = 'Access denied') => {
    const error = createError(message, ERROR_TYPES.AUTHORIZATION, SEVERITY_LEVELS.HIGH)
    addError(error)
    showErrorToast('You do not have permission to perform this action.')
    return error
  }

  const handleNotFoundError = (message = 'Resource not found') => {
    const error = createError(message, ERROR_TYPES.NOT_FOUND, SEVERITY_LEVELS.MEDIUM)
    addError(error)
    return error
  }

  const handleServerError = (message = 'Server error occurred', details = null) => {
    const error = createError(message, ERROR_TYPES.SERVER, SEVERITY_LEVELS.HIGH, details)
    addError(error)
    showErrorToast('Server error. Please try again later.')
    return error
  }

  // Generic error handler for API responses
  const handleApiError = (error, context = '') => {
    let errorMessage = 'An unexpected error occurred'
    let errorType = ERROR_TYPES.UNKNOWN
    let severity = SEVERITY_LEVELS.MEDIUM

    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const data = error.response.data

      switch (status) {
        case 400:
          errorMessage = data?.message || 'Invalid request'
          errorType = ERROR_TYPES.VALIDATION
          break
        case 401:
          errorMessage = 'Authentication required'
          errorType = ERROR_TYPES.AUTHENTICATION
          severity = SEVERITY_LEVELS.HIGH
          break
        case 403:
          errorMessage = 'Access forbidden'
          errorType = ERROR_TYPES.AUTHORIZATION
          severity = SEVERITY_LEVELS.HIGH
          break
        case 404:
          errorMessage = 'Resource not found'
          errorType = ERROR_TYPES.NOT_FOUND
          break
        case 422:
          errorMessage = data?.message || 'Validation failed'
          errorType = ERROR_TYPES.VALIDATION
          break
        case 500:
          errorMessage = 'Internal server error'
          errorType = ERROR_TYPES.SERVER
          severity = SEVERITY_LEVELS.HIGH
          break
        default:
          errorMessage = data?.message || `Server error (${status})`
          errorType = ERROR_TYPES.SERVER
          severity = SEVERITY_LEVELS.HIGH
      }
    } else if (error.request) {
      // Network error
      errorMessage = 'Network connection failed'
      errorType = ERROR_TYPES.NETWORK
      severity = SEVERITY_LEVELS.HIGH
    } else {
      // Other error
      errorMessage = error.message || 'An unexpected error occurred'
    }

    if (context) {
      errorMessage = `${context}: ${errorMessage}`
    }

    const errorObj = createError(errorMessage, errorType, severity, {
      originalError: error,
      context
    })

    return addError(errorObj)
  }

  // Async operation wrapper with error handling
  const withErrorHandling = async (operation, context = '', showLoading = true) => {
    if (showLoading) {
      isLoading.value = true
    }

    try {
      const result = await operation()
      return { success: true, data: result }
    } catch (error) {
      const errorObj = handleApiError(error, context)
      return { success: false, error: errorObj }
    } finally {
      if (showLoading) {
        isLoading.value = false
      }
    }
  }

  // Toast notification helpers
  const showSuccessToast = (message) => {
    toast.success(message)
  }

  const showErrorToast = (message) => {
    toast.error(message)
  }

  const showWarningToast = (message) => {
    toast.warning(message)
  }

  const showInfoToast = (message) => {
    toast.info(message)
  }

  // Form validation helpers
  const validateRequired = (value, fieldName) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return handleValidationError(`${fieldName} is required`, fieldName)
    }
    return null
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return handleValidationError('Please enter a valid email address', 'email')
    }
    return null
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return handleValidationError('Please enter a valid phone number', 'phone')
    }
    return null
  }

  const validateMinLength = (value, minLength, fieldName) => {
    if (value && value.length < minLength) {
      return handleValidationError(`${fieldName} must be at least ${minLength} characters long`, fieldName)
    }
    return null
  }

  // Retry mechanism for failed operations
  const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
    let lastError = null
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error
        
        if (attempt === maxRetries) {
          handleApiError(error, `Failed after ${maxRetries} attempts`)
          throw error
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt))
      }
    }
  }

  // Error recovery suggestions
  const getRecoverySuggestions = (error) => {
    const suggestions = []
    
    switch (error.type) {
      case ERROR_TYPES.NETWORK:
        suggestions.push('Check your internet connection')
        suggestions.push('Try refreshing the page')
        suggestions.push('Contact support if the problem persists')
        break
      case ERROR_TYPES.AUTHENTICATION:
        suggestions.push('Please log in again')
        suggestions.push('Check your credentials')
        break
      case ERROR_TYPES.AUTHORIZATION:
        suggestions.push('Contact an administrator for access')
        suggestions.push('Verify your account permissions')
        break
      case ERROR_TYPES.VALIDATION:
        suggestions.push('Please check the form fields')
        suggestions.push('Ensure all required fields are filled')
        break
      case ERROR_TYPES.SERVER:
        suggestions.push('Try again in a few minutes')
        suggestions.push('Contact support if the issue continues')
        break
      default:
        suggestions.push('Try refreshing the page')
        suggestions.push('Contact support if needed')
    }
    
    return suggestions
  }

  // Error reporting (for analytics/logging)
  const reportError = (error, additionalContext = {}) => {
    // In a real application, this would send error data to a logging service
    console.error('Error reported:', {
      ...error,
      additionalContext,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    })
  }

  return {
    // State
    errors,
    isLoading,
    lastError,

    // Constants
    ERROR_TYPES,
    SEVERITY_LEVELS,

    // Error management
    createError,
    addError,
    removeError,
    clearErrors,
    resolveError,

    // Specific error handlers
    handleValidationError,
    handleNetworkError,
    handleAuthenticationError,
    handleAuthorizationError,
    handleNotFoundError,
    handleServerError,
    handleApiError,

    // Utilities
    withErrorHandling,
    retryOperation,
    getRecoverySuggestions,
    reportError,

    // Toast notifications
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,

    // Validation helpers
    validateRequired,
    validateEmail,
    validatePhone,
    validateMinLength
  }
}
