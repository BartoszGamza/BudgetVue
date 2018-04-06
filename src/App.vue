<template>
  <v-app id="app">
   <router-view></router-view>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  data: () => ({
    drawer: null
  }),
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>