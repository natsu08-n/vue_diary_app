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
              <input class="form__inputDate" id="date" v-bind:value="inputValue" v-on="inputEvents" />
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
      <li v-for="diary in diaries" v-bind:key="diary">
        <p>{{ diary.diaryDate }}</p>
        <p>{{ diary.diaryContents }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import VCalendar from 'v-calendar'
import dayjs from 'dayjs'

Vue.use(VCalendar)

export default {
  name: 'DiaryForm',
  data: function () {
    return {
      attrs: [
        {
          key: 'today',
          // highlight: "red",
          dates: new Date(),
          popover: {
            label: '今日はここ！'
          }
        }
      ],
      date: null,
      newItem: '',
      inputEvents: '',
      diaries: []
    }
  },
  methods: {
    addItem: function () {
      let item = {
        diaryDate: dayjs(this.date).format('YYYY-MM-DD'),
        diaryContents: this.newItem
      }
      this.diaries.push(item)
      this.newItem = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body {
  font-family: "Helvetica Neue",Arial,"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif;
}

h2 {
  color: #4c4a4a;
  font-family: 'Noto Sans JP';
  margin-bottom: 0;
}

p {
  color: #4c4a4a;
  font-family: 'Noto Sans JP';
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
  border: 1px solid #4c4a4a;
  display: inline-block;
  margin-top: 10px;
  padding: 10px;
  width: 980px;
}

.form__inputDate,textarea {
  border: 1px solid #252a36;
  width: 220px;
  padding: 10px;
}

textarea {
  resize: none;
}

.form__submit {
  color: #FFF;
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
