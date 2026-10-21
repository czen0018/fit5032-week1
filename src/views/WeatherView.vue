<template>
  <div class="container text-center mt-4">
    <h1>WEATHER APP</h1>

    <!-- 10.2.2 step 1: text field bound to "city" + Search button -->
    <div class="search-bar my-3">
      <input
        v-model="city"
        type="text"
        class="form-control d-inline-block w-auto"
        placeholder="Enter city name (e.g. Clayton, AU)"
        @keyup.enter="searchByCity"
      />
      <button class="btn btn-primary ms-2" @click="searchByCity">Search</button>
    </div>

    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

    <!-- 10.2.2 step 3.1: display the data returned from the API -->
    <main>
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p class="fs-3 mb-1">{{ temperature }} °C</p>
        </div>
        <span class="text-capitalize">{{ weatherData.weather[0].description }}</span>
        <p class="text-muted small mt-2">
          Source: {{ source }}
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// 10.1.2: API key is read from .env (VITE_OPENWEATHER_API_KEY)
const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY

// Reactive state
const city = ref('')
const weatherData = ref(null)
const errorMessage = ref('')
const source = ref('')

// Computed: temperature in Celsius (API called with units=metric)
const temperature = computed(() => {
  return weatherData.value ? Math.round(weatherData.value.main.temp) : null
})

// Computed: icon URL from the OpenWeatherMap icon code (e.g. "04d")
const iconUrl = computed(() => {
  return weatherData.value
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
    : null
})

// Shared GET helper with try / catch
const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url)
    weatherData.value = response.data
    errorMessage.value = ''
  } catch (error) {
    console.error('Error fetching weather data:', error)
    weatherData.value = null
    errorMessage.value =
      error.response?.status === 404
        ? 'City not found. Try a format like "Clayton, AU".'
        : 'Could not load weather data. Check your API key and network.'
  }
}

// Task 10.1: current location weather via the browser Geolocation API
const fetchCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    errorMessage.value = 'Geolocation is not supported by this browser.'
    return
  }
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`
      source.value = `Current location (lat ${latitude.toFixed(3)}, lon ${longitude.toFixed(3)})`
      await fetchWeatherData(url)
    },
    (error) => {
      console.error('Geolocation error:', error)
      errorMessage.value = 'Location access denied. Enter a city name to search instead.'
    }
  )
}

// Task 10.2: search weather by city, e.g. "Clayton, AU"
const searchByCity = async () => {
  if (!city.value.trim()) {
    errorMessage.value = 'Please enter a city name.'
    return
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.value.trim())}&appid=${apikey}&units=metric`
  source.value = `Search: "${city.value.trim()}"`
  await fetchWeatherData(url)
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>
