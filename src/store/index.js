import Vuex from 'vuex'
import Vue from 'vue'
import firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedItems: [
      // {
      //   amnt: '12',
      //   desc: 'beer',
      //   date: '2018-04-18',
      //   id: 'aaabc123'
      // },
      // {
      //   amnt: '4',
      //   desc: 'bread',
      //   date: '2018-04-17',
      //   id: 'aaabcd12'
      // }
    ],
    user: null
  },
  mutations: {
    setLoadedItems (state, payload) {
      state.loadedItems = payload
    },
    createItem (state, payload) {
      state.loadedItems.push(payload)
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
              date: obj[key].date
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
        date: payload.date
      }
      const uid = firebase.auth().currentUser.uid
      firebase.database().ref().child('users').child(uid).child('items').push(item)
        .then((data) => {
          commit('createItem', item)
        })
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
    }
  }
})