<template>
  <v-row>
    <v-col
        cols="12"
        md="4"
    >
      <v-row>
        <v-col>
          <v-btn
              rounded
              color="primary"
              dark
          >
            Rounded Button
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <date-picker>

          </date-picker>
        </v-col>

      </v-row>
    </v-col>
    <v-col
        cols="12"
        md="8"
    >
      <v-sheet height="600">
        <calendar></calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

import DatePicker from "@/components/DatePicker";
import Calendar from "@/components/Calendar";

export default {
  name: 'Home',
  // eslint-disable-next-line vue/no-unused-components
  components: {Calendar, DatePicker},
  computed: {
    calendarType() {
      return this.$store.getters.getCalendarType
    },
  }
}
</script>
