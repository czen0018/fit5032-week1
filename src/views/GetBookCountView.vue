<template>
  <div class="container text-center mt-4">
    <!-- 6.1 Header 1 -->
    <h1>Book Counter</h1>

    <!-- 6.2 Button -->
    <button class="btn btn-primary my-3" @click="getBookCount">
      Get Book Count
    </button>

    <!-- 6.3 v-if: show the count when it exists, otherwise an error -->
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-else-if="error" class="text-danger">error</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 6.4 Import axios
import axios from 'axios'

const count = ref(null)
const error = ref(false)

// 2.10 URL of the deployed countBooks Cloud Function.
// TODO after `firebase deploy --only functions`: copy the URL shown in
// Firebase console > Functions (looks like https://countbooks-xxxxx-uc.a.run.app)
const COUNT_BOOKS_URL = 'https://us-central1-fit5032-4a2ec.cloudfunctions.net/countBooks'

const getBookCount = async () => {
  // 6.6 try / catch
  try {
    // 6.5 await axios to call the Cloud Function
    const response = await axios.get(COUNT_BOOKS_URL)
    count.value = response.data.count
    error.value = false
  } catch (err) {
    console.error('Error fetching book count:', err)
    count.value = null
    error.value = true
  }
}
</script>
