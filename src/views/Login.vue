<template>
  <v-container class="fill-height justify-center align-center pa-8">


    <v-row class="justify-center">
      <v-col
      class="d-flex align-center">
        <v-img
            src="cocus.png"
            contain
            height="180"
        />
      </v-col>


      <v-col
          class="fill-height"
          cols="12"
          md="5">
        <v-card width="450">
          <v-card-text class="grey lighten-3">
            <login-form >

            </login-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>


import LoginForm from "@/components/LoginForm";

export default {
  name: 'Login',
  components: {LoginForm},
}
</script>
