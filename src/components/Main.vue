<template>
  <div>
     <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>user</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Stats</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action @click="logout">
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>       
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Balance</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{balance}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-lg>
        <v-layout
          justify-center
          align-center
          row wrap
        >
          <v-flex xs12 sm12 md6>
            <table-spend></table-spend>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import TableSpend from '@/components/TableSpend'
import firebase from 'firebase'
export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    user () {
      return this.$store.getters.user
    },
    balance () {
      return this.$store.getters.balance
    }
  },
  created () {
    this.$store.dispatch('getUser')
    console.log('gotuser')
    console.log('fetchinglist')
    this.$store.dispatch('loadItems')
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    addAccount () {
    }
  },
  components: {
    TableSpend
  }
}
</script>