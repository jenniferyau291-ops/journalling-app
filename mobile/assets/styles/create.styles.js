// styles/create.styles.js
import { StyleSheet, Platform } from "react-native";
import COLOURS from "../../constants/colours";
import { FONT} from "../../constants/typography";

const styles = StyleSheet.create({
  container: {
  backgroundColor: COLOURS.background,
  padding: 16,
  borderWidth: 1,
  borderColor: COLOURS.outline,
  justifyContent: "flex-start",
  paddingBottom: 40,
},
 scrollViewStyle: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },


  card: {
    backgroundColor: COLOURS.cardBackground,
    borderRadius: 12,
    padding: 20,
    width: "100%",
    minHeight: 300, // ensures card isn’t too small
    marginTop: 16, // space below header
    borderWidth: 1,
    borderColor: COLOURS.border,
    ...Platform.select({
      ios: {
        shadowColor: COLOURS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

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

  formContainer: {
    marginBottom: 16,
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

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOURS.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.border,
    paddingHorizontal: 12,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: COLOURS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  inputGroup: {
  marginBottom: 28, // adds vertical spacing between input sections
},


  inputIcon: {
    marginRight: 10,
    color: COLOURS.textSecondary,
  },

  input: {
    flex: 1,
    color: COLOURS.textDark,
    fontSize: 16,
    fontFamily: FONT,
    
  },

  textArea: {
    backgroundColor: COLOURS.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.border,
    padding: 12,
    height: 100,
    color: COLOURS.textDark,
    fontFamily: FONT,
  },

  moodContainer: {
  flexDirection: "row",
 justifyContent: "space-around",
  alignItems: "center",
  marginTop: 10,
},

moodButton: {
  padding: 6,
},


  

  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },



  button: {
    backgroundColor: COLOURS.primary,
    borderRadius: 8,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLOURS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  buttonText: {
    color: COLOURS.white,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: FONT,
  },

  buttonIcon: {
    marginRight: 8,
  },

  
});

export default styles;
