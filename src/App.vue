<script setup>
const books = [
  { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { title: '1984', author: 'George Orwell' },
  { title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling' },
  { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
]
</script>

<template>
  <main>
    <h1>Library Book List</h1>

    <ul>
      <li
        v-for="book in books"
        :key="book.title"
        :title="`Author: ${book.author}`"
        :class="{ highlighted: book.author === 'George Orwell' }"
        :style="{
          fontWeight: book.author === 'George Orwell' ? 'bold' : 'normal'
        }"
      >
        {{ book.title }} by {{ book.author }}
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  font-family: Arial, sans-serif;
  padding: 30px;
}

h1 {
  margin-bottom: 20px;
}

li {
  margin: 10px 0;
  font-size: 18px;
}

.highlighted {
  background-color: yellow;
  padding: 6px;
  border-radius: 4px;
}
</style>
