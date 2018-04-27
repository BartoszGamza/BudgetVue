<template>
  <v-card>
    <v-card-title>
      Stats
    </v-card-title>
    <v-card-text>
      <chart></chart>
    </v-card-text>
  </v-card>
</template>

<script>
import Chart from '@/components/Chart.js'
export default {
  components: {
    Chart
  }
}
</script>

