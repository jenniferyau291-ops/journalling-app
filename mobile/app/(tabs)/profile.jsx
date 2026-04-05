import { View } from 'react-native'

import styles from "../../assets/styles/profile.style";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogOutButton";

export default function profile() {
 

 return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />

    
    </View>
  );
}