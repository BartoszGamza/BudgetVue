<template>
<div>
  <v-card>
    <v-card-title>
      <h3>Daily spendings:</h3>
    </v-card-title>
    <v-card-text>
      <daily-chart></daily-chart>
    </v-card-text>
  </v-card>
  <br>
  <v-card>
    <v-card-title>
      <h3>By category:</h3>
    </v-card-title>
    <v-card-text>
      <cat-chart></cat-chart>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import DailyChart from '@/components/charts/DailyChart.js'
import CatChart from '@/components/charts/CatChart.js'
export default {
  components: {
    DailyChart,
    CatChart
  }
}
</script>

