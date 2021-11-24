import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      todos: []
    },
    getters: {
      getTodos: state => state.todos
    },
    mutations: {
      insert(state, obj) {
        state.todos.unshift({
          content: obj.content,
          state: false,
          status: '未完了'
        })
      },
      changeState(state, obj) {
        obj.todo.state = !state.todos[obj.index].state
      }
    }
  })
}

export default createStore
