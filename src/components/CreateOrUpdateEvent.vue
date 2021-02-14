<template>
  <v-row justify="center">
    <v-dialog

        :value="true"
        persistent
        max-width="600"
    >
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span class="headline">{{ action | capitalize }} Event</span>


          <div v-if="action === 'update'">
            <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="red"
                @click="handleDelete"
                v-if="!deleteEventCountdown"

            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>

            <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="red"
                @click="cancelCountdown"
                :loading="requesting"
                v-else
            >
              {{countDown}}
            </v-btn>
          </div>

        </v-card-title>
        <v-card-text style="max-height: 74vh; overflow-y: scroll">
          <v-container>
            <v-row>
              <v-col
                  cols="12"
              >
                <v-text-field
                    label="Add title*"
                    v-model="event.title"
                    autofocus
                    :error-messages="errors.title"
                    autocomplete="off"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
              >
                <v-textarea
                    label="Describe the event*"
                    auto-grow
                    rows="2 "
                    v-model="event.description"
                    :error-messages="errors.description"
                    autocomplete="off"
                ></v-textarea>
              </v-col>
              <v-col class="d-flex align-center " cols="12">
                <v-autocomplete
                    class="mr-2"
                    v-model="event.participants"
                    :items="participants"
                    item-text="name"
                    return-object
                    label="Who will attend the meeting"
                    multiple
                    autocomplete="off"
                >
                </v-autocomplete>
                <v-btn
                    color="blue darken-1"
                    outlined
                    small
                    dark
                    :loading="requesting"
                    @click="showAddParticipantDialog = true"
                >
                  <v-icon
                  >
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col
                  class="my-0"
                  cols="12"
                  md="6">
                <input-dropdown
                    :text="event.startDate"
                    label="Start date *"
                    :error="errors.startDate"
                >

                  <date-time-picker
                      v-model="event.startDate"
                  >
                  </date-time-picker>
                </input-dropdown>
              </v-col>
              <v-col
                  class="my-0"
                  cols="12"
                  md="6">
                <input-dropdown
                    :text="event.endDate"
                    label="End date"
                >
                  <date-time-picker
                      v-model="event.endDate"
                  >
                  </date-time-picker>
                </input-dropdown>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              :loading="requesting"
              @click="$emit('cancel')"
          >
            Cancel
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              :loading="requesting"
              @click="validate"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        width="400"
        v-model="showAddParticipantDialog"
        v-if="showAddParticipantDialog"
    >
      <v-card>
        <v-card-title>Create Participant</v-card-title>
        <v-card-text>
          <create-participant-form
              @cancel="showAddParticipantDialog=false"
              @created="handleCreateParticipant">
          </create-participant-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
import moment from "moment";

import MeetingRepository from "@/api/MeetingRepository";
import ParticipantsRepository from "@/api/ParticipantsRepository";
import CreateParticipantForm from "@/components/CreateParticipantForm";

import clone from 'clone'
import InputDropdown from "@/components/InputDropdown";
import DateTimePicker from "@/components/DateTimePicker";

export default {
  name: "CreateOrUpdateEvent",
  components: {
    DateTimePicker,
    InputDropdown,
    CreateParticipantForm,
  },
  props: {
    eventDate: {
      type: String,
      default: null,

    },
    original: {
      type: Object,
      default: null,
    },
    action: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      participants: [],
      event: {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        participants: [],
      },
      showAddParticipantDialog: false,
      requesting: false,
      errors: {
        title: null,
        description: null,
        startDate: null,
        endDate: null,
      },
      deleteEventCountdown: false,
      countDown: 5
    }
  },
  computed: {
    body() {
      return {
        title: this.event.title,
        description: this.event.description,
        start_date: this.event.startDate,
        end_date: this.event.endDate ? this.event.endDate : undefined,
        participants: this.event.participants.map(e => e.id)
      }
    },
    apiCall() {
      if (this.action === 'create') {
        return MeetingRepository.store(this.body)
      } else {
        return MeetingRepository.update(this.event.id, this.body)
      }
    },
  },
  destroyed() {
    this.deleteEventCountdown = false
  },
  created() {
    if (this.action === 'create') {
      this.event.startDate = this.eventDate
    } else {
      this.event = clone(this.original)
    }
    ParticipantsRepository.index()
        .then(({data}) => {
          this.participants = data.data
        })
  },
  methods: {
    validate() {
      this.validateRequired()
      this.validateStartBeforeEnd()
      this.validateStartDay()

      let errorsNotNull = Object.keys(this.errors).filter(key => this.errors[key] !== null)

      if (errorsNotNull.length === 0) {
        this.submit()
      }

    },
    validateRequired() {
      this.errors.title = !this.event.title ? 'Title is required' : null
      this.errors.description = !this.event.description ? 'Description is required' : null
      this.errors.startDate = !moment(this.event.startDate).isValid() ? 'Start Date is required' : null
    },
    validateStartDay() {
      if (!this.event.startDate.includes('-')) {
        this.errors.startDate = 'Start Date must include the day'
      }
    },
    validateStartBeforeEnd() {
      this.errors.startDate = moment(this.event.startDate).isAfter(this.event.endDate) ? 'Start Date must be before end date' : null
    },
    submit() {
      this.requesting = true
      this.apiCall
          .then(({data}) => {
            this.$emit(this.action, data.data)
          })
          .catch(error => {
            debugger
          })
    },
    handleCreateParticipant(data) {
      this.participants.push(data)
      this.event.participants.push(data)
      this.showAddParticipantDialog = false
    },
    handleDelete(){
      this.deleteEventCountdown = true;
      this.countDownMethod()
    },
    countDownMethod(){
      setTimeout(() => {
        if(!parseFloat(this.countDown)){
          this.deleteEvent();
        }
        else if(this.deleteEventCountdown){
          this.countDown = (this.countDown - 0.1).toFixed(1)
          this.countDownMethod();
        }
        else {
          this.countDown = 5
        }

      }, 100)
    },
    cancelCountdown(){
      this.deleteEventCountdown = false;
      this.countDown = 5
    },
    deleteEvent(){
      this.requesting = true
      MeetingRepository.delete(this.event.id)
      .then( () => {
        this.$emit('delete', this.event.id)
      })
    }
  }
}
</script>

<style scoped>


</style>