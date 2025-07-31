<template>
  <Modal
    v-model="isVisible"
    :title="title"
    :icon="icon"
    size="small"
    :closable="!persistent"
    :close-on-overlay="!persistent"
    :close-on-escape="!persistent"
    :persistent="persistent"
    show-footer
    :show-cancel-button="true"
    :show-confirm-button="true"
    :cancel-text="cancelText"
    :confirm-text="confirmText"
    :confirm-type="type"
    :confirm-disabled="confirmDisabled"
    :confirm-loading="confirmLoading"
    :cancel-icon="cancelIcon"
    :confirm-icon="confirmIcon"
    @cancel="handleCancel"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <div class="confirm-dialog-content">
      <div v-if="showTypeIcon" class="confirm-icon">
        <i :class="typeIconClass"></i>
      </div>
      
      <div class="confirm-message">
        <p v-if="message" class="message-text">{{ message }}</p>
        <slot></slot>
      </div>

      <div v-if="details" class="confirm-details">
        <p class="details-text">{{ details }}</p>
      </div>

      <div v-if="showInput" class="confirm-input">
        <label v-if="inputLabel" class="input-label">{{ inputLabel }}</label>
        <input
          ref="inputRef"
          v-model="inputValue"
          :type="inputType"
          :placeholder="inputPlaceholder"
          :required="inputRequired"
          class="confirm-input-field"
          @keyup.enter="handleConfirm"
        />
        <p v-if="inputError" class="input-error">{{ inputError }}</p>
      </div>

      <div v-if="showCheckbox" class="confirm-checkbox">
        <label class="checkbox-label">
          <input
            v-model="checkboxValue"
            type="checkbox"
            :required="checkboxRequired"
            class="checkbox-input"
          />
          <span class="checkbox-text">{{ checkboxText }}</span>
        </label>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import Modal from './Modal.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  details: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  },
  showTypeIcon: {
    type: Boolean,
    default: true
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
    default: 'fas fa-times'
  },
  confirmIcon: {
    type: String,
    default: ''
  },
  confirmDisabled: {
    type: Boolean,
    default: false
  },
  confirmLoading: {
    type: Boolean,
    default: false
  },
  persistent: {
    type: Boolean,
    default: false
  },
  // Input options
  showInput: {
    type: Boolean,
    default: false
  },
  inputType: {
    type: String,
    default: 'text'
  },
  inputLabel: {
    type: String,
    default: ''
  },
  inputPlaceholder: {
    type: String,
    default: ''
  },
  inputRequired: {
    type: Boolean,
    default: false
  },
  inputValidator: {
    type: Function,
    default: null
  },
  // Checkbox options
  showCheckbox: {
    type: Boolean,
    default: false
  },
  checkboxText: {
    type: String,
    default: 'I understand the consequences'
  },
  checkboxRequired: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close'])

// State
const isVisible = ref(props.modelValue)
const inputValue = ref('')
const inputError = ref('')
const checkboxValue = ref(false)
const inputRef = ref(null)

// Computed
const typeIconClass = computed(() => {
  if (props.icon) return props.icon
  
  const iconMap = {
    primary: 'fas fa-question-circle text-primary',
    secondary: 'fas fa-info-circle text-secondary',
    success: 'fas fa-check-circle text-success',
    warning: 'fas fa-exclamation-triangle text-warning',
    danger: 'fas fa-exclamation-circle text-danger'
  }
  
  return iconMap[props.type] || iconMap.primary
})

const isConfirmDisabled = computed(() => {
  if (props.confirmDisabled) return true
  if (props.showInput && props.inputRequired && !inputValue.value) return true
  if (props.showCheckbox && props.checkboxRequired && !checkboxValue.value) return true
  if (inputError.value) return true
  return false
})

// Methods
const validateInput = () => {
  if (!props.showInput || !props.inputValidator) {
    inputError.value = ''
    return true
  }

  const error = props.inputValidator(inputValue.value)
  inputError.value = error || ''
  return !error
}

const handleConfirm = () => {
  if (isConfirmDisabled.value) return
  
  if (props.showInput && !validateInput()) return

  const result = {
    confirmed: true
  }

  if (props.showInput) {
    result.inputValue = inputValue.value
  }

  if (props.showCheckbox) {
    result.checkboxValue = checkboxValue.value
  }

  emit('confirm', result)
}

const handleCancel = () => {
  emit('cancel')
}

const handleClose = () => {
  emit('close')
}

const reset = () => {
  inputValue.value = ''
  inputError.value = ''
  checkboxValue.value = false
}

const focusInput = () => {
  if (props.showInput && inputRef.value) {
    nextTick(() => {
      inputRef.value.focus()
    })
  }
}

// Watchers
watch(() => props.modelValue, (newValue) => {
  isVisible.value = newValue
  if (newValue) {
    reset()
    focusInput()
  }
})

watch(isVisible, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(inputValue, () => {
  if (inputError.value) {
    validateInput()
  }
})

// Expose methods for parent component
defineExpose({
  reset,
  focusInput,
  validateInput
})
</script>

<style scoped>
.confirm-dialog-content {
  text-align: center;
}

.confirm-icon {
  margin-bottom: var(--spacing-lg);
}

.confirm-icon i {
  font-size: 3rem;
}

.confirm-icon .text-primary {
  color: var(--accent-primary);
}

.confirm-icon .text-secondary {
  color: var(--text-secondary);
}

.confirm-icon .text-success {
  color: #27ae60;
}

.confirm-icon .text-warning {
  color: #f39c12;
}

.confirm-icon .text-danger {
  color: #e74c3c;
}

.confirm-message {
  margin-bottom: var(--spacing-lg);
}

.message-text {
  font-size: 1.1rem;
  color: var(--text-primary);
  line-height: 1.5;
  margin: 0;
}

.confirm-details {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--accent-primary);
}

.details-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
  text-align: left;
}

.confirm-input {
  margin-bottom: var(--spacing-lg);
  text-align: left;
}

.input-label {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.confirm-input-field {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all var(--transition-normal);
}

.confirm-input-field:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.input-error {
  color: #e74c3c;
  font-size: 0.9rem;
  margin: var(--spacing-sm) 0 0 0;
}

.confirm-checkbox {
  margin-bottom: var(--spacing-lg);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  text-align: left;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  accent-color: var(--accent-primary);
}

.checkbox-text {
  color: var(--text-primary);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Responsive design */
@media (max-width: 768px) {
  .confirm-icon i {
    font-size: 2.5rem;
  }
  
  .message-text {
    font-size: 1rem;
  }
}

/* Animation for icon */
.confirm-icon i {
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Disable animation for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .confirm-icon i {
    animation: none;
  }
}
</style>
