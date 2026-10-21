import { createRouter, createWebHistory } from 'vue-router'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/FireLogin',
      name: 'FireLogin',
      component: FirebaseSigninView
    },
    {
      path: '/FireRegister',
      name: 'FireRegister',
      component: FirebaseRegisterView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/addbook',
      name: 'addbook',
      component: AddBookView
    },
    {
      path: '/GetBookCount',
      name: 'GetBookCount',
      component: GetBookCountView
    },
    {
      path: '/WeatherCheck',
      name: 'GetWeather',
      component: WeatherView
    },
    {
      path: '/CountBookAPI',
      name: 'CountBookAPI',
      component: CountBookAPI
    },
    {
      path: '/GetAllBookAPI',
      name: 'GetAllBookAPI',
      component: GetAllBookAPI
    }
  ]
})

export default router