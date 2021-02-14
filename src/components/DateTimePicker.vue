<template>
  <v-card>
    <v-card-text>
      <!--v-row class="justify-space-around ">
        <v-col class="d-flex justify-center pa-1 mx-1 grey lighten-1"
               @click="showDatePicker = true"
               style="cursor:pointer;"
        >
          <v-icon class="pa-2">
            mdi-calendar
          </v-icon>
        </v-col>
        <v-col class="d-flex justify-center pa-1 mx-1 grey lighten-1"
               @click="showDatePicker= false"
               style="cursor:pointer;"
        >
          <v-icon>
            mdi-clock
          </v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-date-picker
            no-title
            v-if="showDatePicker"
            @change="handlePickDate"
        >
        </v-date-picker>
        <v-time-picker
            no-title
            v-else
            @change="handlePickTime"
        >
        </v-time-picker>
      </v-row-->
      <v-row>
        <v-col>
          <v-text-field
              autofocus
              v-model="date"
              type="date"
              label="Date"
          >

          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
              v-model="time"
              type="time"
              label="Time"

          >
          </v-text-field>
        </v-col>

      </v-row>
    </v-card-text>

  </v-card>


</template>

<script>
import moment from "moment";

export default {
  name: "DateTimePicker",
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      showDatePicker: true,
      date: '',
      time: '',
    }
  },
  created() {

    let date = moment(this.value)

    if(!date.isValid())
      return
    date = date.format('YYYY-MM-DD HH:mm')
    if(this.value.includes('-')){
      this.date = moment(date).format('YYYY-MM-DD')
    }
    if(this.value.includes(':')){
      this.time = moment(date).format('HH:mm')
    }
  },
  watch: {
    date() {
      this.$emit('input', `${this.date} ${this.time}`)
    },
    time() {
      this.$emit('input', `${this.date} ${this.time}`)
    }
  },
  methods: {
    handlePickDate(value) {
      this.date = value
      setTimeout(() => {
        this.showDatePicker = false
      }, 250)

    },
    handlePickTime(value) {
      this.time = value
    },

  }
}
</script>

<style scoped>

</style>