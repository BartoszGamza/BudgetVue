<template>
  <div>
    <v-card>
    <v-card-title><h2>Edit categories</h2></v-card-title>
    <v-card-text>
    <v-expansion-panel expand>
    <v-expansion-panel-content v-for="cat in cats" :key="cat.key">
      <div slot="header">{{cat}}</div>
      <v-card>
        <v-card-actions>
          <v-btn flat color="green">Edit</v-btn>
          <v-btn flat color="red">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
    </v-expansion-panel>
    </v-card-text>
    <v-card-actions>
      <v-btn>Add new</v-btn>
    </v-card-actions>
    </v-card>
    <br>
    <v-card>
      <v-card-title>
        <h2>User</h2>
      </v-card-title>
      <v-card-actions>
        <v-btn @click="logout">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      cats: ['Alcohol',
        'Grocceries',
        'Entertainment',
        'Tobacco',
        'Restaurant',
        'Soft drinks'
      ]
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
        this.$store.dispatch('logOut')
      })
    }
  }
}
</script>

