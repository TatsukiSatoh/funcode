import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import Constants from "expo-constants";
import { User, initialUser } from "../types/user";
if (!firebase.apps.length) {
  //   firebase.app.jsonに保存したfirebase情報を取得する
  firebase.initializeApp(Constants.manifest.extra.firebase);
}

//SignUp
export const signup = async (email: string, password: string) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (user) => {
      if (user && user.user) {
        const { uid } = user.user;
        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set(initialUser);
        return {
          ...initialUser,
          id: uid,
        } as User;
      }
    })
    .catch((error) => {
      alert("サインインに失敗しました。");
      return null;
    });
};

//login
export const login = async (email: string, password: string) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (response) => {
      if (response && response.user) {
        const doc = await firebase
          .firestore()
          .collection("users")
          .doc(response.user.uid)
          .get();
        return { id: doc.id, ...doc.data() } as User;
      } else {
        return null;
      }
    })
    .catch((error) => {
      alert("ログインに失敗しました。");
      console.log(error);
      return null;
    });
};
