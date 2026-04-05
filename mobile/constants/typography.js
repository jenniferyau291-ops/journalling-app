// constants/typography.js
import { Platform } from "react-native";

export const FONT = Platform.OS === "android" ? "Roboto" : undefined;
export const FONT_TITLE = "serif";
