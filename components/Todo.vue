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
        <button>
          全て
        </button>
        <button>
          完了
        </button>
        <button>
          未完了
        </button>
      </div>
      <div v-for="(todo,index) in getTodos" :key="index" class="task">
        <div class="taskWrap">
          <p class="taskContent" v-bind:class="{'completeContent' : todo.state }">
            {{ todo.content }}
          </p>
          <button v-bind:class="{'completeButton' : todo.state }" @click="changeState({ todo, index })">
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
      content: ''
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
    }
  },
  computed: {
    getTodos() {
      return this.$store.getters.getTodos
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
}

.filter button {
  width:100px;
  border-radius: 10px 10px 0 0;
  margin-right:-7px;
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
</style>
