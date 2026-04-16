<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Моковые данные кружков
const allClubs = ref([
  {
    id: 1,
    name: 'Футбольная академия "Чемпион"',
    category: 'sport',
    ageRange: '6-15 лет',
    price: '2500₽',
    rating: 4.9,
    address: 'ул. Спортивная, 15',
    metro: 'Спортивная',
    description: 'Профессиональные тренеры, современное поле, участие в турнирах',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400'
  },
  {
    id: 2,
    name: 'Художественная студия "Акварель"',
    category: 'art',
    ageRange: '5-12 лет',
    price: '2000₽',
    rating: 4.8,
    address: 'ул. Тверская, 10',
    metro: 'Тверская',
    description: 'Рисование, лепка, мастер-классы, участие в выставках',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400'
  },
  {
    id: 3,
    name: 'Робототехника и программирование',
    category: 'science',
    ageRange: '8-14 лет',
    price: '3500₽',
    rating: 4.9,
    address: 'ул. Ленина, 25',
    metro: 'Курская',
    description: 'LEGO Mindstorms, Arduino, Python, участие в соревнованиях',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400'
  },
  {
    id: 4,
    name: 'Английский язык для детей',
    category: 'languages',
    ageRange: '4-10 лет',
    price: '2200₽',
    rating: 4.7,
    address: 'ул. Новый Арбат, 20',
    metro: 'Арбатская',
    description: 'Игровая методика, носители языка, подготовка к школе',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400'
  },
  {
    id: 5,
    name: 'Спортивная гимнастика',
    category: 'sport',
    ageRange: '4-10 лет',
    price: '2800₽',
    rating: 4.8,
    address: 'ул. Профсоюзная, 45',
    metro: 'Калужская',
    description: 'ОФП, растяжка, акробатика, выступления',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400'
  },
  {
    id: 6,
    name: 'Шахматный клуб',
    category: 'science',
    ageRange: '6-16 лет',
    price: '1500₽',
    rating: 4.9,
    address: 'ул. Покровка, 12',
    metro: 'Китай-город',
    description: 'Обучение шахматам, турниры, разряды',
    image: 'https://images.unsplash.com/photo-1560174038-4f7c6d6c6c9f?w=400'
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
  
  if (filters.value.query) {
    const query = filters.value.query.toLowerCase()
    filtered = filtered.filter(club => 
      club.name.toLowerCase().includes(query) ||
      club.address.toLowerCase().includes(query) ||
      club.metro.toLowerCase().includes(query)
    )
  }
  
  if (filters.value.category) {
    filtered = filtered.filter(club => club.category === filters.value.category)
  }
  
  if (filters.value.age) {
    filtered = filtered.filter(club => {
      const ageRange = club.ageRange.match(/\d+/g)
      if (ageRange) {
        const minAge = parseInt(ageRange[0])
        const maxAge = parseInt(ageRange[1])
        return filters.value.age && filters.value.age >= minAge && filters.value.age <= maxAge
      }
      return true
    })
  }
  
  return filtered
})

const categories = [
  { id: '', name: 'Все', icon: '✨' },
  { id: 'sport', name: 'Спорт', icon: '⚽' },
  { id: 'art', name: 'Искусство', icon: '🎨' },
  { id: 'science', name: 'Наука', icon: '🔬' },
  { id: 'languages', name: 'Языки', icon: '🗣️' },
]

const getCategoryName = (category: string) => {
  const names: Record<string, string> = {
    sport: 'Спорт',
    art: 'Искусство',
    science: 'Наука',
    languages: 'Языки'
  }
  return names[category] || category
}

const resetFilters = () => {
  filters.value = { query: '', age: null, category: '' }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Заголовок -->
      <div class="mb-8">
        <NuxtLink to="/" class="text-blue-600 hover:text-blue-700 mb-4 inline-block">
          ← На главную
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900">Все кружки</h1>
        <p class="text-gray-600 mt-2">Выберите занятие для вашего ребёнка</p>
      </div>
      
      <!-- Фильтры -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            v-model="filters.query" 
            placeholder="Поиск по названию, метро..." 
            class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select v-model="filters.category" class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Все категории</option>
            <option value="sport">⚽ Спорт</option>
            <option value="art">🎨 Искусство</option>
            <option value="science">🔬 Наука</option>
            <option value="languages">🗣️ Языки</option>
          </select>
          <input 
            type="number" 
            v-model.number="filters.age" 
            placeholder="Возраст ребёнка" 
            min="3" 
            max="18"
            class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div class="flex justify-between items-center mt-4">
          <p class="text-sm text-gray-600">Найдено: {{ clubs.length }} кружков</p>
          <button @click="resetFilters" class="text-blue-600 hover:text-blue-700 text-sm">
            Сбросить фильтры
          </button>
        </div>
      </div>
      
      <!-- Список кружков -->
      <div v-if="clubs.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink :to="`/clubs/${club.id}`" v-for="club in clubs" :key="club.id" class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
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
              <span>{{ getCategoryName(club.category) }}</span>
              <span>•</span>
              <span>{{ club.ageRange }}</span>
            </div>
            <p class="text-gray-600 text-sm mb-3">{{ club.description.substring(0, 80) }}...</p>
            <div class="flex items-center justify-between mt-4">
              <div>
                <span class="text-2xl font-bold text-blue-600">{{ club.price }}</span>
                <span class="text-sm text-gray-500">/мес</span>
              </div>
              <span class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Подробнее →
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
      
      <!-- Пусто -->
      <div v-else class="bg-white rounded-xl shadow-sm p-12 text-center">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Ничего не найдено</h3>
        <p class="text-gray-500 mb-6">Попробуйте изменить параметры поиска</p>
        <button @click="resetFilters" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Сбросить фильтры
        </button>
      </div>
    </div>
  </div>
</template>