<template>
  <!-- Task 10.2: all books from Firestore in JSON format -->
  <pre>{{ jsondata }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const GET_ALL_BOOKS_URL = 'https://us-central1-fit5032-4a2ec.cloudfunctions.net/getAllBooks'

const jsondata = ref(null)

const getAllBooksAPI = async () => {
  try {
    const response = await axios.get(GET_ALL_BOOKS_URL)
    jsondata.value = response.data
  } catch (error) {
    console.error('Error fetching all books:', error)
    jsondata.value = { error: 'Unable to fetch books' }
  }
}

onMounted(() => {
  getAllBooksAPI()
})
</script>
