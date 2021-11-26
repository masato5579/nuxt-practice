<template>
  <section class="container">
    <div class="todoWrap">
      <div class="taskAdd">
        <input
          id="input"
          v-model="content"
          type="text"
          name="input"
          placeholder="タスクを入力してください"
        />
        <button id="add" @click="insert">
          追加
        </button>
      </div>
      <div class="filter">
        <div v-for="(button, index) in buttons" :key="index" class="buttonWrap">
          <button @click="getfilter( index )" v-bind:class="{'cursorBgColor' : button.colorFlag}">{{ button.value }}</button>
        </div>
      </div>
      <div v-for="(todo,index) in getTodos" :key="index" class="task">
        <div class="taskWrap">
          <p class="taskContent" v-bind:class="{'completeContent' : todo.state }">
            {{ todo.content }}
          </p>
          <button v-bind:class="{'completeButton' : todo.state }" @click="changeState({ todo, index })">
            {{todo.status}}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      content: '',
      buttons: [
        { value: '全て', colorFlag: true },
        { value: '完了', colorFlag: false },
        { value: '未完了', colorFlag: false }
      ],
      button: ''
    }
  },
  methods: {
    insert() {
      if (this.content !== '') {
        this.$store.commit('insert', { content: this.content })
        this.content = ''
      } else {
        alert('タスクが入力されていません。')
      }
    },
    changeState(todo) {
      this.$store.commit('changeState', todo)
    },
    getfilter(index) {
      this.button = this.buttons[index].value

      const newButtons = this.buttons.map((button, i) => {
        return {
          ...button,
          colorFlag: index === i
        }
      })

      this.buttons = newButtons
    }
  },
  computed: {
    getTodos() {
      const button = this.button
      const todos = this.$store.getters.getTodos
      const complete = todos.filter(todo => (todo.state === true))
      const notComplete = todos.filter(todo => (todo.state === false))
      if (button === '完了') {
        return complete
      } else if (button === '未完了') {
        return notComplete
      } else {
        return todos
      }
    }
  }
}

</script>

<style>
.container {
  height: 100vh;
  background-color: #f3f3f3;
  padding:50px 0;
}

.todoWrap {
  width:50%;
  margin:0 auto;
}

.taskAdd {
  display:flex;
  justify-content: space-between;
  height:35px;
  margin-bottom:35px;
}

.taskAdd input {
  width:80%;
}

.taskAdd button {
  width:10%;
}

.filter {
  margin-bottom:10px;
  display: flex;
}

.filter button {
  border-radius: 10px 10px 0 0;
  width:100px;
  height:30px;
}

.task {
  border-bottom:1px solid #000;
  padding:30px 0;
}

.taskWrap {
  display:flex;
  justify-content: space-between;
  align-items: center;
  width:80%;
}

.task .taskContent {
  width:82%;
}

.task button {
  width:15%;
  height: 35px;
  border-radius: 20px;
}

.completeContent {
  text-decoration: line-through;
}

.completeButton {
  background-color: #707070;
}

.cursorBgColor {
  background: #fff;
}
</style>
