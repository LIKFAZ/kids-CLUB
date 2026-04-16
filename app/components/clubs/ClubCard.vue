<script setup lang="ts">
const props = defineProps<{ club: any }>()
const isBookmarked = ref(false)

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  toast.success(isBookmarked.value ? 'Добавлено в избранное ❤️' : 'Удалено из избранного')
}
</script>

<template>
  <div class="card overflow-hidden group">
    <!-- Изображение/иконка -->
    <div class="h-40 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10" />
      <div class="absolute bottom-3 left-3 right-3 flex justify-between items-end">
        <span class="badge">{{ club.category }}</span>
        <button @click="toggleBookmark" class="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition" :class="isBookmarked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'">
          {{ isBookmarked ? '❤️' : '🤍' }}
        </button>
      </div>
      <div class="absolute top-3 right-3">
        <span class="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-sm font-semibold text-green-600 shadow">
          ⭐ {{ club.rating }}
        </span>
      </div>
    </div>
    
    <!-- Контент -->
    <div class="p-5">
      <h3 class="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition">{{ club.name }}</h3>
      
      <div class="space-y-2 mb-4">
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span>👶</span>
          <span>{{ club.ageRange[0] }}-{{ club.ageRange[1] }} лет</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span>🕒</span>
          <span>{{ club.schedule }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span>📍</span>
          <span class="truncate">{{ club.address || 'Центр города' }}</span>
        </div>
      </div>
      
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <span class="text-2xl font-bold text-gray-900">{{ club.price }}</span>
          <span class="text-gray-500 text-sm"> ₽/мес</span>
        </div>
        <NuxtLink :to="`/club/${club.id}`" class="btn-primary text-sm py-2 px-5">
          Записаться →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>