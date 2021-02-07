import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserContext } from "../contexts/userContext";

const SettingScreen = () => {
  const { setUser } = useContext(UserContext);
  const reload = () => {
    setUser(null);
  };
  return (
    <View>
      <Text>settingpage</Text>
      <Button title="戻る" onPress={reload}></Button>
    </View>
  );
};

export default SettingScreen;
