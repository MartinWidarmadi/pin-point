import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION, TYPE } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

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
  faXmark,
  faCircleUser,
  faArrowRightFromBracket,
  faUserPlus,
  faPenToSquare,
  faUserMinus,
  faTrash,
  faCircleExclamation
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
  faXmark,
  faCircleUser,
  faArrowRightFromBracket,
  faUserPlus,
  faPenToSquare,
  faUserMinus,
  faTrash,
  faCircleExclamation
)

const toastOptions = {
  toastDefaults: {
    [TYPE.ERROR]: {
      position: POSITION.BOTTOM_RIGHT,
      timeout: 2000,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      draggable: true,
      draggablePercent: 60,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: 'button'
    },
    [TYPE.SUCCESS]: {
      position: POSITION.BOTTOM_RIGHT,
      timeout: 2000,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      draggable: true,
      draggablePercent: 60,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: 'button'
    }
  }
}

const app = createApp(App)

// app.use(Vue3Geolocation)
app.use(createPinia())
app.use(router)
app.use(Toast, toastOptions)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
