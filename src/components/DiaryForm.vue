<template>
  <div>
    <!-- 後でv-date-pickerタグに　:masks="masks"　をつける -->
    <v-date-picker
      :attributes="searchAttrs"
      v-model="searchWord"
      :masks="masks"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <input
          class="form__inputDate"
          v-bind:value="inputValue"
          v-on="inputEvents"
        />
      </template>
    </v-date-picker>
    <button @click="searchFirestoreDb">検索</button>

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
        <button class="card__deleteBtn" @click="deleteFirestoreDb(item.id)">
          削除
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import VCalendar from "v-calendar";
import dayjs from "dayjs";
import { db } from "../main";
import firebase from "firebase";
import helpers from "../helpers/index.js";

Vue.use(VCalendar);

export default {
  name: "DiaryForm",
  data: function () {
    return {
      searchAttrs: [
        {
          key: "today",
          // highlight: "red",
          dates: new Date(),
          popover: {
            label: "aaaaa",
          },
        },
      ],
      masks: {
        input: "YYYY-MM-DD",
      },
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
      searchdate: null,
      date: null,
      newItem: "",
      inputEvents: "",
      snapShot: [],
      searchWord: "",
    };
  },
  methods: {
    getFirestoreDb: async function () {
      this.snapShot = await helpers.getLimitedDiaryDb();
    },
    addItem: async function () {
      let item = {
        // diaryDate: dayjs(this.date).format("YYYY-MM-DD"),
        date: this.date,
        contents: this.newItem,
      };
      await this.saveItem();
      this.newItem = "";
      this.date = "";
      this.getFirestoreDb();
    },
    saveItem: async function () {
      await helpers.addDiaryDb(this.date, this.newItem).then(() => {
        helpers.getLimitedDiaryDb();
      });
    },
    deleteFirestoreDb: async function (id) {
      await helpers.deleteDiaryDb(this.date, this.newItem, this.snapShot, id);
      this.getFirestoreDb();
    },
    searchFirestoreDb: async function () {
      this.snapShot = await helpers.searchSpecificDateDb(this.searchWord);
    },
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
  max-width: 980px;
  margin: 0 auto;
}

li {
  border: 1px solid #989185;
  display: inline-block;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
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

.form__submit,
.card__deleteBtn {
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

.form__submit:hover,
.card__deleteBtn:hover {
  cursor: pointer;
  opacity: 0.5;
}

.card__deleteBtn {
  background-color: #eee;
  color: #4c4a4a;
  font-size: 14px;
  width: 100px;
}
</style>
