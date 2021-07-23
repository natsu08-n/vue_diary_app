<template>
  <div class="home">
    <HelloWorld msg="ログイン後のページです"/>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
import firebase from 'firebase'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
