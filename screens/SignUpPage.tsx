import React, { useState, useContext } from "react";
import {
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
/* context */
import { UserContext } from "../contexts/userContext";
import { User, initialUser } from "../types/user";
/* component */
import { Loading } from "../components/Loading";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useContext(UserContext);

  const signup = async (email: string, password: string) => {
    setLoading(true);
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
          setUser({
            ...initialUser,
            id: uid,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("サインインに失敗しました。");
        return null;
      });
    setLoading(false);
  };

  //login
  const login = async (email: string, password: string) => {
    setLoading(true);
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
          setUser({ id: doc.id, ...(doc.data() as User) });
        } else {
          return null;
        }
      })
      .catch((error) => {
        alert("ログインに失敗しました。");
        console.log(error);
        return null;
      });
    setLoading(false);
  };

  const loginMethod = async () => {
    const val = login(email, password);
  };

  const signUp = async () => {
    const result = signup(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder={"Email"}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.input}
        autoCapitalize="none"
      />
      <Button title={"Login"} onPress={loginMethod} />
      <Button title={"SignUp"} onPress={signUp} />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});

// export default SignUpPage;
