import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLOURS from "../constants/colours";

//protective wrapper
export default function SafeScreen({ children }) {
  const insets = useSafeAreaInsets();

  return <View style={[styles.container, { paddingTop: insets.top }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },
});