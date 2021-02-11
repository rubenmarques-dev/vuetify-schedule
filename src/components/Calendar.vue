<template>
  <div>

    <v-sheet height="64">
      <v-toolbar
          flat
      >
        <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
        >
          Today
        </v-btn>
        <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="previousDate"
        >
          <v-icon small>
            mdi-chevron-left
          </v-icon>
        </v-btn>

        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="nextDate"
        >
          <v-icon small>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu
            bottom
            right
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
            >
              <span>{{ calendarType}}</span>
              <v-icon right>
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="handleChangeCalendarType('day')">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleChangeCalendarType('month')">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>



    <v-calendar
        ref="calendar"
        :now="today"
        :value="picker"
        :events="events"
        event-name="title"
        color="primary"
        :type="calendarType"
        @click:date="handleDate"
        @click:day="handleDate"
        @click:event="handleClickEvent"
    ></v-calendar>
    <create-event
        :start-date="dateClicked"
        @close="dateClicked=null"
        v-if="dateClicked"
    >

    </create-event>
  </div>
</template>

<script>
import CreateEvent from "@/components/CreateEvent";
import moment from "moment";

import MeetingRepository from "@/api/MeetingRepository";
export default {
  components: {CreateEvent},
  data: () => ({
    today: '2019-01-08',
    dateClicked: null,
    events: []
  }),
  mounted() {
    this.$refs.calendar.scrollToTime('08:00')
  },
  computed: {
    calendarType() {
      return this.$store.getters.getCalendarType
    },
    picker() {
      return this.$store.getters.getPicker
    },
  },
  created() {
    MeetingRepository.index()
    .then(({data}) => {
      debugger
      this.events = data.data;
    })
    .catch((error) => {
      debugger
    })
  },
  methods: {
    previousDate(){
      this.$store.dispatch('callPreviousDate')
    },
    nextDate(){
      this.$store.dispatch('callNextDate')
    },
    handleChangeCalendarType(value) {
      this.$store.dispatch('updateCalendarType', value)
    },
    setToday() {
      // eslint-disable-next-line no-debugger
      this.$store.dispatch('updatePicker', moment().format('YYYY-MM-DD'))
    },

    handleDate({
                 date,
                 day,
                 future,
                 hasDay,
                 hasTime,
                 hour,
                 minute,
                 month,
                 past,
                 present,
                 time,
                 weekday,
                 year,
               }) {
      this.dateClicked = date
    },
    handleClickEvent(value){
      debugger
    }
  }
}
</script>

<style scoped>

</style>