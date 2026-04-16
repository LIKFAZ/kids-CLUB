<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

const props = defineProps<{ clubId: number }>()
const emit = defineEmits(['success'])

const schema = toTypedSchema(z.object({
  parentName: z.string().min(2, 'Минимум 2 символа').max(50),
  childName: z.string().min(2, 'Минимум 2 символа').max(30),
  childAge: z.number().min(3, 'От 3 лет').max(18, 'До 18 лет'),
  phone: z.string().regex(/^\+?[789]?\d{10,12}$/, 'Формат: +79991234567'),
  comment: z.string().max(200).optional()
}))

const { handleSubmit, errors, values, resetForm, isSubmitting } = useForm({ 
  validationSchema: schema,
  initialValues: { childAge: 7 }
})

const onSubmit = handleSubmit(async () => {
  try {
    await $fetch('/api/book', { 
      method: 'POST', 
      body: { ...values.value, clubId: props.clubId } 
    })
    toast.success('✅ Заявка отправана! Мы свяжемся с вами в течение часа.')
    emit('success')
    resetForm()
  } catch {
    toast.error('❌ Ошибка отправки. Попробуйте позвонить напрямую.')
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
      <input v-model="values.parentName" name="parentName" placeholder="Иван Иванов" class="input" />
      <p v-if="errors.parentName" class="text-red-500 text-xs mt-1">{{ errors.parentName }}</p>
    </div>
    
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Имя ребёнка *</label>
        <input v-model="values.childName" name="childName" placeholder="Анна" class="input" />
        <p v-if="errors.childName" class="text-red-500 text-xs mt-1">{{ errors.childName }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Возраст *</label>
        <input type="number" v-model.number="values.childAge" name="childAge" min="3" max="18" class="input" />
        <p v-if="errors.childAge" class="text-red-500 text-xs mt-1">{{ errors.childAge }}</p>
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
      <input v-model="values.phone" name="phone" placeholder="+79991234567" class="input" />
      <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Комментарий (необязательно)</label>
      <textarea v-model="values.comment" name="comment" rows="2" placeholder="Пожелания, вопросы..." class="input resize-none" />
    </div>
    
    <button type="submit" :disabled="isSubmitting" class="btn-primary w-full flex items-center justify-center gap-2">
      <span v-if="isSubmitting" class="animate-spin">⏳</span>
      {{ isSubmitting ? 'Отправка...' : '🚀 Отправить заявку' }}
    </button>
    
    <p class="text-xs text-gray-400 text-center">
      Нажимая кнопку, вы соглашаетесь с <a href="#" class="text-blue-600 hover:underline">политикой конфиденциальности</a>
    </p>
  </form>
</template>