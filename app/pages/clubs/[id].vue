<template>
  <div v-if="club" class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <button @click="$router.back()" class="mb-4 text-blue-600 hover:text-blue-700">
        ← Назад к списку
      </button>
      
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img :src="club.image" :alt="club.name" class="w-full h-64 object-cover">
        
        <div class="p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ club.name }}</h1>
          
          <div class="flex items-center gap-4 mb-6">
            <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {{ getCategoryName(club.category) }}
            </span>
            <span class="flex items-center gap-1">
              <span class="text-yellow-500">⭐</span>
              <span class="font-semibold">{{ club.rating }}</span>
            </span>
          </div>
          
          <div class="space-y-4 mb-6">
            <div class="flex gap-3">
              <span class="text-xl">📍</span>
              <div>
                <p class="font-semibold">{{ club.address }}</p>
                <p class="text-gray-600 text-sm">м. {{ club.metro }}</p>
              </div>
            </div>
            
            <div class="flex gap-3">
              <span class="text-xl">⏰</span>
              <div>
                <p class="font-semibold">Расписание</p>
                <p class="text-gray-600">{{ club.schedule }}</p>
              </div>
            </div>
            
            <div class="flex gap-3">
              <span class="text-xl">📞</span>
              <div>
                <p class="font-semibold">Телефон</p>
                <a :href="`tel:${club.phone}`" class="text-blue-600">{{ club.phone }}</a>
              </div>
            </div>
            
            <div class="flex gap-3">
              <span class="text-xl">💰</span>
              <div>
                <p class="font-semibold">Стоимость</p>
                <p class="text-2xl font-bold text-blue-600">{{ club.price }}/месяц</p>
              </div>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-2">О кружке</h3>
            <p class="text-gray-700">{{ club.description }}</p>
          </div>
          
          <button @click="showBooking = true" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition text-lg">
            ✍️ Записаться на пробное занятие
          </button>
        </div>
      </div>
    </div>
    
    <!-- Модалка записи -->
    <div v-if="showBooking" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="showBooking = false">
      <div class="bg-white rounded-2xl max-w-md w-full p-6" @click.stop>
        <h3 class="text-2xl font-bold mb-4">Запись на пробное занятие</h3>
        <p class="text-gray-600 mb-4">Кружок: <span class="font-semibold">{{ club.name }}</span></p>
        
        <form @submit.prevent="submitBooking">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Ваше имя</label>
            <input v-model="form.name" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Телефон</label>
            <input v-model="form.phone" required type="tel" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Возраст ребёнка</label>
            <input v-model.number="form.age" required type="number" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="flex gap-3">
            <button type="button" @click="showBooking = false" class="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition">Отмена</button>
            <button type="submit" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Отправить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-gray-600 mb-4">Кружок не найден</p>
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-700">Вернуться на главную</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const route = useRoute()
const router = useRouter()
const showBooking = ref(false)

const form = ref({
  name: '',
  phone: '',
  age: null
})

// Те же самые данные, что и на главной
const allClubs = [
  {
    id: 1,
    name: 'Футбольная академия "Чемпион"',
    category: 'sport',
    ageRange: '6-15 лет',
    price: '2500₽',
    rating: 4.9,
    address: 'ул. Спортивная, 15',
    metro: 'Спортивная',
    schedule: 'Вт/Чт 16:00-18:00, Сб 10:00-12:00',
    phone: '+7 (495) 123-45-67',
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
    schedule: 'Ср/Пт 15:00-17:00, Сб 11:00-13:00',
    phone: '+7 (495) 234-56-78',
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
    schedule: 'Пн/Ср 17:00-19:00, Сб 14:00-16:00',
    phone: '+7 (495) 345-67-89',
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
    schedule: 'Вт/Чт 16:00-18:00, Сб 12:00-14:00',
    phone: '+7 (495) 456-78-90',
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
    schedule: 'Пн/Ср/Пт 15:00-17:00',
    phone: '+7 (495) 567-89-01',
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
    schedule: 'Вт/Чт 17:00-19:00, Сб 11:00-13:00',
    phone: '+7 (495) 678-90-12',
    description: 'Обучение шахматам, турниры, разряды',
    image: 'https://images.unsplash.com/photo-1560174038-4f7c6d6c6c9f?w=400'
  }
]

const club = allClubs.find(c => c.id === parseInt(route.params.id as string))

const getCategoryName = (category: string) => {
  const names: Record<string, string> = {
    sport: 'Спорт',
    art: 'Искусство',
    science: 'Наука',
    languages: 'Языки'
  }
  return names[category] || category
}

const submitBooking = () => {
  toast.success('Заявка отправлена! Мы свяжемся с вами.')
  showBooking.value = false
  form.value = { name: '', phone: '', age: null }
}

if (!club) {
  // Если кружок не найден, перенаправляем на главную
  navigateTo('/')
}
</script>