import firebase from 'firebase'
import Vue from 'vue'

import App from './App.vue'
import router from './router'

// const firebase = require("firebase");
// Required for side-effects
require('firebase/firestore')

Vue.config.productionTip = false

let app = ''

// Your web app's Firebase configuration
firebase.initializeApp({
  apiKey: 'AIzaSyDeRev794IgesWbl0uAH77Bs4ZatA5Zfas',
  authDomain: 'vue-diary-app-c7999.firebaseapp.com',
  projectId: 'vue-diary-app-c7999',
  storageBucket: 'vue-diary-app-c7999.appspot.com',
  messagingSenderId: '1082200385567',
  appId: '1:1082200385567:web:1fe23c1f38d26b79478d2a'
})

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})

// ==============================
// firestoreの記述
export const db = firebase.firestore()

// Add a second document with a generated ID.
