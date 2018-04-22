import Vuex from 'vuex'
import Vue from 'vue'
import firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedItems: [],
    user: null,
    balance: 0
  },
  mutations: {
    setLoadedItems (state, payload) {
      state.loadedItems = payload
    },
    // createItem (state, payload) {
    //   state.loadedItems.push(payload)
    // },
    deleteItem (state, payload) {
      var idx = state.loadedItems.map(function (item) { return item.id }).indexOf(payload)
      state.loadedItems.splice(idx, 1)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    loadItems ({commit}) {
      const uid = firebase.auth().currentUser.uid
      firebase.database().ref().child('users').child(uid).child('items').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              amnt: obj[key].amnt,
              desc: obj[key].desc,
              date: obj[key].date,
              cat: obj[key].cat
            })
            commit('setLoadedItems', items)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createItem ({commit}, payload) {
      const item = {
        amnt: payload.amnt,
        desc: payload.desc,
        date: payload.date,
        cat: payload.cat
      }
      const uid = firebase.auth().currentUser.uid
      firebase.database().ref().child('users').child(uid).child('items').push(item)
        // .then((data) => {
        //   commit('createItem', item)
        // })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteItem ({commit}, payload) {
      const uid = firebase.auth().currentUser.uid
      const key = payload
      firebase.database().ref().child('users').child(uid).child('items').child(key).remove()
        .then(() => {
          commit('deleteItem', key)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    editItem ({commit}, payload) {
      const item = {
        amnt: payload.amnt,
        desc: payload.desc,
        date: payload.date,
        cat: payload.cat
      }
      const uid = firebase.auth().currentUser.uid
      firebase.database().ref().child('users').child(uid).child('items').child(payload.id).update(item)
        .catch((error) => {
          console.log(error)
        })
    },
    signUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
        function (user) {
          const newUser = {
            id: user.uid,
            email: user.email,
            items: []
          }
          commit('setUser', newUser)
        },
        function (err) {
          alert(err.message)
        })
    },
    logIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        (user) => {
          const newUser = {
            id: user.uid,
            email: user.email
          }
          commit('setUser', newUser)
        },
        (err) => {
          alert(err.message)
        })
    }
  },
  getters: {
    loadedItems (state) {
      return state.loadedItems.sort((itemA, itemB) => {
        return itemA.date < itemB.date
      })
    },
    loadedItem (state) {
      return (itemId) => {
        return state.loadedItems.find((item) => {
          return item.id === itemId
        })
      }
    },
    user (state) {
      return state.user
    },
    balance (state) {
      return state.balance
    }
  }
})
