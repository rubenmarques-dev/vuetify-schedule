<template>
  <v-container class="fill-height justify-center align-center">

    <v-row class="justify-center">

      <v-col
          cols="12"
          md="5"
      >
        <v-img
            src="img.png"
            class="my-3"
            contain
            height="200"
        />
      </v-col>


      <v-col

          class="fill-height"
          cols="12"
          md="5">
        <v-card>
          <v-card-text>
            <login-form>

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
