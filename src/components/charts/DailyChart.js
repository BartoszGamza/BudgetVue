import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    // Overwriting base render method with actual data.
    const items = this.$store.getters.loadedItems
    var result = []
    items.forEach((a) => {
      if (!this[a.date]) {
        this[a.date] = { date: a.date, amnt: 0 }
        result.push(this[a.date])
      }
      this[a.date].amnt += parseInt(a.amnt)
    }, Object.create(null))

    const times = result.map(function (item) { return item.date }).reverse()
    const vals = result.map(function (item) { return parseInt(item.amnt) }).reverse()

    this.renderChart({

      labels: times,
      datasets: [
        {
          label: 'Daily',
          backgroundColor: '#fc005a',
          data: vals
        }
      ]
    })
  }
}
