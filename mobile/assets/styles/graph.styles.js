import { StyleSheet } from "react-native";
import COLOURS from "../../constants/colours";
import { FONT, FONT_TITLE } from "../../constants/typography";

const styles = StyleSheet.create({
  container: {
  backgroundColor: COLOURS.background,
  padding: 16,
  borderWidth: 1,
  borderColor: COLOURS.outline,
  paddingBottom: 40,
  flex:1,
},

  header: {
    marginBottom: 16,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLOURS.primary,
    fontStyle: "italic",
    fontFamily: FONT_TITLE,
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 14,
    color: COLOURS.textSecondary,
    textAlign: "center",
    fontFamily: FONT
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 40,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLOURS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    fontFamily:FONT
  },

  emptySubtext: {
    fontSize: 14,
    color: COLOURS.textSecondary,
    textAlign: "center",
    fontFamily:FONT
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLOURS.textPrimary,
    fontWeight: "500",
    fontFamily: FONT,
  },
  monthContainer: {
  flexDirection: "row",
 justifyContent: "space-around",
  alignItems: "center",
  marginTop: 10,
  flexWrap: "wrap"
},

monthButton:{
  width:"30%",
  marginBottom: 10,
}

});

export default styles;
