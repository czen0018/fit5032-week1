<template>
  <div>
    <h2>Books Query Result</h2>

    <p>
      Query: ISBN &gt; 1000, ordered by ISBN (ascending), maximum 3 books
    </p>

    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} (ISBN: {{ book.isbn }})

        <button @click="updateBook(book.id)">
          Update
        </button>

        <button @click="deleteBook(book.id)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

import db from '../firebase/init.js'

const books = ref([])

// Retrieve books using where, orderBy and limit
const getBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(3)
    )

    const querySnapshot = await getDocs(q)

    books.value = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }))
  } catch (error) {
    console.error('Error getting books:', error)
  }
}

// Update a book
const updateBook = async (id) => {
  try {
    const bookRef = doc(db, 'books', id)

    await updateDoc(bookRef, {
      name: 'Updated Book'
    })

    console.log('Book updated successfully!')

    await getBooks()
  } catch (error) {
    console.error('Error updating book:', error)
  }
}

// Delete a book
const deleteBook = async (id) => {
  try {
    const bookRef = doc(db, 'books', id)

    await deleteDoc(bookRef)

    console.log('Book deleted successfully!')

    await getBooks()
  } catch (error) {
    console.error('Error deleting book:', error)
  }
}

onMounted(() => {
  getBooks()
})
</script>