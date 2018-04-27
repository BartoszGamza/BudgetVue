import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    // Overwriting base render method with actual data.
    const items = this.$store.getters.loadedItems
    // console.log(items)
    const times = items.map(function (item) { return item.date })
    const vals = items.map(function (item) { return parseInt(item.amnt) })
    this.renderChart({

      labels: times,
      datasets: [
        {
          label: 'Spending spree',
          backgroundColor: '#fc005a',
          data: vals
        }
      ]
    })
  }
}
