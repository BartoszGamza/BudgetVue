<template>
  <v-card flat>
    <v-toolbar dark color="primary" flat extended>
      <v-toolbar-title>Budget</v-toolbar-title>
    </v-toolbar>
    <v-layout row pb-2>
      <v-flex xs8 offset-xs2>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text style="height: 200px;">
            <v-form>
     <v-text-field
       label="Email"
       v-model="email"
     ></v-text-field>
     <v-text-field
       label="Password"
       v-model="password"
       type="password"
     ></v-text-field>
   </v-form>
          </v-card-text>
          <v-card-actions>
         <v-btn color="primary"  @click="login">Login</v-btn>
         <v-btn to="/signup">Register</v-btn>
       </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('main')
        },
        (err) => {
          alert(err.message)
        })
    }
  }
}
</script>
