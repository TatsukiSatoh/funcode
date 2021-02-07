import * as firebase from "firebase";
import "firebase/firestore";

export type User = {
  id?: string;
  name: string;
};

export const initialUser: User = {
  name: "User",
};
