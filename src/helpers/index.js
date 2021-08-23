import { db } from "../main";

// async awaitに書き換え

export default {
  firestoreFn(date, newItem, snapShot) {
    db.collection("diaries")
        .add({
          date: date,
          contents: newItem,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          date = "";
          // this.getFirestoreDb();
          // getDb(snapShot) //エラーになる
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
  },
  deleteDb(date, newItem, snapShot, id) {
    db.collection("diaries")
        .doc(id)
        .delete({
          date: date,
          contents: newItem,
        })
        .then(() => {
          console.log("Document successfully deleted!");
          snapShot = snapShot.filter((item) => item.id !== id);
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
  },
  //名前をもっと仕事内容を表すものに変更
  async getDb() {
    const response = await db.collection("diaries") //非同期
    .orderBy("date", "desc")
    .limit(15) // firestoreフィールドのdateプロパティで並び替え。descは降順、ascは昇順。とりあえず15個のデータを表示。
    .get()
    .then((querySnapshot) => { //resolveした時
      return querySnapshot.docs;
    });
    return response
  },
  searchDb(snapShot, searchWord, filterWord) {
    db.collection("diaries")
        .orderBy("date", "desc")
        .endAt(filterWord) //startAt〜endAtで期間が指定できる
        .get()
        .then((querySnapshot) => {
          snapShot = querySnapshot.docs;
          searchWord = "";
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
  }
}