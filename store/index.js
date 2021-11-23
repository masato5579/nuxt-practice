import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      todos: [
        { content: 'test完了', state: '完了' },
        { content: 'test未完了', state: '未完了' }
      ]
    },
    getters: {
      getTodos: state => state.todos
    },
    mutations: {
      insert(state, obj) {
        state.todos.unshift({
          content: obj.content,
          state: '未完了'
        })
      }
    }
  })
}

export default createStore
