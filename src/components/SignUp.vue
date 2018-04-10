<template>
  <v-card flat>
    <v-toolbar dark color="primary" flat extended>
      <v-toolbar-title>Budget</v-toolbar-title>
    </v-toolbar>
    <v-layout row pb-2>
      <v-flex xs8 offset-xs2>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">Register new account</v-toolbar-title>
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
         <v-btn color="primary"  @click="signUp">Register</v-btn>
         <router-link to="/login"><v-btn>Login</v-btn></router-link>
       </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          this.$router.replace('main')
        },
        function (err) {
          alert(err.message)
        })
    }
  }
}
</script>
