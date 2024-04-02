import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  Login  from '../screens/Login';
import IndividualEntry from "../screens/IndividualEntry";
import JournalEntriesScreen from "../screens/JournalEntriesScreen";
import Header from "../components/header";
import Tabs from "../navigation/tabs";
import Gallery from "../components/Gallery";
const Stack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const LoginLayout = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
};



function TabNav() {
  return (
    <Tabs />
  );
}

const RootStack = () => {
const {user} = useContext(UserContext)
  
    return (
    
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Header />
          {user ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Tabs"
                component={TabNav}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Gallery"
                component={Gallery}
                options={{ headerShown: false }}
              />
  
              <Stack.Screen
                name="IndividualEntry"
                component={IndividualEntry}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="JournalEntriesScreen"
                component={JournalEntriesScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          ) : (
            <LoginLayout />
          )}
  
        </SafeAreaView>
      </NavigationContainer>

    );
  };
  
  export default RootStack;
  