<template>
  <div class="card group hover:shadow-xl transition-all duration-300">
    <div class="relative overflow-hidden h-48 rounded-t-xl">
      <img 
        :src="club.image || 'https://via.placeholder.com/400x200?text=Кружок'" 
        :alt="club.name"
        class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
      />
      <div class="absolute top-3 right-3">
        <button @click="toggleFavorite" class="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
          <span class="text-xl">{{ isFavorite ? '❤️' : '🤍' }}</span>
        </button>
      </div>
      <div class="absolute bottom-3 left-3">
        <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          {{ club.status || 'Набор открыт' }}
        </span>
      </div>
    </div>
    
    <div class="p-5">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-bold text-lg text-gray-900 line-clamp-1">{{ club.name }}</h3>
        <div class="flex items-center gap-1">
          <span class="text-yellow-500">⭐</span>
          <span class="text-sm font-semibold">{{ club.rating || '4.8' }}</span>
        </div>
      </div>
      
      <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <span>{{ club.category || 'Спорт' }}</span>
        <span>•</span>
        <span>{{ club.ageRange || '7-14 лет' }}</span>
      </div>
      
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">
        {{ club.description || 'Отличный кружок для развития детей' }}
      </p>
      
      <div class="flex items-center justify-between mt-4">
        <div>
          <span class="text-2xl font-bold text-blue-600">{{ club.price || 'Бесплатно' }}</span>
          <span v-if="club.price && club.price !== 'Бесплатно'" class="text-sm text-gray-500">/мес</span>
        </div>
        <button class="btn-primary text-sm py-2 px-4">
          Подробнее →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  club: {
    type: Object,
    required: true
  }
})

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // Здесь добавить логику сохранения в избранное
}
</script>

<style scoped>
.card {
  @apply bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition;
}
</style>