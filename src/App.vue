<template>
  <header class="menu">
    <nav class="container">
      <router-link to="/">Home</router-link> |
      <router-link to="/users">Users</router-link>
    </nav>
  </header>

  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .container {
    max-width: 1250px;
    margin: 0 auto;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  input {
    background-color: #fafafa;
    padding: 10px 5px;
    border-radius: 5px;
    border: 0;
  }
  button {
    padding: 10px;
    color: white;
    background-color: #519945;
    border: 0;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s linear;

    &:hover {
      background-color: #38702f;
    }

    &.load {
      position: relative;
      pointer-events: none;
      background-color: #93b48d;
      color: #93b48d;

      &::before {
        content: '';
        position: absolute;
        background-image: url("../src/assets/Loading.gif");
        background-size: contain;
        background-repeat: no-repeat;
        width: 36px;
        height: 36px;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0%);
      }
    }
  }
  .menu {
    background-color: #3f3c3cf5;

    nav {

      a {
        text-decoration-line: none;
        color: #cccccc;

        &.router-link-active {
          color: #68ab66;
        }
      }
    }
  }
}
</style>