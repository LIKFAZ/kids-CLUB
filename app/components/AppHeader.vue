<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div class="text-2xl">🎨</div>
          <span class="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            KidsClubFinder
          </span>
        </div>
        
        <div class="hidden md:flex space-x-6">
          <a href="/" class="text-gray-700 hover:text-blue-600 transition">Главная</a>
          <a href="/clubs" class="text-gray-700 hover:text-blue-600 transition">Кружки</a>
          <a href="/favorites" class="text-gray-700 hover:text-blue-600 transition">Избранное</a>
          <a href="/contacts" class="text-gray-700 hover:text-blue-600 transition">Контакты</a>
        </div>
        
        <div class="flex items-center space-x-3">
          <button class="text-gray-600 hover:text-blue-600">
            <span class="text-xl">🔍</span>
          </button>
          <button class="btn-primary text-sm py-2 px-4">
            Войти
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
// Логика хедера при необходимости
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition;
}
</style>