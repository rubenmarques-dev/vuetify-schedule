<template>

  <v-form>
    <v-text-field
        class="mb-4"
        label="Participant Name"
        autofocus
        v-model="name"
        :error-messages="errors.name"

    >
    </v-text-field>
    <v-row class="justify-end">
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
        Create
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import ParticipantsRepository from "@/api/ParticipantsRepository";
export default {
  name: "CreateParticipantForm",
  data() {
    return {
      name: null,
      errors: {
        name: null,
      },
      requesting: false
    }
  },
  methods: {
    validate() {
      this.errors.name = !this.name ? 'Name is required' : null
      let errorsNotNull = Object.keys(this.errors).filter(key => this.errors[key] !== null)

      if (errorsNotNull.length === 0) {
        this.createParticipant()
      }

    },
    createParticipant() {
      this.requesting = true;
      ParticipantsRepository.store({
        name:this.name
      })
      .then(({data}) => {
        this.$store.commit('snackBar/setSnack', {
          color: 'success',
          message: 'Participant Created',
        })
        this.$emit('created', data.data)
      })
      .catch(({response}) => {
        this.requesting = false;
        if(response.status === 422){
          this.errors.name = response.data.errors.name[0];
        }
      })

    }
  }
}
</script>

<style scoped>

</style>