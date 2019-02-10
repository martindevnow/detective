<template>
  <div id="app">
    <router-view/>
    <user-stats></user-stats>
  </div>
</template>

<script>
import UserStats from './components/UserStats.vue'
export default {
  components: {
    UserStats,
  }
}
</script>

<style>
html {
  background-color: black;
}

* {
  color: #AAAAAA;
}

input, button, submit { 
  background-color: white;
  color: black;
  border: none;
  font-size: 18px;

}

button {
  text-transform: uppercase;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  padding: 0;
  margin: 0;
}
</style>
