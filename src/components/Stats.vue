<template>
<div>
  <v-card>
    <v-card-title>
      Daily Spendings:
    </v-card-title>
    <v-card-text>
      <daily-chart></daily-chart>
    </v-card-text>
  </v-card>
  <br>
  <v-card>
    <v-card-title>
      By category:
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

