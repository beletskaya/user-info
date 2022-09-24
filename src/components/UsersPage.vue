<template>
  <div class="user">
    <div class="user__info container" v-if="info">
     <div v-for="item in info" :key="item.id">
       <h2>{{ item.name }}</h2>
       <p>Username: {{ item.username }}</p>
       <p>Website: {{ item.website }}</p>
       <p>Email: {{ item.email }}</p>
       <p>Phone: {{ item.phone }}</p>
       <p>Address: {{ item.address.street }}, {{ item.address.suite }}, {{ item.address.city }}</p>
     </div>
    <ToDoList/>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import ToDoList from '../components/ToDoList'
export default {
  components: {
    ToDoList
  },
  data() {
    return {
      //info: null
    }
  },
  computed: {
    ...mapState(["loginName", "info"]),
  },
  methods: {
    ...mapActions([
      'getUsers'
    ])
  },
  mounted() {
    this.getUsers()
  }
}
</script>
<style scoped lang="scss">
.user {
  background-color: #5f5f5f;

  &__info {
    color: #e8e8e8;

    h2 {
      text-align: center;
      font-size: 25px;
      padding-bottom: 70px;
    }

    p {
      padding-bottom: 15px;
    }
  }
}
</style>