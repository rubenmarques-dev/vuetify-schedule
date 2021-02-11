<template>
  <div>






  </div>

</template>

<script>

import DatePicker from "@/components/DatePicker";
export default {
  name: 'Drawer',
  components: {DatePicker},
  data: () => ({
    items: [
      {
        icon: 'mdi-view-dashboard',
        title: 'Agenda',
        to: '/',
      },
    ],
  }),
}
</script>