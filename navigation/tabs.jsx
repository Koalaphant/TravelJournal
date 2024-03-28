import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import JournalEntryScreen from "../screens/JournalEntryScreen";
import UserScreen from "../screens/UserScreen";
import JounralEntriesScreen from "../screens/JournalEntriesScreen";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 50,
          backgroundColor: "#e32f45",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="User"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 3,
              }}
            >
              <Image
                source={require("../assets/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                  marginBottom: 2,
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add Journal Entry"
        component={JournalEntryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/plus.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: "#fff",
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 3,
              }}
            >
              <Image
                source={require("../assets/user.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                  marginBottom: 2,
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                USER
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
