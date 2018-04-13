<template>
  <div>
    <v-expansion-panel expand>
    <v-expansion-panel-content v-for="item in items" :key="item.key">
      <div slot="header">{{item.amnt}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">{{item.desc}}</v-card-text>
        <v-card-actions>
          <v-btn flat color="green">Edit</v-btn>
          <v-btn flat color="red" @click="deleteItem(item.key)">Delete</v-btn>
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
              @click="dialog = true"
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
   </v-form>
    <v-card-actions>
      <v-btn color="primary" @click="saveItem">Save</v-btn>
      <v-btn @click.stop="dialog = !dialog">Cancel</v-btn> 
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
      items: [],
      amnout: '',
      description: ''
    }
  },
  methods: {
    saveItem () {
      this.items.push({amnt: this.amnout, desc: this.description})
      this.dialog = !this.dialog
    },
    deleteItem (key) {
      // this.items.splice(id, 1)
      console.log(key)
    },
    editItem () {}
  }
}
</script>

