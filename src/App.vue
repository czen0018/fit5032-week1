<template>
  <div>
    <!-- 10.3.2 step 4: hide the header on API pages so only JSON is shown -->
    <div v-if="showHeader" class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">

          <li class="nav-item">
            <RouterLink
              to="/"
              class="nav-link"
              active-class="active"
            >
              Home (Week 5)
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/about"
              class="nav-link"
              active-class="active"
            >
              About
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/FireLogin"
              class="nav-link"
              active-class="active"
            >
              Firebase Login
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/FireRegister"
              class="nav-link"
              active-class="active"
            >
              Firebase Register
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/addbook"
              class="nav-link"
              active-class="active"
            >
              Add Book
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/GetBookCount"
              class="nav-link"
              active-class="active"
            >
              Get Book Count
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/WeatherCheck"
              class="nav-link"
              active-class="active"
            >
              Get Weather
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/CountBookAPI"
              class="nav-link"
              active-class="active"
            >
              Count Book API
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/GetAllBookAPI"
              class="nav-link"
              active-class="active"
            >
              Get All Book API
            </RouterLink>
          </li>

        </ul>
      </header>

      <hr />
    </div>

    <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

// 10.3.2 step 4: reactive check on the route name; API pages hide the header
const showHeader = computed(() => {
  const name = String(route.name || '').toLowerCase()
  return !name.includes('api')
})
</script>