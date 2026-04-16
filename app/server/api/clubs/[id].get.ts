export default defineEventHandler((event) => {
  const id = parseInt(event.context.params?.id || '0')
  const clubs = [
    // ... те же данные что и в clubs.get.ts
  ]
  const club = clubs.find(c => c.id === id)
  if (!club) {
    throw createError({ statusCode: 404, message: 'Кружок не найден' })
  }
  return club
})