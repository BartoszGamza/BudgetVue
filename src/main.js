// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import firebase from 'firebase'
import { store } from './store/index'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

let app
var config = {
  apiKey: 'AIzaSyAYd4rXDztFs7dSqV_4tlPg4VfbaDz0CHQ',
  authDomain: 'vuedget.firebaseapp.com',
  databaseURL: 'https://vuedget.firebaseio.com',
  projectId: 'vuedget',
  storageBucket: 'vuedget.appspot.com',
  messagingSenderId: '770237910695'
}
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
      created () {
      }
    })
  }
})
