<template>
  <v-row justify="center">
    <v-dialog
        :value="true"
        persistent
        max-width="600"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Create Event</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
              >
                <v-text-field
                    label="Add title*"
                    v-model="title"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
              >
                <v-text-field
                    label="Describe the event*"
                    v-model="description"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-combobox
                    v-model="select"
                    :items="items"
                    label="Combobox"
                    multiple
                    outlined
                    dense
                ></v-combobox>
              </v-col>
              <v-col cols="6">
                <input-dropdown
                :text="startDate"
                label="Start date"
                >
                  <v-date-picker
                      :no-title="true"
                      @change="(value) => startDate = value">
                    >
                  </v-date-picker>
                </input-dropdown>
              </v-col>
              <v-col cols="6">
                <input-dropdown
                    :text="startTime"
                    label="Start Time"
                >
                  <v-time-picker
                      :no-title="true"
                      @change="(value) => startTime = value">
                  </v-time-picker>
                </input-dropdown>
              </v-col>
              <v-col cols="6">
                <input-dropdown
                    :text="endDate"
                    label="End date"
                >
                  <v-date-picker
                      :no-title="true"
                      @change="(value) => endDate = value">
                    >
                  </v-date-picker>
                </input-dropdown>
              </v-col>
              <v-col cols="6">
                <input-dropdown
                    :text="endTime"
                    label="End Time"
                >
                  <v-time-picker
                      :no-title="true"
                      @change="(value) => endTime = value">
                  </v-time-picker>
                </input-dropdown>
              </v-col>
              <!--v-col cols="6">
                <time-picker
                label="Event start"
                ></time-picker>
              </v-col>
              <v-col cols="12">
                <time-picker
                    label="Event End"
                ></time-picker>
              </v-col-->
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="$emit('close')"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="createEvent"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
import moment from "moment";

import MeetingRepository from "@/api/MeetingRepository";
import InputDropdown from "@/components/InputDropdown";
export default {
  name: "CreateEvent",
  components: {InputDropdown},
  data () {
    return {
      selected: ['Vuetify', 'Programming'],
      items: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify',
      ],
      title: '',
      description: '',
      startTime: '',
      endDate: '',
      endTime: ''
    }
  },
  props: {
    startDate: {
      type:String,
      required:true
    }
  },
  computed: {
    currentDay(){
      return moment(this.date).format('LL')
    },
    body(){
      return {
        title: this.title,
        description: this.description,
        start_date: `${this.startDate} ${this.startTime}`,
        end_date: `${this.endDate} ${this.endTime}`,
      }
    }
  },
  methods: {
    createEvent(){
      MeetingRepository.store(this.body)
      .then(({data}) => {
        this.$store.commit('snackBar/setSnack', {
          color: 'success',
          message: 'Meeting Created',
        })
        this.$emit('eventCreated', data.data)
      })
      .catch(error => {
        debugger
      })
    }
  }
}
</script>

<style scoped>

</style>