<template>
  <div class="home" id="calendar">
    <!-- <HelloWorld msg="ログイン後のページです"/> -->
    <header>
      <nav>
        <ul>
          <li><button @click="logout">ログアウト</button></li>
        </ul>
      </nav>
    </header>
    <DiaryForm />
  </div>
</template>

<script>
import firebase from "firebase";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import DiaryForm from "@/components/DiaryForm.vue";

export default {
  name: "home",
  components: {
    DiaryForm,
    // ,HelloWorld  ここは2つ指定できないのか？？
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
  margin: 0 0 0 auto;
  width: 200px;
}

button {
  color: #252a36;
  background: #FFF;
  border: 1px solid #252a36;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.2;
  padding: 10px;
  width: 150px;
}
</style>
