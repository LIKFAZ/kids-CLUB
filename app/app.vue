<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1">
      <Toaster position="top-right" richColors closeButton />
      <NuxtPage />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import AppHeader from '~/components/AppHeader.vue'  // явный импорт
import AppFooter from '~/components/AppFooter.vue'  // явный импорт

useSeoMeta({
  title: 'КружкиПоиск — Найдите идеальное занятие для ребёнка',
  description: 'Сервис поиска и записи детей в кружки: спорт, искусство, наука, языки. Удобный фильтр, карта, онлайн-запись.',
  ogTitle: 'КружкиПоиск',
  ogDescription: 'Найдите кружок мечты для вашего ребёнка',
  twitterCard: 'summary_large_image'
})
</script>