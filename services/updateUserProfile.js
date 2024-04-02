import { FIREBASE_AUTH } from "../services/config";
import { updateProfile, getAuth } from "firebase/auth";
import { Alert } from "react-native";

export const updateUserProfile = (displayName, mobileNumber) => {
  const user = getAuth().currentUser
  updateProfile(user, {
    displayName: displayName,
    phoneNumber: mobileNumber,
  })
    .then(() => {
      Alert.alert("Success", "Profile updated successfully");
    })
    .catch((e) => {
      Alert.alert(
        "Error",
        e.message || "An unexpected error occurred. Please try again."
      );
    });
};

export const updateUserPhoto = (profilePic) => {
  const user = getAuth().currentUser
  updateProfile(user, {
    photoURL: profilePic,
  })
    .then(() => {
      Alert.alert("Success", "Profile updated successfully");
    })
    .catch((e) => {
      Alert.alert(
        "Error",
        e.message || "An unexpected error occurred. Please try again."
      );
    });
};
