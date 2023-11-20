import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBell,
  faFileLines,
  faHouse,
  faLocationDot,
  faUser,
  faCalendar,
  faChevronDown,
  faCamera,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faBell,
  faFileLines,
  faHouse,
  faLocationDot,
  faUser,
  faCalendar,
  faChevronDown,
  faCamera,
  faXmark
)

const app = createApp(App)

// app.use(Vue3Geolocation)
app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
