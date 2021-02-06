import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import CreateHistoryScreen from "../screens/CreateHistoryScreen";
import SettingScreen from "../screens/SettingScreen";

// import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import {
  BottomTabParamList,
  TabHomeParamList,
  TabCreateHistoryParamList,
  TabHistoryParamList,
  TabSettingPalamList,
} from "../types/navigationtypes";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="TabHome"
        component={TabHomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabCreateHisotry"
        component={TabCreateHistoryNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-add-circle-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabHistory"
        component={TabHistoryNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabSetting"
        component={TabSettingNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-settings-sharp" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
// const TabOneStack = createStackNavigator<TabOneParamList>();

// function TabOneNavigator() {
//   return (
//     <TabOneStack.Navigator>
//       <TabOneStack.Screen
//         name="TabOneScreen"
//         component={TabOneScreen}
//         options={{ headerTitle: "Tab One Title" }}
//       />
//     </TabOneStack.Navigator>
//   );
// }

// const TabTwoStack = createStackNavigator<TabTwoParamList>();

// function TabTwoNavigator() {
//   return (
//     <TabTwoStack.Navigator>
//       <TabTwoStack.Screen
//         name="TabTwoScreen"
//         component={TabTwoScreen}
//         options={{ headerTitle: "Tab Two Title" }}
//       />
//     </TabTwoStack.Navigator>
//   );
// }

const TabHomeStack = createStackNavigator<TabHomeParamList>();
function TabHomeNavigator() {
  return (
    <TabHomeStack.Navigator>
      <TabHomeStack.Screen name="TabHomeScreen" component={HomeScreen} />
    </TabHomeStack.Navigator>
  );
}

const TabCreateHistoryStack = createStackNavigator<TabCreateHistoryParamList>();
function TabCreateHistoryNavigator() {
  return (
    <TabCreateHistoryStack.Navigator>
      <TabCreateHistoryStack.Screen
        name="TabCreateHistoryScreen"
        component={CreateHistoryScreen}
      />
    </TabCreateHistoryStack.Navigator>
  );
}

const TabHisotryStack = createStackNavigator<TabHistoryParamList>();
function TabHistoryNavigator() {
  return (
    <TabHisotryStack.Navigator>
      <TabHisotryStack.Screen
        name="TabHistoryScreen"
        component={HistoryScreen}
      />
    </TabHisotryStack.Navigator>
  );
}

const TabSettingStack = createStackNavigator<TabSettingPalamList>();
function TabSettingNavigator() {
  return (
    <TabSettingStack.Navigator>
      <TabSettingStack.Screen
        name="TabSettingScreen"
        component={SettingScreen}
      />
    </TabSettingStack.Navigator>
  );
}
