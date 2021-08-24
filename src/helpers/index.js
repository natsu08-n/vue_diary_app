import { db } from "../main";
import firebase from "firebase";



// async awaitに書き換え

export default {
  async firestoreFn(date, newItem) {
    const addResponse = await db.collection("diaries")
      .add({
        date: date,
        contents: newItem,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        date = "";
        // this.getFirestoreDb();
        return getDb()
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    return addResponse
  },
  async deleteDb(date, newItem, snapShot, id) {
    const deleteResponse = await db.collection("diaries")
      .doc(id)
      .delete({
        date: date,
        contents: newItem,
      })
      .then(() => {
        console.log("Document successfully deleted!");
        return snapShot.filter((item) => item.id !== id);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    return deleteResponse
  },
  //名前をもっと仕事内容を表すものに変更
  async getDb() {
    const response = await db.collection("diaries") //firestoreのデータを読み取り完了するまで待つ
      .orderBy("date", "desc")
      .limit(15) // firestoreフィールドのdateプロパティで並び替え。descは降順、ascは昇順。とりあえず15個のデータを表示。
      .get()
      .then((querySnapshot) => { //resolveした時
        return querySnapshot.docs;
      });
    return response
  },
  async searchDb(searchWord) {
    let filterWord = firebase.firestore.Timestamp.fromDate(
      new Date(searchWord)
    );
    console.log(filterWord);
    const searchResponse = await db.collection("diaries")
      .orderBy("date", "desc")
      .endAt(filterWord) //startAt〜endAtで期間が指定できる
      .get()
      .then((querySnapshot) => {
        searchWord = "";
        return querySnapshot.docs;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return searchResponse
  }
}