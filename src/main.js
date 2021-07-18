import Vue from 'vue'
import firebase from 'firebase';
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDeRev794IgesWbl0uAH77Bs4ZatA5Zfas",
  authDomain: "vue-diary-app-c7999.firebaseapp.com",
  projectId: "vue-diary-app-c7999",
  storageBucket: "vue-diary-app-c7999.appspot.com",
  messagingSenderId: "1082200385567",
  appId: "1:1082200385567:web:1fe23c1f38d26b79478d2a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
