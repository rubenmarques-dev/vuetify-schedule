<template>
  <v-form
  >
    <v-text-field
        class="mb-4"
        label="Username"
        :error-messages="this.errors.username"

        :loading="requesting"
        v-model="username"
    >
    </v-text-field>
    <v-text-field
        label="Password"
        :type="'password'"
        :loading="requesting"
        :error-messages="this.errors.password"
        v-model="password"
    >
    </v-text-field>
    <v-col class="ma-0 pa-0 d-flex justify-end">
      <v-btn
          color="primary"
          :loading="requesting"
          @click="validate"
      >
        Login
      </v-btn>
    </v-col>


  </v-form>
</template>

<script>

import {login} from "@/api/AuthRepository";


export default {
  name: 'LoginForm',
  data: () => ({
    username: '',
    password: '',
    errors: {
      username: null,
      password: null
    },
    requesting: false
  }),
  methods: {
    validate(){
      this.errors.username = !this.username ? 'Username is required' : null
      this.errors.password = !this.password ? 'Password is required' : null

      let errorsNotNull = Object.keys(this.errors).filter(key => this.errors[key] !== null)

      if (errorsNotNull.length === 0) {
        this.submit();
      }
    },
    submit() {
      this.requesting = true;
      login(this.username, this.password)
          .then(() => {
            return this.$store.dispatch('auth/fetchUser')
          })
          .then(() => {
              this.$router.push('/')
          })
          .catch((error) => {
            this.requesting = false;
            if (error.response && error.response.status === 401) {
              this.errors.username = 'Wrong credentials'
            }
          })
    }
  },
}
</script>




