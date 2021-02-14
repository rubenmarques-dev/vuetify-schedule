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
        <v-spacer></v-spacer>
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


        <v-toolbar-title class="hidden-xs-only" v-if="$refs.calendar">
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
              <span>{{ calendarType }}</span>
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
        event-start="startDate"
        event-end="endDate"
        @click:event="handleClickEvent"
        @click:date="handleClickDate"
        @click:time="handleClickTime"
        @click:day="handleClickDay"
    ></v-calendar>
    <create-or-update-event
        v-if="eventDate || eventShow"
        :event-date="eventDate"
        :original="eventShow"
        :action="action"
        @create="handleEventCreate"
        @update="handleEventUpdate"
        @delete="handleEventDelete"
        @cancel="clearLocalState"
    >
    </create-or-update-event>
  </div>
</template>

<script>
import CreateOrUpdateEvent from "@/components/CreateOrUpdateEvent";
import moment from "moment";
import EventBus from "@/plugins/EventBus";
import MeetingRepository from "@/api/MeetingRepository";

export default {
  components: {CreateOrUpdateEvent},
  data: () => ({
    today: moment().format('YYYY-MM-DD'),
    calendarEventClicked: false,
    eventDate: null,
    eventShow: null,
    action: null,
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
    actionUpdate() {
      return 'update'
    },
    actionCreate() {
      return 'create'
    },
  },
  created() {
    MeetingRepository.index()
        .then(({data}) => {
          this.events = data.data;
          EventBus.$on('popCreateEventDialog', () => {
            this.action = this.actionCreate
            this.eventDate = this.today;
          })
        })
        .catch((error) => {
        })
  },
  methods: {
    previousDate() {
      this.$store.dispatch('callPreviousDate')
    },
    nextDate() {
      this.$store.dispatch('callNextDate')
    },
    handleChangeCalendarType(value) {
      this.$store.dispatch('updateCalendarType', value)
    },
    setToday() {
      this.$store.dispatch('updatePicker', moment().format('YYYY-MM-DD'))
    },
    handleClickDate({date, time}) {
      if (this.calendarEventClicked) {
        this.calendarEventClicked = false;
      } else {
        if (time) {
          this.eventDate = date
        } else {
          this.action = 'create'
          this.eventDate = `${date} ${time}`
        }
      }
    },
    handleClickDay({date}) {
      if (this.calendarEventClicked) {
        this.calendarEventClicked = false
      } else {
        this.action = this.actionCreate
        this.eventDate = date
      }
    },
    handleClickTime({date, time}) {
      if (this.calendarEventClicked) {
        this.calendarEventClicked = false;
      } else {
        this.action = this.actionCreate
        this.eventDate = `${date} ${time}`
      }
    },
    handleClickEvent({event}) {
      this.calendarEventClicked = true
      this.eventShow = event
      this.action = this.actionUpdate
    },
    handleEventCreate(event) {
      this.$store.commit('snackBar/setSnack', {
        color: 'success',
        message: 'Event Created',
      });
      this.events.push(event)
      this.clearLocalState()
    },
    handleEventUpdate(eventUpdated) {
      this.$store.commit('snackBar/setSnack', {
        color: 'success',
        message: 'Event Updated',
      })
      this.events = this.events.filter(event => event.id !== eventUpdated.id)
      this.events.push(eventUpdated)
      this.clearLocalState()
    },
    clearLocalState() {
      this.eventShow = null
      this.eventDate = null
      this.action = null
    },
    handleEventDelete(id){
      this.$store.commit('snackBar/setSnack', {
        color: 'success',
        message: 'Event deleted',
      })
      this.events = this.events.filter(event => event.id !== id)
      this.clearLocalState()
    }


  }
}
</script>

<style scoped>


</style>