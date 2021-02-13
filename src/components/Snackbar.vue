<!-- ./components/Snackbar.vue -->
<template>
  <v-snackbar
    v-model="show"
    :timeout="5000"
    :color="color"
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        v-bind="attrs"
        @click="show = false"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  data () {
    return {
      show: false,
      top: true,
      message: '',
      color: '',
      timeout: 5000,
    }
  },
  computed: {
    snack () {
      return this.$store.getters['snackBar/getSnack']
    },
  },
  watch: {
    snack () {
      const message = this.snack.message
      if (message) {
        this.message = message
        this.color = this.snack.color
        this.show = true
        this.$store.commit('snackBar/setSnack', {})
      }
    },
  },

}
</script>
