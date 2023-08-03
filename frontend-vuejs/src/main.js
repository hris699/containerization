import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes/index'
import setAuthHeader from './utils/setAuth'

if (localStorage.access_token){
  setAuthHeader(localStorage.access_token)
} else{
  setAuthHeader(false)
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router:router,
  render: h => h(App)
}).$mount('#app')
