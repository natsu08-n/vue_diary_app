<template>
  <div>
    <!-- @submit.preventでsubmitのページ遷移処理をキャンセルできる -->
    <form action="" @submit.prevent="addItem">
      <div class="form__date">
        <!-- forにinputタグと同じ"date"を入れることで連動している -->
        <label for="date">
          <h2>日付を選んでください</h2>
        </label>
        <div>
          <v-date-picker :attributes="attrs" v-model="date">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="form__inputDate"
                id="date"
                v-bind:value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </v-date-picker>
        </div>
      </div>
      <div class="form__dairyContents">
        <label for="contents">
          <h2>内容</h2>
        </label>
        <div>
          <textarea
            name=""
            id="contents"
            cols="30"
            rows="10"
            v-model="newItem"
          ></textarea>
        </div>
      </div>
      <input class="form__submit" type="submit" value="追加" />
    </form>

    <ul>
      <li v-for="item in snapShot" v-bind:key="item.id">
        <p>{{ item.data().date | format }}</p>
        <p>{{ item.data().contents }}</p>
        <button @click="deleteFirestoreDb(item.id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import VCalendar from "v-calendar";
import dayjs from "dayjs";
import { db } from "../main";

Vue.use(VCalendar);

export default {
  name: "DiaryForm",
  data: function () {
    return {
      attrs: [
        {
          key: "today",
          // highlight: "red",
          dates: new Date(),
          popover: {
            label: "今日はここ！",
          },
        },
      ],
      date: null,
      newItem: "",
      inputEvents: "",
      snapShot: [],
    };
  },
  methods: {
    addItem: function () {
      let item = {
        // diaryDate: dayjs(this.date).format("YYYY-MM-DD"),
        date: this.date,
        contents: this.newItem,
      };
      // this.snapShot.push(item);
      this.saveItem();
      this.newItem = "";
    },
    saveItem: function () {
      db.collection("diaries")
        .add({
          date: this.date,
          contents: this.newItem,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.getFirestoreDb();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
    deleteFirestoreDb: function (id){
      db.collection("diaries")
        .doc(id)
        .delete({
          date: this.date,
          contents: this.newItem,
        })
        .then(() => {
          console.log("Document successfully deleted!");
          this.snapShot = this.snapShot.filter((item) => item.id !==id);
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    getFirestoreDb: function () {
      db.collection("diaries")
        .orderBy('date', 'desc') //firestoreフィールドのdateプロパティで並び替え。descは降順、ascは昇順
        .get()
        .then((querySnapshot) => {
          this.snapShot = querySnapshot.docs;
        });
    }
  },
  mounted: function () {
    // ビュー全体がレンダリングされた後にのみ実行されるコード
    this.getFirestoreDb();
  },
  filters: {
    format: function (value) {
      if (!value) return "";
      return dayjs(value.toDate()).format("YYYY MM-DD HH:mm");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
    "Hiragino Sans", Meiryo, sans-serif;
}

h2 {
  color: #4c4a4a;
  font-family: "Noto Sans JP";
  margin-bottom: 0;
}

p {
  color: #4c4a4a;
  font-family: "Noto Sans JP";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.05em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #989185;
  display: inline-block;
  margin-top: 10px;
  padding: 10px;
  width: 980px;
}

.form__inputDate,
textarea {
  border: 1px solid #4c4a4a;
  width: 220px;
  padding: 10px;
}

textarea {
  resize: none;
}

.form__submit {
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
</style>
