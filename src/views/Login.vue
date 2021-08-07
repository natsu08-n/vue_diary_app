<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login">ログイン</button>
    <p>You don't have an account? You can <router-link to="/sign-up">create one</router-link></p>
  </div>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      // this.$router.replace('home')
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          // console.log(user);
          this.$router.replace('home')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  cursor: pointer;
  color: #fff;
  background: #252a36;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.2;
  margin-top: 20px;
  padding: 10px;
  width: 150px;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
