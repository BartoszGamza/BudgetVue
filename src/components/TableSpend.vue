<template>
  <div>
    <v-expansion-panel expand>
    <v-expansion-panel-content v-for="item in items" :key="item.key">
      <div slot="header">{{item.amnt}}  {{item.desc}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">on {{item.date}}  {{item.cat}}</v-card-text>
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
        <v-card class="text-xs-center">
          <v-card-text>
          <v-form>
            <v-text-field
            label="Amnout"
            v-model="amnout"
            mask="####"
            ></v-text-field>
            <v-text-field
            label="Description"
            v-model="description"
          ></v-text-field>
            <v-select
            v-model="cat"
            label="Select a category"
            single-line
            :items="cats"
        ></v-select>
            <v-date-picker
            full-width
            v-model="date"
            >
            </v-date-picker>
          </v-form>
          </v-card-text>
          
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
      isEdit: false,
      cats: ['Alcohol',
        'Grocceries',
        'Entertainment',
        'Tobacco',
        'Restaurant',
        'Soft drinks'
      ],
      cat: ''
    }
  },
  methods: {
    saveItem () {
      const itemData = {
        amnt: this.amnout,
        desc: this.description,
        date: this.date,
        cat: this.cat
      }
      this.$store.dispatch('createItem', itemData)
      this.$store.dispatch('loadItems')
      this.amnout = ''
      this.description = ''
      this.cat = ''
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
      this.cat = item.cat
      this.dialog = true
      this.id = item.id
    },
    saveEdit () {
      const itemEdit = {
        amnt: this.amnout,
        desc: this.description,
        date: this.date,
        cat: this.cat,
        id: this.id
      }
      this.$store.dispatch('editItem', itemEdit)
      this.$store.dispatch('loadItems')
      this.dialog = !this.dialog
      this.amnout = ''
      this.description = ''
      this.cat = ''
      this.date = null
      this.id = null
    }
  }
}
</script>

