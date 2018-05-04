import Vuex from 'vuex'
import Vue from 'vue'
import firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedItems: [],
    cats: [
      'Alcohol',
      'Grocceries',
      'Entertainmen',
      'Tobacco',
      'Restaurant',
      'Softdrinks',
      'Other'
    ],
    user: null,
    balance: 0
  },
  mutations: {
    addBalance (state, payload) {
      state.balance = parseFloat(state.balance) + parseFloat(payload)
    },
    subBalance (state, payload) {
      state.balance = parseFloat(state.balance) - parseFloat(payload)
    },
    setBalance (state, payload) {
      state.balance = parseFloat(payload)
    },
    setLoadedItems (state, payload) {
      state.loadedItems = payload
    },
    setCats (state, payload) {
      state.cats = payload
    },
    deleteItem (state, payload) {
      var idx = state.loadedItems.map(function (item) { return item.id }).indexOf(payload)
      state.loadedItems.splice(idx, 1)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    updateBalance ({commit}, payload) {
      commit('subBalance', payload)
    },
    getUser ({commit}) {
      const user = firebase.auth().currentUser
      commit('setUser', user)
    },
    loadItems ({commit, state}) {
      firebase.database().ref().child('users').child(state.user.uid).child('items').once('value')
        .then((data) => {
          const items = []
          var bal = 0
          const obj = data.val()
          for (let key in obj) {
            items.push({
              id: key,
              amnt: obj[key].amnt,
              desc: obj[key].desc,
              date: obj[key].date,
              cat: obj[key].cat
            })
            bal = parseFloat(bal) + parseFloat(obj[key].amnt)
            commit('setBalance', bal)
            commit('setLoadedItems', items)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadCats ({state, commit}) {
      firebase.database().ref().child('users').child(state.user.uid).child('cats').once('value')
        .then((data) => {
          const cats = data.val()
          commit('setCats', cats)
        })
    },
    createItem ({commit, state}, payload) {
      const item = {
        amnt: payload.amnt,
        desc: payload.desc,
        date: payload.date,
        cat: payload.cat
      }
      firebase.database().ref().child('users').child(state.user.uid).child('items').push(item)
        .then((data) => {
          commit('addBalance', item.amnt)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addCat ({commit, state}, payload) {
      firebase.database().ref().child('users').child(state.user.uid).child('cats').push(payload)
        // .then((data) => {
        //   commit('addCat', payload)
        // })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteCat ({commit, state}, payload) {
    },
    deleteItem ({commit, state}, payload) {
      const key = payload.key
      const amnt = payload.amnt
      firebase.database().ref().child('users').child(state.user.uid).child('items').child(key).remove()
        .then(() => {
          commit('deleteItem', key)
          commit('subBalance', amnt)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    editItem ({commit, state}, payload) {
      const item = {
        amnt: payload.amnt,
        desc: payload.desc,
        date: payload.date,
        cat: payload.cat
      }
      firebase.database().ref().child('users').child(state.user.uid).child('items').child(payload.id).update(item)
        .then((data) => {
          commit('addBalance', item.amnt)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signUp ({commit, state}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
        (user) => {
          commit('setUser', user)
          const def = state.cats
          for (let key in def) {
            const cat = def[key]
            console.log(cat)
            firebase.database().ref().child('users').child(state.user.uid).child('cats').push(cat)
          }
        },
        (err) => {
          alert(err.message)
        })
    },
    logIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        (user) => {
          commit('setUser', user)
        },
        (err) => {
          alert(err.message)
        })
    },
    logOut ({state}) {
      state.user = null
      state.loadedItems = []
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
    },
    cats (state) {
      return state.cats
    }
  }
})
