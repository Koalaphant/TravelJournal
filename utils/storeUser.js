import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (key, value) => {
  try {
      await AsyncStorage.setItem(key, value);
    
  } catch (e) {
    console.error("Error storing the user data:", e);
  }
};