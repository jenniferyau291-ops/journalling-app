import { StyleSheet } from "react-native";
import COLOURS from "../../constants/colours";
import { FONT, FONT_TITLE } from "../../constants/typography";

const styles = StyleSheet.create({
 title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLOURS.textPrimary,
    marginBottom: 8,
    fontFamily: FONT,
  },

  subtitle: {
    fontSize: 14,
    color: COLOURS.textSecondary,
    textAlign: "center",
    fontFamily: FONT,
  },
});