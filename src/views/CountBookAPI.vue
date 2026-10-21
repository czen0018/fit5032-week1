<template>
  <!-- 10.3.2 step 3: show the raw JSON returned by the Cloud Function -->
  <pre>{{ jsondata }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const COUNT_BOOKS_URL = 'https://us-central1-fit5032-4a2ec.cloudfunctions.net/countBooks'

const jsondata = ref(null)

// 10.3.2 step 1: return only response.data (JSON)
const getBookCountAPI = async () => {
  try {
    const response = await axios.get(COUNT_BOOKS_URL)
    jsondata.value = response.data
  } catch (error) {
    console.error('Error fetching book count:', error)
    jsondata.value = { error: 'Unable to fetch book count' }
  }
}

// 10.3.2 step 2: no button, call the API as soon as the page is mounted
onMounted(() => {
  getBookCountAPI()
})
</script>
