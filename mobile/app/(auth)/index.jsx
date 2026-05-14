import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { Link } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import styles from "../../assets/styles/login.styles";
import COLOURS from "../../constants/colours";
import { useAuthStore } from "../../store/authStore";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login, isCheckingAuth } = useAuthStore()


  //login function 
  const handleLogin =  async () => {
     const result = await login(email, password);

    if (!result.success) Alert.alert("Error", result.error);
  };

  if (isCheckingAuth) return null; //check to see if user logged in 

  return (
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior="height"
>
  <View style={styles.container}>
      {/* ILLUSTRATION */}
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
            {/* EMAIL */}
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
                  placeholder="Enter your email"
                  placeholderTextColor={COLOURS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* PASSWORD */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                {/* LEFT ICON */}
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLOURS.primary}
                  style={styles.inputIcon}
                />
                {/* INPUT */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
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
        
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text> // login button when pressed calls the login function and show loading
              )}
            </TouchableOpacity>

            {/* FOOTER */}
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link href="/signup" asChild>  
                <TouchableOpacity>
                  <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
       </KeyboardAvoidingView>
  );
}