<template>
  <div id="app">
    <QuoteComponent/>
  </div>
</template>

<script>
import QuoteComponent from './components/QuoteComponent';

export default {
  name: 'app',
  components: {
    QuoteComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  display: flex;
  justify-content: center;
}
</style>
