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
    handleChange(value){
      this.$store.dispatch('updatePicker',value)
    }
  }
}
</script>