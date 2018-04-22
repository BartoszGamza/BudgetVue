<template>
  <div>
    <v-expansion-panel expand>
    <v-expansion-panel-content v-for="item in items" :key="item.key">
      <div slot="header">{{item.amnt}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">{{item.desc}} on {{item.date}}</v-card-text>
        <v-card-actions>
          <v-btn flat color="green" @click="editItem(item)">Edit</v-btn>
          <v-btn flat color="red" @click="deleteItem(item.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  <v-btn
              fixed
              dark
              fab
              bottom
              right
              color="pink"
              @click="dialog = true, isEdit = false"
            >
              <v-icon>add</v-icon>
            </v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-form>
        <v-text-field
        label="Amnout"
        v-model="amnout"
        ></v-text-field>
        <v-text-field
        label="Name"
        v-model="description"
     ></v-text-field>
        <v-date-picker 
        v-model="date"
        landscape>
        </v-date-picker>
   </v-form>
    <v-card-actions>
      <v-btn v-if="isEdit==false" color="primary" @click="saveItem">Save</v-btn>
      <v-btn v-else color="primary" @click="saveEdit">Save Edit</v-btn>
      <v-btn @click.stop="dialog = !dialog">Cancel</v-btn> 
    </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
// import { db } from '../main'
export default {
  name: 'TableSpend',
  computed: {
    items () {
      return this.$store.getters.loadedItems
    }
  },
  data () {
    return {
      dialog: false,
      amnout: '',
      description: '',
      date: null,
      id: null,
      isEdit: false
    }
  },
  methods: {
    saveItem () {
      const itemData = {
        amnt: this.amnout,
        desc: this.description,
        date: this.date
      }
      this.$store.dispatch('createItem', itemData)
      this.$store.dispatch('loadItems')
      this.amnout = ''
      this.description = ''
      this.date = null
      this.dialog = !this.dialog
    },
    deleteItem (key) {
      this.$store.dispatch('deleteItem', key)
    },
    editItem (item) {
      this.isEdit = true
      this.amnout = item.amnt
      this.description = item.desc
      this.date = item.date
      this.dialog = true
      this.id = item.id
    },
    saveEdit () {
      const itemEdit = {
        amnt: this.amnout,
        desc: this.description,
        date: this.date,
        id: this.id
      }
      this.$store.dispatch('editItem', itemEdit)
      this.$store.dispatch('loadItems')
      this.dialog = !this.dialog
      this.amnout = ''
      this.description = ''
      this.date = null
      this.id = null
    }
  }
}
</script>

