import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify'
import { loadStripe } from '@stripe/stripe-js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(loadStripe)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  modes: 'history',
  render: h => h(App)
}).$mount('#app')
