<template>
  <div class="todo">
    <p class="todo__title">TO DO LIST</p>
    <div class="todo__wrapper" v-if="toDoList">
      <CreateToDo/>
      <div class="todo__wrapper__title">
        <p>Find ToDo by title:</p>
        <input placeholder="Enter text" v-model="title" type="text">
      </div>
      <div class="todo__wrapper__select">
        <select v-model="filterStatus" name="status">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">No completed</option>
          <option value="favorites">Favorites</option>
        </select>
        <select v-model="filterUser" name="user">
          <option value="allUsers">All Users</option>
          <option v-for="list in findUserId" :key="list" :value="list">User ID: {{ list}}</option>
        </select>
      </div>
      <ul>
        <li v-for="item in filterInputTitle" :key="item.id">{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import CreateToDo from '../components/CreateToDo'
export default {
  components: {
    CreateToDo
  },
  data() {
    return {
      filterStatus: 'all',
      filterUser: 'allUsers',
      title: ''
    }
  },
  watch: {
    filterStatus() {
      this.$store.commit('CHANGE_STATUS', this.filterStatus);
    },
    filterUser() {
      this.$store.commit('CHANGE_USER_ID', this.filterUser);
    },
    title() {
      this.$store.commit('CHANGE_INPUT_TITLE', this.title);
    }
  },
  methods: {
    ...mapActions([
      'getToDoList'
    ]),
  },
  computed: {
    ...mapState(['toDoList']),
    ...mapGetters(['filterInputTitle']),
    findUserId() {
      let arr = [];
      this.toDoList.forEach((item) => {
        arr.push(item.userId);
      })
      return [...new Set(arr)];
    }
  },
  mounted() {
    this.getToDoList()
  }
}
</script>
<style scoped lang="scss">
.todo {
  padding-top: 70px;

  &__title {
    text-align: center;
    font-size: 20px;
    padding-bottom: 40px;
  }

  &__wrapper {
    ul {
      padding-left: 20px;
      li {
        padding-bottom: 15px;
        list-style-type: square;
      }
    }
    &__select {
      margin-bottom: 50px;
      display: flex;

      @media(max-width: 550px) {
        justify-content: center;
      }

      select {
        display: block;
        width: 25%;
        background-color: #fafafa;
        padding: 10px 5px;
        margin-right: 15px;
        border-radius: 5px;

        @media(max-width: 550px) {
          width: 43%;
        }
      }
    }
    &__title {
      display: flex;
      margin: 35px 0;
      justify-content: center;
      align-items: center;

      @media (max-width: 550px) {
        flex-direction: column;
      }
      p {
        padding-right: 20px;
      }

      input {
        width: 25%;

        @media (max-width: 550px) {
          margin-top: 15px;
          width: 90%;
        }

      }
    }
  }
}
</style>