<template>
  <div>
    <!-- @submit.preventでsubmitのページ遷移処理をキャンセルできる -->
    <form action="" @submit.prevent="addItem">
      <div class="form__date">
        <!-- forにinputタグと同じ"date"を入れることで連動している -->
        <label for="date">日付を選んでください</label>
        <div>
          <v-date-picker :attributes="attrs" v-model="date">
            <template v-slot="{ inputValue, inputEvents }">
              <input id="date" v-bind:value="inputValue" v-on="inputEvents" />
            </template>
          </v-date-picker>
        </div>
      </div>
      <div class="form__dairyContents">
        <label for="contents">内容</label>
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
      <input type="submit" value="add" />
    </form>
    <p>memo:下にどんどん日記の内容が追加されていくようにしたい</p>

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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
