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
        <button @click="add">
          追加
        </button>
      </div>
      <div class="filter">
        <div v-for="(btn, index) in buttons" :key="index" class="buttonWrap">
          <button :class="{'filterActiveBgColor' : btn.active}" @click="updateFilter( index )">{{ btn.value }}</button>
        </div>
      </div>
      <div v-for="(todo,index) in getTodos" :key="index" class="task">
        <div class="taskWrap">
          <p class="taskContent" :class="{'completeContent' : todo.state }">
            {{ todo.content }}
          </p>
          <button :class="{'completeButton' : todo.state }" @click="toggleState(todo)">
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
        { value: '全て', active: true },
        { value: '完了', active: false },
        { value: '未完了', active: false }
      ]
    }
  },
  computed: {
    getTodos() {
      const button = this.button
      const allTodos = this.$store.getters.getTodos
      if (button === '完了') { return allTodos.filter(todo => (todo.state === true)) }
      if (button === '未完了') { return allTodos.filter(todo => (todo.state === false)) }
      return allTodos
    }
  },
  methods: {
    add() {
      if (this.content !== '') {
        this.$store.commit('add', { content: this.content })
        this.content = ''
      } else {
        alert('タスクが入力されていません。')
      }
    },
    toggleState(todo) {
      this.$store.commit('toggleState', todo)
    },
    updateFilter(index) {
      this.button = this.buttons[index].value

      const newButtons = this.buttons.map((button, i) => {
        return {
          ...button,
          active: index === i
        }
      })

      this.buttons = newButtons
    }
  }
}

</script>

<style>

.wrap {
  width: 800px;
  margin:100px auto 0;
}

.taskAdd {
  display: flex;
  justify-content: space-between;
  margin-bottom:50px;
}

.taskAdd input {
  width: 700px;
  padding:12px 0;
  padding-left: 20px;
  font-size: 20px;
  border-radius: 7px;
  color: #000;
  border: 1px solid #707070;
  background-color: #fff;
}

.taskAdd button {
  display: block;
  width: 70px;
  border-radius: 7px;
  padding: 12px 18px;
  color: #000;
  border: 1px solid #707070;
  background-color: #fff;
  cursor: pointer;
}

.filter {
  width:800px;
  padding:66px auto 0px;
  display: flex;
  justify-content: left;
  margin:0 auto;
  margin-bottom:35px;
}

.buttonWrap button {
  color: #000;
  width: 140px;
  height: 35px;
  border-radius: 20px 20px 0 0;
  text-align: center;
  cursor: pointer;
}

.task {
  border-bottom: 1px solid #000;
  padding: 0 110px 35px 0;
  display: flex;
  align-items: center;
  color: #000;
  margin-bottom: 35px;
}

.taskWrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
}

.task button {
  width: 75px;
  height: 40px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
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
   background-color: #fff;
}

</style>
