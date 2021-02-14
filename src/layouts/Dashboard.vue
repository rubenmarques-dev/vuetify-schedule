<template>
  <v-app>

    <v-app-bar app class="px-8">


      <v-spacer></v-spacer>
      <v-menu
          offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn

              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
              @click="logout"
          >
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <snackbar/>
  </v-app>
</template>

<script>
import {logoutUser} from "@/api/AuthRepository";
import Snackbar from "@/components/Snackbar";

export default {
  name: "Dashboard",
  components: {Snackbar},
  data: () => ({

    group: null,
  }),
  computed: {
    picker() {
      return this.$store.getters.getPicker
    },
    calendarType() {
      return this.$store.getters.getCalendarType
    },
  },
  methods: {
    logout() {
      logoutUser()
          .then(() => {
            this.$store.dispatch("auth/setUserToNull")
            this.$router.push('/login')
          })
    }
  }


}
</script>

<style scoped>

</style>