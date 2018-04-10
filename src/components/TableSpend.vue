<template>
  <div>
    <v-expansion-panel expand>
    <v-expansion-panel-content v-for="(item,i) in 5" :key="i" :value="item === 2">
      <div slot="header">Item</div>
      <v-card>
        <v-card-text class="grey lighten-3">Item Details</v-card-text>
        <v-card-actions>
          <v-btn flat color="green">Edit</v-btn>
          <v-btn flat color="red">Delete</v-btn>
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
        label="Email"
        ></v-text-field>
        <v-text-field
        label="Password"
        type="password"
     ></v-text-field>
   </v-form>
    <v-card-actions>
      <v-btn color="primary">Save</v-btn>
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
      dialog: false
    }
  }
}
</script>

