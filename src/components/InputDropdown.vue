<template>
  <v-menu
      v-model="showDropdown"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          :value="text"
          :label="label"
          prepend-icon="mdi-calendar-clock"
          v-bind="attrs"
          v-on="on"
          :error-messages="error"
          autocomplete="off"
          readonly
      ></v-text-field>
    </template>
    <slot v-if="showDropdown"></slot>
  </v-menu>

</template>

<script>
export default {
  name: "InputDropdown",
  props:{
    label: {
      type: String,
      require:true
    },
    text: {
      type: String,
      require:true
    },
    error: {
      type: String,
      require:true
    }
  },
  data() {
    return {
      showDropdown:false
    }
  },
}
</script>

<style scoped>

</style>