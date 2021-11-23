<template>
  <section class="container">
    <div class="todoWrap">
      <div class="taskAdd">
        <input
          id="input"
          type="text"
          name="input"
          placeholder="タスクを入力してください"
        />
        <button id="add">
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
      <div class="task">
        <div class="taskWrap">
          <p class="taskContent">
            テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト
          </p>
          <button>
            完了
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

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
}

.taskWrap {
  display:flex;
  justify-content: space-between;
  align-items: center;
  width:80%;
  padding-bottom:30px;
}

.task .taskContent {
  width:82%;
}

.task button {
  width:15%;
  height: 35px;
  border-radius: 20px;
}
</style>
