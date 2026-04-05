import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";

import { useState } from "react";
import styles from "../../assets/styles/signup.styles";
import COLOURS from "../../constants/colours";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";




export default function signup() {
  const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

    const { user, isLoading, register, token } = useAuthStore();


    const router = useRouter();

    //register function 
   const handleSignUp = async ()=>{
    const result = await register(username, email, password);

    if (!result.success) Alert.alert("Error", result.error);
  };

  return (
       <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
    >
      <View style={styles.container}>
         <View style={styles.topIllustration}>
  <Image
    source={require("../../assets/images/Hand-holding-pen-amico.png")}
    style={styles.illustrationImage}
    resizeMode="contain"
  />
         <Text style={styles.appTitle}>Journal App</Text>
         </View>
        <View style={styles.card}>

          <View style={styles.formContainer}>
            {/* USERNAME INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLOURS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="johndoe"
                  placeholderTextColor={COLOURS.placeholderText}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* EMAIL INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLOURS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="johndoe@gmail.com"
                  value={email}
                  placeholderTextColor={COLOURS.placeholderText}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* PASSWORD INPUT */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLOURS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="******"
                  placeholderTextColor={COLOURS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLOURS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* SIGNUP BUTTON */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text> // when pressed register function and show loading 
              )}
            </TouchableOpacity>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
 