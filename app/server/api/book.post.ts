export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('📩 Заявка на запись:', body)
  return { success: true, bookingId: Date.now(), message: 'Заявка принята' }
})