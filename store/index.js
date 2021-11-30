import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'

const createStore = () => {
  return new Vuex.Store({
    state: {
      todos: []
    },
    getters: {
      getTodos: state => state.todos
    },
    mutations: {
      add(state, obj) {
        state.todos.unshift({
          id: uuidv4(),
          content: obj.content,
          state: false,
          status: '未完了'
        })
      },
      toggleState(state, obj) {
        const hoge = state.todos.find((todo) => {
          return todo.id === obj.id
        })
        hoge.state = !hoge.state
      }
    }
  })
}

export default createStore
