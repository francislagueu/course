import firebase from "firebase/compat";
import firestore = firebase.firestore;

export interface Job {
  title: string;
  salary: number;
  created: firestore.FieldValue;
  updated?: firestore.FieldValue;
}
