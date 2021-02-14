import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'


Vue.config.productionTip = false

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})


new Vue({
  async mounted () {
    await this.$store.dispatch('auth/fetchUser')
  },
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')


