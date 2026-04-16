<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { toast } from 'vue-sonner'

// Моковые данные кружков (вместо API)
const allClubs = ref([
  {
    id: 1,
    name: 'Футбольная академия "Чемпион"',
    category: 'sport',
    ageRange: '6-15 лет',
    ageFrom: 6,
    ageTo: 15,
    price: '2500₽',
    rating: 4.9,
    address: 'ул. Спортивная, 15',
    metro: 'Спортивная',
    description: 'Профессиональные тренеры, современное поле, участие в турнирах',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
    status: 'Набор открыт'
  },
  {
    id: 2,
    name: 'Художественная студия "Акварель"',
    category: 'art',
    ageRange: '5-12 лет',
    ageFrom: 5,
    ageTo: 12,
    price: '2000₽',
    rating: 4.8,
    address: 'ул. Тверская, 10',
    metro: 'Тверская',
    description: 'Рисование, лепка, мастер-классы, участие в выставках',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
    status: 'Набор открыт'
  },
  {
    id: 3,
    name: 'Робототехника и программирование',
    category: 'science',
    ageRange: '8-14 лет',
    ageFrom: 8,
    ageTo: 14,
    price: '3500₽',
    rating: 4.9,
    address: 'ул. Ленина, 25',
    metro: 'Курская',
    description: 'LEGO Mindstorms, Arduino, Python, участие в соревнованиях',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400',
    status: 'Набор открыт'
  },
  {
    id: 4,
    name: 'Английский язык для детей',
    category: 'languages',
    ageRange: '4-10 лет',
    ageFrom: 4,
    ageTo: 10,
    price: '2200₽',
    rating: 4.7,
    address: 'ул. Новый Арбат, 20',
    metro: 'Арбатская',
    description: 'Игровая методика, носители языка, подготовка к школе',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
    status: 'Набор открыт'
  },
  {
    id: 5,
    name: 'Спортивная гимнастика',
    category: 'sport',
    ageRange: '4-10 лет',
    ageFrom: 4,
    ageTo: 10,
    price: '2800₽',
    rating: 4.8,
    address: 'ул. Профсоюзная, 45',
    metro: 'Калужская',
    description: 'ОФП, растяжка, акробатика, выступления',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
    status: 'Набор открыт'
  },
  {
    id: 6,
    name: 'Шахматный клуб',
    category: 'science',
    ageRange: '6-16 лет',
    ageFrom: 6,
    ageTo: 16,
    price: '1500₽',
    rating: 4.9,
    address: 'ул. Покровка, 12',
    metro: 'Китай-город',
    description: 'Обучение шахматам, турниры, разряды',
    image: 'https://images.unsplash.com/photo-1560174038-4f7c6d6c6c9f?w=400',
    status: 'Набор открыт'
  }
])

// Фильтры
const filters = ref({
  query: '',
  category: '',
  age: null as number | null
})

// Отфильтрованные кружки
const clubs = computed(() => {
  let filtered = [...allClubs.value]
  
  // Фильтр по поиску
  if (filters.value.query) {
    const query = filters.value.query.toLowerCase()
    filtered = filtered.filter(club => 
      club.name.toLowerCase().includes(query) ||
      club.address.toLowerCase().includes(query) ||
      club.metro.toLowerCase().includes(query)
    )
  }
  
  // Фильтр по категории
  if (filters.value.category) {
    filtered = filtered.filter(club => club.category === filters.value.category)
  }
  
  // Фильтр по возрасту
  if (filters.value.age) {
    filtered = filtered.filter(club => 
      filters.value.age && club.ageFrom <= filters.value.age && club.ageTo >= filters.value.age
    )
  }
  
  return filtered
})

const pending = ref(false)

const refresh = () => {
  pending.value = true
  setTimeout(() => {
    pending.value = false
    toast.success(`Найдено ${clubs.value.length} кружков!`)
  }, 500)
}

// Наблюдаем за фильтрами
watch(filters, () => {
  refresh()
}, { deep: true })

