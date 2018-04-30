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
        <v-icon @click="delCat(cat)">delete</v-icon>
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
      newCat: ''
    }
  },
  created () {
    this.$store.dispatch('loadCats')
  },
  computed: {
    cats () {
      return this.$store.getters.cats
    }
  },
  methods: {
    addNewCat () {
      const payload = this.newCat
      this.$store.dispatch('addCat', payload)
      this.newCat = ''
      this.$store.dispatch('loadCats')
    },
    delCat (item) {
      const idx = this.cats.indexOf(item)
      console.log(idx)
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

