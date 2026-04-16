import { defineStore } from 'pinia'

export const useClubsStore = defineStore('clubs', {
  state: () => ({
    filters: {
      query: '',
      category: '',
      age: null as number | null
    },
    favorites: [] as number[]
  }),
  
  actions: {
    toggleFavorite(clubId: number) {
      if (this.favorites.includes(clubId)) {
        this.favorites = this.favorites.filter(id => id !== clubId)
      } else {
        this.favorites.push(clubId)
      }
    },
    
    isFavorite(clubId: number) {
      return this.favorites.includes(clubId)
    }
  }
})