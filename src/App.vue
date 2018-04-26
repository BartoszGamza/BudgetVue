<template>
  <v-app id="app">
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
            <v-list-tile-title>{{user}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        
        <v-list-tile @click="main">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="stats">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Stats</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>       
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app v-if="IsUser">
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
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  data: () => ({
    drawer: false
  }),
  computed: {
    IsUser () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    user () {
      if (this.IsUser) {
        return this.$store.getters.user.email
      }
    },
    balance () {
      if (this.IsUser) {
        return this.$store.getters.balance
      }
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
        this.$store.dispatch('logOut')
      })
    },
    stats () {
      this.$router.replace('stats')
    },
    main () {
      this.$router.replace('main')
    }
  }
}
</script>