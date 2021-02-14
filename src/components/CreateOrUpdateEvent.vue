<template>
  <v-row justify="center">
    <v-dialog

        :value="true"
        persistent
        max-width="600"
    >
      <v-card >
        <v-card-title>
          <span class="headline">{{ action | capitalize }} Event</span>
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
              @click="$emit('cancel')"
          >
            Cancel
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
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
      selected: [],
      event: {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        participants: [],
      },
      showAddParticipantDialog: false,
      errors: {
        title: null,
        description: null,
        startDate: null,
        endDate: null,
      },

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
        return MeetingRepository.update(this.event.id,this.body)
      }
    },
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
    }
  }
}
</script>

<style scoped>

input[type="date"] {
  position: relative;
}

/* create a new arrow, because we are going to mess up the native one
see "List of symbols" below if you want another, you could also try to add a font-awesome icon.. */
input[type="date"]:after {
  content: "\25BC";
  color: #555;
  padding: 0 5px;
}

/* change color of symbol on hover */
input[type="date"]:hover:after {
  color: #bf1400;
}

/* make the native arrow invisible and stretch it over the whole field so you can click anywhere in the input field to trigger the native datepicker*/
input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent;
}

/* adjust increase/decrease button */
input[type="date"]::-webkit-inner-spin-button {
  z-index: 1;
}

/* adjust clear button */
input[type="date"]::-webkit-clear-button {
  z-index: 1;
}

</style>