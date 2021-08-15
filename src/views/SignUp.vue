<template>
  <div class="sign-up">
    <h3>Let's create a new account !</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">登録</button>
    <span>or go back to <router-link to="/login">login.</router-link></span>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'signUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('home')
        },
        function (err) {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
.sign-up {
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
  opacity: 1;
  padding: 10px;
  width: 150px;
}
button:hover {
  cursor: pointer;
  opacity: .5;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}

</style>
