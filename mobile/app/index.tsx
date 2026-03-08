import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router"; 
import { useEffect} from "react";
import {useAuthStore} from "../store/authStore"; 


export default function Index() {
  const {user, token,checkAuth, logout} =useAuthStore();
  console.log(user, token);
  useEffect(() =>{
    checkAuth();

  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello {user?.username}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>logout</Text>
      </TouchableOpacity>

      <Link href ="/(auth)">login page</Link>
      <Link href = "/(auth)/signup">sign up page</Link>
    </View>
  );
}
