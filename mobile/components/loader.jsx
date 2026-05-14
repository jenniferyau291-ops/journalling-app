import { View, ActivityIndicator } from "react-native";
import COLOURS from "../constants/colours";



//show loading
export default function Loader({ size = "large" }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOURS.background,
      }}
    >
      <ActivityIndicator size={size} color={COLOURS.primary} />
    </View>
  );
}