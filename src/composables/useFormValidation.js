import { ref, reactive, computed } from 'vue'

export function useFormValidation() {
  const errors = ref({})
  const touched = ref({})
  const isSubmitting = ref(false)

  // Validation rules
  const rules = {
    required: (value, message = 'This field is required') => {
      if (value === null || value === undefined || value === '') {
        return message
      }
      if (Array.isArray(value) && value.length === 0) {
        return message
      }
      return null
    },

    email: (value, message = 'Please enter a valid email address') => {
      if (!value) return null
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value) ? null : message
    },

    minLength: (min, message) => (value) => {
      if (!value) return null
      const msg = message || `Must be at least ${min} characters long`
      return value.length >= min ? null : msg
    },

    maxLength: (max, message) => (value) => {
      if (!value) return null
      const msg = message || `Must be no more than ${max} characters long`
      return value.length <= max ? null : msg
    },

    pattern: (regex, message = 'Invalid format') => (value) => {
      if (!value) return null
      return regex.test(value) ? null : message
    },

    phone: (value, message = 'Please enter a valid phone number') => {
      if (!value) return null
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? null : message
    },

    url: (value, message = 'Please enter a valid URL') => {
      if (!value) return null
      try {
        new URL(value)
        return null
      } catch {
        return message
      }
    },

    numeric: (value, message = 'Please enter a valid number') => {
      if (!value) return null
      return !isNaN(value) && !isNaN(parseFloat(value)) ? null : message
    },

    integer: (value, message = 'Please enter a valid integer') => {
      if (!value) return null
      return Number.isInteger(Number(value)) ? null : message
    },

    min: (min, message) => (value) => {
      if (!value) return null
      const msg = message || `Must be at least ${min}`
      return Number(value) >= min ? null : msg
    },

    max: (max, message) => (value) => {
      if (!value) return null
      const msg = message || `Must be no more than ${max}`
      return Number(value) <= max ? null : msg
    },

    confirmed: (confirmField, message) => (value, formData) => {
      if (!value) return null
      const msg = message || 'Confirmation does not match'
      return value === formData[confirmField] ? null : msg
    },

    custom: (validator, message = 'Invalid value') => (value, formData) => {
      if (!value) return null
      return validator(value, formData) ? null : message
    }
  }

  // Validate a single field
  const validateField = (fieldName, value, fieldRules, formData = {}) => {
    if (!fieldRules || fieldRules.length === 0) {
      return null
    }

    for (const rule of fieldRules) {
      let error = null
      
      if (typeof rule === 'function') {
        error = rule(value, formData)
      } else if (typeof rule === 'string' && rules[rule]) {
        error = rules[rule](value)
      } else if (typeof rule === 'object' && rule.rule && rules[rule.rule]) {
        error = rules[rule.rule](value, rule.message)
      }

      if (error) {
        return error
      }
    }

    return null
  }

  // Validate entire form
  const validateForm = (formData, validationRules) => {
    const newErrors = {}
    let isValid = true

    for (const [fieldName, fieldRules] of Object.entries(validationRules)) {
      const error = validateField(fieldName, formData[fieldName], fieldRules, formData)
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    }

    errors.value = newErrors
    return isValid
  }

  // Mark field as touched
  const touchField = (fieldName) => {
    touched.value[fieldName] = true
  }

  // Mark all fields as touched
  const touchAllFields = (validationRules) => {
    for (const fieldName of Object.keys(validationRules)) {
      touched.value[fieldName] = true
    }
  }

  // Clear errors
  const clearErrors = () => {
    errors.value = {}
  }

  // Clear specific field error
  const clearFieldError = (fieldName) => {
    if (errors.value[fieldName]) {
      delete errors.value[fieldName]
    }
  }

  // Reset form validation state
  const resetValidation = () => {
    errors.value = {}
    touched.value = {}
    isSubmitting.value = false
  }

  // Get error for specific field
  const getFieldError = (fieldName) => {
    return errors.value[fieldName] || null
  }

  // Check if field has error
  const hasFieldError = (fieldName) => {
    return !!errors.value[fieldName]
  }

  // Check if field is touched
  const isFieldTouched = (fieldName) => {
    return !!touched.value[fieldName]
  }

  // Check if form has any errors
  const hasErrors = computed(() => {
    return Object.keys(errors.value).length > 0
  })

  // Get all error messages
  const errorMessages = computed(() => {
    return Object.values(errors.value).filter(Boolean)
  })

  // Form submission handler
  const handleSubmit = async (formData, validationRules, submitCallback) => {
    isSubmitting.value = true
    touchAllFields(validationRules)

    try {
      const isValid = validateForm(formData, validationRules)
      
      if (isValid) {
        await submitCallback(formData)
        return { success: true }
      } else {
        return { success: false, errors: errors.value }
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isSubmitting.value = false
    }
  }

  // Real-time validation for a field
  const createFieldValidator = (fieldName, fieldRules, formData) => {
    return (value) => {
      const error = validateField(fieldName, value, fieldRules, formData)
      if (error) {
        errors.value[fieldName] = error
      } else {
        clearFieldError(fieldName)
      }
      return !error
    }
  }

  // Debounced validation
  const createDebouncedValidator = (fieldName, fieldRules, formData, delay = 300) => {
    let timeoutId = null
    
    return (value) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const error = validateField(fieldName, value, fieldRules, formData)
        if (error) {
          errors.value[fieldName] = error
        } else {
          clearFieldError(fieldName)
        }
      }, delay)
    }
  }

  // Common validation rule combinations
  const commonRules = {
    email: [rules.required, rules.email],
    password: [rules.required, rules.minLength(8)],
    confirmPassword: (passwordField = 'password') => [
      rules.required,
      rules.confirmed(passwordField, 'Passwords do not match')
    ],
    phone: [rules.required, rules.phone],
    name: [rules.required, rules.minLength(2), rules.maxLength(50)],
    url: [rules.url],
    required: [rules.required]
  }

  // Utility functions for specific validations
  const isValidEmail = (email) => {
    return !rules.email(email)
  }

  const isValidPhone = (phone) => {
    return !rules.phone(phone)
  }

  const isValidUrl = (url) => {
    return !rules.url(url)
  }

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return { score: 0, feedback: [] }

    const feedback = []
    let score = 0

    // Length check
    if (password.length >= 8) score += 1
    else feedback.push('Use at least 8 characters')

    // Lowercase check
    if (/[a-z]/.test(password)) score += 1
    else feedback.push('Include lowercase letters')

    // Uppercase check
    if (/[A-Z]/.test(password)) score += 1
    else feedback.push('Include uppercase letters')

    // Number check
    if (/\d/.test(password)) score += 1
    else feedback.push('Include numbers')

    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
    else feedback.push('Include special characters')

    const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][score]

    return {
      score,
      strength,
      feedback,
      isStrong: score >= 4
    }
  }

  return {
    // State
    errors,
    touched,
    isSubmitting,
    hasErrors,
    errorMessages,

    // Rules
    rules,
    commonRules,

    // Methods
    validateField,
    validateForm,
    touchField,
    touchAllFields,
    clearErrors,
    clearFieldError,
    resetValidation,
    getFieldError,
    hasFieldError,
    isFieldTouched,
    handleSubmit,
    createFieldValidator,
    createDebouncedValidator,

    // Utilities
    isValidEmail,
    isValidPhone,
    isValidUrl,
    checkPasswordStrength
  }
}

// Export individual validation rules for direct use
export const validationRules = {
  required: (message = 'This field is required') => (value) => {
    if (value === null || value === undefined || value === '') {
      return message
    }
    if (Array.isArray(value) && value.length === 0) {
      return message
    }
    return null
  },

  email: (message = 'Please enter a valid email address') => (value) => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) ? null : message
  },

  minLength: (min, message) => (value) => {
    if (!value) return null
    const msg = message || `Must be at least ${min} characters long`
    return value.length >= min ? null : msg
  },

  maxLength: (max, message) => (value) => {
    if (!value) return null
    const msg = message || `Must be no more than ${max} characters long`
    return value.length <= max ? null : msg
  },

  phone: (message = 'Please enter a valid phone number') => (value) => {
    if (!value) return null
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? null : message
  }
}
