<template>
  <v-container>
    <v-row>
      <v-col
          cols="12"
          md="4"
      >
        <v-row class="flex-column-reverse flex-md-column row">

          <div class="hidden-sm-and-down" style="height: 64px"></div>
          <v-col class="align-end col d-flex justify-center">
            <v-btn
                rounded
                color="primary"
                dark
                @click="createEvent"
            >
              Create Event
            </v-btn>
          </v-col>

          <v-col>
            <store-date-picker>

            </store-date-picker>
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
  </v-container>
</template>

<script>

import StoreDatePicker from "@/components/StoreDatePicker";
import Calendar from "@/components/Calendar";
import EventBus from "@/plugins/EventBus";

export default {
  name: 'Home',
  // eslint-disable-next-line vue/no-unused-components
  components: {Calendar, StoreDatePicker},
  computed: {
    calendarType() {
      return this.$store.getters.getCalendarType
    },
  },
  methods: {
    createEvent() {
      EventBus.$emit('popCreateEventDialog');
    }
  }
}
</script>
