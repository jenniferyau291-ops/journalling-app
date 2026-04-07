import {Stack} from "expo-router";

//handles login and register page using stack
export default function AuthLayout() {
 return <Stack screenOptions={{ headerShown: false }} />;
}
