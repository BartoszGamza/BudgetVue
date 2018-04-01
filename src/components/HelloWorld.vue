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
            >
              <v-icon>add</v-icon>
            </v-btn>
  </div>
</template>

<script>

</script>