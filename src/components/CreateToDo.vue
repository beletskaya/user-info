<template>
  <div class="create-todo">
    <p>Create new To Do</p>
    <div class="create-todo__form">
      <form @submit.prevent="addList()" class="create-todo__form__wrapper">
        <input type="number" placeholder="Enter ID" v-model="newToDo.userId" required>
        <input type="text" placeholder="Enter title" v-model="newToDo.title" required>
        <button type="submit" :class="{'load': load}">Add</button>
      </form>
    </div>

  </div>

</template>
<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      newToDo: {
        userId: null,
        title: ''
      },
      load: false
    }
  },
  methods: {
    ...mapActions(['postList']),
    addList() {
      this.load = true
      this.postList(this.newToDo).finally( () => {
        this.load = false
      })
      this.newToDo.userId = this.newToDo.title = ''
    }
  }
}
</script>
<style scoped lang="scss">
.create-todo {
  margin: 40px 0 90px;

  p {
    text-align: center;
  }
  &__form {

    &__wrapper {
      margin-top: 25px;
      display: flex;

      @media(max-width: 550px) {
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }

      input {
        width: 25%;
        margin-right: 10px;
        @media(max-width: 550px) {
          width: 90%;
          margin-right: 0;
          margin-bottom: 15px;
        }
      }

      button {
        width: 15%;
        @media(max-width: 550px) {
          width: 90%;
        }
      }
    }
  }

}
</style>