import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedItems: [
      {
        amnt: '12',
        desc: 'beer',
        date: '2018-04-18',
        id: 'aaabc123'
      },
      {
        amnt: '4',
        desc: 'bread',
        date: '2018-04-17',
        id: 'aaabcd12'
      }
    ]
  },
  mutations: {
    createItem (state, payload) {
      state.loadedItems.push(payload)
    }
  },
  actions: {
    createItem ({commit}, payload) {
      const item = {
        amnt: payload.amnt,
        desc: payload.desc,
        date: payload.date
      }
      commit('createItem', item)
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
    }
  }
})
