<template>
  <div class="container mt-4">
    <h1>Add Book</h1>

    <form @submit.prevent="addBook">
      <div class="mb-2">
        <label for="isbn" class="form-label">ISBN:</label>
        <input
          id="isbn"
          v-model.number="isbn"
          type="number"
          class="form-control"
          required
        />
      </div>

      <div class="mb-2">
        <label for="name" class="form-label">Book Name:</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="mb-2">
        <label for="author" class="form-label">Author:</label>
        <input
          id="author"
          v-model="author"
          type="text"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <!-- Task 9.2: show that the Cloud Function capitalised the data -->
    <div v-if="lastBook" class="card mt-4">
      <div class="card-header">
        Cloud Function result for document <code>{{ lastBook.id }}</code>
        <span v-if="lastBook.capitalized" class="badge bg-success ms-2">
          Capitalised by Cloud Function
        </span>
        <span v-else class="badge bg-warning text-dark ms-2">
          Waiting for Cloud Function...
        </span>
      </div>
      <table class="table table-bordered mb-0">
        <thead>
          <tr>
            <th>Field</th>
            <th>Entered in browser</th>
            <th>Stored in Firestore now</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in ['name', 'author']" :key="field">
            <td>{{ field }}</td>
            <td>{{ submitted[field] }}</td>
            <td><strong>{{ lastBook[field] }}</strong></td>
          </tr>
          <tr>
            <td>isbn</td>
            <td>{{ submitted.isbn }}</td>
            <td>{{ lastBook.isbn }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <BookList />
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'
import db from '../firebase/init.js'
import BookList from '../components/BookList.vue'

const isbn = ref(null)
const name = ref('')
const author = ref('')

// What the user typed, and what Firestore holds for the newest document
const submitted = ref({})
const lastBook = ref(null)
let unsubscribe = null

const addBook = async () => {
  try {
    const payload = {
      isbn: isbn.value,
      name: name.value,
      author: author.value
    }

    const docRef = await addDoc(collection(db, 'books'), payload)
    console.log('Book added successfully!', docRef.id)

    submitted.value = { ...payload }

    // Listen to the new document so the capitalised version written by the
    // capitalizeBook Cloud Function appears automatically.
    if (unsubscribe) unsubscribe()
    unsubscribe = onSnapshot(doc(db, 'books', docRef.id), (snapshot) => {
      lastBook.value = { id: snapshot.id, ...snapshot.data() }
      console.log('Firestore document updated:', lastBook.value)
    })

    isbn.value = null
    name.value = ''
    author.value = ''
  } catch (error) {
    console.error('Error adding book:', error)
  }
}

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})
</script>
