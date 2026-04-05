// styles/profile.styles.js
import { StyleSheet } from "react-native";
import COLOURS from "../../constants/colours";
import { FONT } from "../../constants/typography";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.background,
    padding: 16,
  },

  
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOURS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLOURS.border,
  },

  profileInfo: {
    flex: 1,
  },

  username: {
    fontSize: 20,
    fontWeight: "700",
    color: COLOURS.textPrimary,
    marginBottom: 4,
     fontFamily: FONT,
  },

  email: {
    fontSize: 14,
    color: COLOURS.textSecondary,
    marginBottom: 2,
    fontFamily: FONT,
  },

  memberSince: {
    fontSize: 12,
    color: COLOURS.textSecondary,
     fontFamily: FONT,
  },

  logoutButton: {
    backgroundColor: COLOURS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },

  logoutText: {
    color: COLOURS.white,
    fontWeight: "600",
    marginLeft: 8,
     fontFamily: FONT,
  },


});

export default styles;
