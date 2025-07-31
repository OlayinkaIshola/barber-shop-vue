<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div v-if="modelValue" class="modal-overlay" @click="handleOverlayClick">
        <div 
          :class="['modal-container', sizeClass, { 'modal-fullscreen': fullscreen }]"
          @click.stop
          role="dialog"
          :aria-labelledby="titleId"
          :aria-describedby="contentId"
          aria-modal="true"
        >
          <!-- Modal Header -->
          <div v-if="showHeader" class="modal-header">
            <div class="modal-title-section">
              <div v-if="icon" class="modal-icon">
                <i :class="icon"></i>
              </div>
              <h2 v-if="title" :id="titleId" class="modal-title">{{ title }}</h2>
              <slot name="title"></slot>
            </div>
            
            <div class="modal-actions">
              <slot name="header-actions"></slot>
              <button 
                v-if="closable"
                @click="close"
                class="modal-close-btn"
                aria-label="Close modal"
                type="button"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div :id="contentId" class="modal-body" :class="{ 'no-padding': noPadding }">
            <slot></slot>
          </div>

          <!-- Modal Footer -->
          <div v-if="showFooter" class="modal-footer">
            <slot name="footer">
              <div class="modal-footer-actions">
                <button 
                  v-if="showCancelButton"
                  @click="cancel"
                  class="btn btn-secondary"
                  type="button"
                >
                  <i v-if="cancelIcon" :class="cancelIcon"></i>
                  {{ cancelText }}
                </button>
                <button 
                  v-if="showConfirmButton"
                  @click="confirm"
                  :class="['btn', confirmButtonClass]"
                  :disabled="confirmDisabled"
                  type="button"
                >
                  <i v-if="confirmLoading" class="fas fa-spinner fa-spin"></i>
                  <i v-else-if="confirmIcon" :class="confirmIcon"></i>
                  {{ confirmText }}
                </button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'extra-large'].includes(value)
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  closeOnEscape: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: false
  },
  showCancelButton: {
    type: Boolean,
    default: false
  },
  showConfirmButton: {
    type: Boolean,
    default: false
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelIcon: {
    type: String,
    default: ''
  },
  confirmIcon: {
    type: String,
    default: ''
  },
  confirmType: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
  },
  confirmDisabled: {
    type: Boolean,
    default: false
  },
  confirmLoading: {
    type: Boolean,
    default: false
  },
  noPadding: {
    type: Boolean,
    default: false
  },
  persistent: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'cancel', 'confirm', 'opened', 'closed'])

// Generate unique IDs for accessibility
const titleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)
const contentId = computed(() => `modal-content-${Math.random().toString(36).substr(2, 9)}`)

const sizeClass = computed(() => `modal-${props.size}`)

const confirmButtonClass = computed(() => {
  const typeMap = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    warning: 'btn-warning',
    danger: 'btn-danger'
  }
  return typeMap[props.confirmType] || 'btn-primary'
})

// Methods
const close = () => {
  if (props.persistent) return
  emit('update:modelValue', false)
  emit('close')
}

const cancel = () => {
  if (props.persistent) return
  emit('cancel')
  close()
}

const confirm = () => {
  emit('confirm')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay && !props.persistent) {
    close()
  }
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape && props.modelValue && !props.persistent) {
    close()
  }
}

// Focus management
const focusFirstElement = () => {
  nextTick(() => {
    const modal = document.querySelector('.modal-container')
    if (modal) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    }
  })
}

const trapFocus = (event) => {
  if (!props.modelValue) return

  const modal = document.querySelector('.modal-container')
  if (!modal) return

  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.key === 'Tab') {
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }
}

// Lifecycle
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    focusFirstElement()
    emit('opened')
  } else {
    document.body.style.overflow = ''
    emit('closed')
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
  document.addEventListener('keydown', trapFocus)
  
  if (props.modelValue) {
    document.body.style.overflow = 'hidden'
    focusFirstElement()
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.removeEventListener('keydown', trapFocus)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
  backdrop-filter: blur(2px);
}

.modal-container {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Size variations */
.modal-small {
  width: 100%;
  max-width: 400px;
}

.modal-medium {
  width: 100%;
  max-width: 600px;
}

.modal-large {
  width: 100%;
  max-width: 800px;
}

.modal-extra-large {
  width: 100%;
  max-width: 1200px;
}

.modal-fullscreen {
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
  border-radius: 0;
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.modal-title-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
}

.modal-icon {
  color: var(--accent-primary);
  font-size: 1.5rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.modal-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.modal-close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.modal-close-btn:hover {
  background: var(--button-hover);
  color: var(--text-primary);
}

/* Body */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-xl);
}

.modal-body.no-padding {
  padding: 0;
}

/* Footer */
.modal-footer {
  padding: var(--spacing-xl);
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.modal-footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.3s ease;
}

/* Button styles */
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

.btn-success {
  background: #27ae60;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #219a52;
}

.btn-warning {
  background: #f39c12;
  color: white;
}

.btn-warning:hover:not(:disabled) {
  background: #e67e22;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #c0392b;
}

/* Responsive design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--spacing-md);
  }
  
  .modal-container {
    max-height: 95vh;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: var(--spacing-lg);
  }
  
  .modal-title {
    font-size: 1.3rem;
  }
  
  .modal-footer-actions {
    flex-direction: column-reverse;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .modal-container,
  .modal-leave-active .modal-container {
    transition: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .modal-container {
    border: 2px solid var(--text-primary);
  }
  
  .modal-header,
  .modal-footer {
    border-color: var(--text-primary);
  }
}
</style>
