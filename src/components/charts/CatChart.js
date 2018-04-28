import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  mounted () {
    // Overwriting base render method with actual data.
    const items = this.$store.getters.loadedItems
    var result = []
    items.forEach((a) => {
      if (!this[a.cat]) {
        this[a.cat] = { cat: a.cat, amnt: 0 }
        result.push(this[a.cat])
      }
      this[a.cat].amnt += parseInt(a.amnt)
    }, Object.create(null))
    console.log(result)

    const cats = result.map(function (item) { return item.cat })
    const vals = result.map(function (item) { return parseInt(item.amnt) })
    console.log(cats)
    this.renderChart({

      labels: cats,
      datasets: [
        {
          label: 'Daily spending',
          backgroundColor: '#fc005a',
          data: vals
        }
      ]
    })
  }
}
