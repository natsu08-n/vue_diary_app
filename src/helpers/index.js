import { db } from "../main";

export default {
  contentTypeRadios() {
    return [
      { label: 'デフォルト', value: 0 },
      { label: 'オプション付き', value: 1 },
    ]
  },
  firestoreFn(date, newItem) {
    db.collection("diaries")
        .add({
          date: date,
          contents: newItem,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          date = "";
          // this.getFirestoreDb();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
  }
}