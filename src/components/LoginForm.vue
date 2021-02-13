<template>
  <v-form>
    <v-text-field
        label="Username"
        :error-messages="this.errors.username"
        v-model="username"

    >
    </v-text-field>
    <v-text-field
        label="password"
        :type="'password'"
        :error-messages="this.errors.password"
        v-model="password"
    >
    </v-text-field>
    <v-btn
        color="primary"
        @click="loginRequest"
    >
      Login
    </v-btn>

  </v-form>
</template>

<script>

import {login} from "@/api/AuthRepository";


export default {
  name: 'LoginForm',
  data: () => ({
    username: 'CocusCeo',
    password: 'CocusCeo',
    errors: {}
  }),
  methods: {
    validate(){
      this.errors = {};
      if(!this.username) {
        this.errors.username = 'Username required'
      }
      if(!this.password) {
        this.errors.username = 'Password required'
      }

      if(!this.password && !this.username){
        this.loginRequest();
      }
    },
    loginRequest() {
      login(this.username, this.password)
          .then(() => {
            return this.$store.dispatch('auth/fetchUser')
          })
          .then(() => {
              this.$router.push('/')
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              this.errors.username = 'Wrong credentials'
            }
          })
    }
  },
}
</script>




