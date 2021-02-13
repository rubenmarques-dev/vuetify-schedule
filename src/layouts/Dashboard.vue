<template>
  <v-app>
    <v-navigation-drawer
        app
        v-model="drawer"

        mobile-breakpoint="960"
    >

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>


    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <snackbar />
  </v-app>
</template>

<script>
import moment from 'moment'
import Snackbar from "@/components/Snackbar";
export default {
  name: "Dashboard",
  components: {Snackbar},
  data: () => ({
    drawer: false,
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


}
</script>

<style scoped>

</style>