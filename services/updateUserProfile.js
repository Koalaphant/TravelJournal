import { FIREBASE_AUTH } from "../services/config";
import { updateProfile } from "firebase/auth";

export const updateUserProfile = async (displayName, mobileNumber, profilePic) => {
  const user = FIREBASE_AUTH.currentUser;
  const email = user.email
  await updateProfile(user, {
    displayName: displayName,
    email: email,
    phoneNumber: mobileNumber,
    photoURL: profilePic
  });
}

