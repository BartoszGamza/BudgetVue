<template>
  <div>
    <v-expansion-panel expand>
    <v-expansion-panel-content v-for="item in items" :key="item.key">
      <div slot="header">{{item.amnt}}  {{item.desc}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">{{item.cat}} on {{item.date}}</v-card-text>
        <v-card-actions>
          <v-btn flat color="green" @click="editItem(item)">Edit</v-btn>
          <v-btn flat color="red" @click="deleteItem(item.id, item.amnt)">Delete</v-btn>
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
          <v-card-text >
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
            label="Amnout"
            v-model="amnout"
            type="number"
            :rules="[v => !!v || 'Amnout is required']"
            required
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
            :rules="[v => !!v || 'Category is required']"
            required
        ></v-select>
            <!-- <v-date-picker
            full-width
            v-model="date"
            :rules="[v => !!v || 'Date is required']"
            required
            >
            </v-date-picker> -->
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="80"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
            <v-text-field
              slot="activator"
              v-model="date"
              label="Select date"
              :rules="[v => !!v || 'Date is required']"
              required
            ></v-text-field>
            <v-date-picker v-model="date" @input="$refs.menu.save(date)"></v-date-picker>
          </v-menu>
          </v-form>
          </v-card-text>
          
          <v-card-actions>
            <v-btn v-if="isEdit==false" color="primary" :disabled="!valid" @click="saveItem">Save</v-btn>
            <v-btn v-else color="primary" @click="saveEdit">Save Edit</v-btn>
            <v-btn @click="clearEdit">Cancel</v-btn> 
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'TableSpend',
  data () {
    return {
      dialog: false,
      amnout: '',
      description: '',
      date: null,
      id: null,
      isEdit: false,
      cat: '',
      valid: true,
      menu: false
    }
  },
  computed: {
    items () {
      return this.$store.getters.loadedItems
    },
    cats () {
      const obj = this.$store.getters.cats
      const cats = []
      for (let key in obj) {
        cats.push(obj[key].name)
      }
      return cats
    }
  },
  created () {
    this.$store.dispatch('getUser')
    this.$store.dispatch('loadItems')
    this.$store.dispatch('loadCats')
  },
  methods: {
    saveItem () {
      if (this.$refs.form.validate()) {
        const itemData = {
          amnt: this.amnout,
          desc: this.description,
          date: this.date,
          cat: this.cat
        }
        this.$store.dispatch('createItem', itemData)
        this.$store.dispatch('loadItems')
        this.clearEdit()
      }
    },
    deleteItem (key, amnt) {
      this.$store.dispatch('deleteItem', {key, amnt})
    },
    editItem (item) {
      this.isEdit = true
      this.amnout = item.amnt
      this.description = item.desc
      this.date = item.date
      this.cat = item.cat
      this.dialog = true
      this.id = item.id
      this.$store.dispatch('updateBalance', this.amnout)
    },
    saveEdit () {
      if (this.$refs.form.validate()) {
        const itemEdit = {
          amnt: this.amnout,
          desc: this.description,
          date: this.date,
          cat: this.cat,
          id: this.id
        }
        this.$store.dispatch('editItem', itemEdit)
        this.$store.dispatch('loadItems')
        this.clearEdit()
      }
    },
    clearEdit () {
      this.dialog = !this.dialog
      // this.amnout = ''
      // this.description = ''
      // this.cat = ''
      // this.date = null
      // this.id = null
      // this.valid = !this.valid
      this.$refs.form.reset()
    }
  }
}
</script>

