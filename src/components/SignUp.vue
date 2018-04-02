<template>
  <div class="login">
    <h3>Create an account</h3>
    <input type="text" v-model="email" placeholder="email"><br>
    <input type="password" v-model="password" placeholder="password"><br>
    <button @click="signUp">Create</button>
    <p>You already have one? <router-link to="/login">Login</router-link></p>
  </div>
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
          alert('account created!')
        },
        function (err) {
          alert(err.message)
        })
    }
  }
}
</script>
