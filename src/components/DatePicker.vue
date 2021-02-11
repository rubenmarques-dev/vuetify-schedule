<template>
  <v-row justify="center">
    <v-date-picker
        :no-title="true"
        @change="handleChange"
        :value="picker"></v-date-picker>
  </v-row>
</template>

<script>


export default {
  computed:{
    picker () {
      return this.$store.getters.getPicker
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleChange(value){
      // eslint-disable-next-line no-debugger
      this.$store.dispatch('updatePicker',value)
    }
  }
}
</script>