const categories = [
  { id: '', name: 'Все', icon: '✨' },
  { id: 'sport', name: 'Спорт', icon: '⚽' },
  { id: 'art', name: 'Искусство', icon: '🎨' },
  { id: 'science', name: 'Наука', icon: '🔬' },
  { id: 'languages', name: 'Языки', icon: '🗣️' },
]

const resetFilters = () => {
  filters.value = { query: '', age: null, category: '' }
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero секция -->
    <section class="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Найдите кружок <br class="hidden md:block" />
          <span class="text-yellow-300">мечты</span> для ребёнка
        </h1>
        <p class="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Более 1000+ проверенных кружков: спорт, творчество, программирование, языки. Запись онлайн за 2 минуты.
        </p>
        
        <!-- Поиск -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-2 md:p-3 max-w-4xl mx-auto">
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex-1 relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input 
                v-model="filters.query" 
                placeholder="Название, район или метро..." 
                class="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 bg-white/95 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select v-model="filters.category" class="px-4 py-3 rounded-xl border border-gray-200 bg-white/95 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-40">
              <option value="">Все направления</option>
              <option v-for="cat in categories.filter(c => c.id)" :key="cat.id" :value="cat.id">
                {{ cat.icon }} {{ cat.name }}
              </option>
            </select>
            <input 
              type="number" 
              v-model.number="filters.age" 
              placeholder="Возраст" 
              min="3" 
              max="18" 
              class="px-4 py-3 rounded-xl border border-gray-200 bg-white/95 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-28"
            />
            <button @click="refresh" class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition font-medium shadow-lg">
              Найти кружки
            </button>
          </div>
        </div>
        
        <!-- Быстрые фильтры -->
        <div class="flex flex-wrap justify-center gap-2 mt-6">
          <button 
            v-for="cat in categories" 
            :key="cat.id" 
            @click="filters.category = cat.id"
            class="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-sm font-medium transition flex items-center gap-2"
            :class="filters.category === cat.id ? 'bg-white text-blue-600' : 'text-white'">
            {{ cat.icon }} {{ cat.name }}
          </button>
        </div>
      </div>
    </section>
    
    <!-- Результаты -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Найдено кружков: {{ clubs.length }}</h2>
          <p class="text-gray-600">По вашему запросу в Москве и области</p>
        </div>
      </div>
      
      <!-- Загрузка -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-md h-96 animate-pulse">
          <div class="h-40 bg-gray-200 rounded-t-xl" />
          <div class="p-5 space-y-4">
            <div class="h-6 bg-gray-200 rounded w-3/4" />
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded w-full" />
              <div class="h-4 bg-gray-200 rounded w-5/6" />
            </div>
            <div class="h-10 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      
      <!-- Пусто -->
      <div v-else-if="!clubs.length" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Ничего не найдено</h3>
        <p class="text-gray-500 mb-6">Попробуйте изменить фильтры или расширить район поиска</p>
        <button @click="resetFilters" class="bg-white text-gray-700 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition font-medium shadow-sm">
          Сбросить фильтры
        </button>
      </div>
      
      <!-- Список кружков -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="club in clubs" :key="club.id" class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
          <img :src="club.image" :alt="club.name" class="w-full h-48 object-cover">
          <div class="p-5">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-bold text-lg text-gray-900">{{ club.name }}</h3>
              <div class="flex items-center gap-1">
                <span class="text-yellow-500">⭐</span>
                <span class="text-sm font-semibold">{{ club.rating }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>{{ club.category === 'sport' ? 'Спорт' : club.category === 'art' ? 'Искусство' : club.category === 'science' ? 'Наука' : 'Языки' }}</span>
              <span>•</span>
              <span>{{ club.ageRange }}</span>
            </div>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ club.description }}</p>
            <div class="flex items-center justify-between mt-4">
              <div>
                <span class="text-2xl font-bold text-blue-600">{{ club.price }}</span>
                <span class="text-sm text-gray-500">/мес</span>
              </div>
              <NuxtLink :to="`/clubs/${club.id}`" class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition text-sm font-medium">
                Подробнее →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>