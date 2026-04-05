import { View, Text } from "react-native";
import { useAuthStore } from "../store/authStore";
import styles from "../assets/styles/profile.style";
import { formatMemberSince } from "../lib/utils";

export default function ProfileHeader() {
  const { user } = useAuthStore();
  console.log("user in profile:", user);

  if (!user) return null;

  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.memberSince}> 🗓️ Joined{formatMemberSince(user.createdAt)}</Text>
      </View>
    </View>
  );
}