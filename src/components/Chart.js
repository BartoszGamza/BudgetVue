import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({

      labels: [],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: []
        }
      ]
    })
  }
}
