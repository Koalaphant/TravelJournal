import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async (query) => {
  try {
    const userQuery = await AsyncStorage.getItem(query);
    return userQuery;
  } catch (e) {
    console.error("Error retrieving user data:", e);
    return null;
  }
};