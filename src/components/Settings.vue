<template>
  <div>
    <v-card>
    <v-card-title><h2>Edit categories</h2></v-card-title>
    <v-card-text>
    <v-list dense>
      <v-list-tile>
      <v-text-field
       placeholder="Add new"
       v-model="newCat"
      ></v-text-field><v-icon @click="addNewCat">add</v-icon>
      </v-list-tile>
      <v-list-tile v-for="cat in cats" :key="cat.key">{{cat}}
        <v-spacer></v-spacer>
        <v-icon>delete</v-icon>
      </v-list-tile>
    </v-list>
    </v-card-text>
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
        'Soft drinks',
        'Other'
      ],
      newCat: ''
    }
  },
  methods: {
    addNewCat () {

    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
        this.$store.dispatch('logOut')
      })
    }
  }
}
</script>

