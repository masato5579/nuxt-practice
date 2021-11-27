<template>
  <section class="container">
    <div class="wrap">
      <div class="taskAdd">
        <input
          id="input"
          v-model="content"
          type="text"
          name="input"
          placeholder="タスクを入力してください"
        />
        <button @click="insert">
          追加
        </button>
      </div>
      <div class="filter">
        <div v-for="(btn, index) in buttons" :key="index" class="buttonWrap">
          <button :class="{'filterActiveBgColor' : btn.colorFlag}" @click="getfilter( index )">{{ btn.value }}</button>
        </div>
      </div>
      <div v-for="(todo,index) in getTodos" :key="index" class="task">
        <div class="taskWrap">
          <p class="taskContent" :class="{'completeContent' : todo.state }">
            {{ todo.content }}
          </p>
          <button :class="{'completeButton' : todo.state }" @click="changeState({ todo, index })">
            完了
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
      button: '',
      buttons: [
        { value: '全て', colorFlag: true },
        { value: '完了', colorFlag: false },
        { value: '未完了', colorFlag: false }
      ]
    }
  },
  computed: {
    getTodos() {
      const button = this.button
      const allTodos = this.$store.getters.getTodos
      const completeTodos = allTodos.filter(todo => (todo.state === true))
      const notCompleteTodos = allTodos.filter(todo => (todo.state === false))
      if (button === '完了') {
        return completeTodos
      } else if (button === '未完了') {
        return notCompleteTodos
      } else {
        return allTodos
      }
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

      const changeButtonsColorFlag = this.buttons.map((button, i) => {
        return {
          ...button,
          colorFlag: index === i
        }
      })

      this.buttons = changeButtonsColorFlag
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

.wrap {
  width:50%;
  margin:0 auto;
}

/* input */

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

/* filter */

.filter {
  margin-bottom:10px;
  display: flex;
}

.filter button {
  border-radius: 10px 10px 0 0;
  width:100px;
  height:30px;
}

/* task */

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

/* task toggle style */

.completeContent {
  text-decoration: line-through;
}

.completeButton {
  background-color: #707070;
}

/* filter avtive style  */

.filterActiveBgColor {
  background: #fff;
}
</style>
