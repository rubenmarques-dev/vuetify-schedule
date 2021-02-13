import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'


Vue.config.productionTip = false

new Vue({
  async mounted () {
    await this.$store.dispatch('auth/fetchUser')
  },
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')


