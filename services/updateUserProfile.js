import { FIREBASE_AUTH } from "../services/config";
import { updateProfile } from "firebase/auth";
import { Alert } from "react-native";

export const updateUserProfile = (displayName, mobileNumber, profilePic) => {
  const user = FIREBASE_AUTH.currentUser;
    updateProfile(user, {
    displayName: displayName,
    phoneNumber: mobileNumber,
    photoURL: profilePic
  }).then(()=>{
    Alert.alert("Success", "Profile updated successfully")
  }).catch(e=>{
    Alert.alert("Error", e.message || "An unexpected error occurred. Please try again.")
  })
}

