// styles/login.styles.js
import { StyleSheet, Dimensions, Platform } from "react-native";
import COLOURS from "../../constants/colours";
import { FONT, FONT_TITLE } from "../../constants/typography";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLOURS.background,
    padding: 20,
     justifyContent: "flex-start", // aligns to top
    borderWidth: 1,
    borderColor: COLOURS.outline, 
  },
  
   appTitle: {
  fontSize: 27,
  fontWeight: "700",
  lineHeight:34,
  color: COLOURS.textPrimary,
  marginTop: 12,
  marginBottom: 15,
  fontFamily: FONT_TITLE,
   borderWidth: 1.5,            
  borderColor: COLOURS.primary, 
  borderRadius: 4,              
  paddingHorizontal: 16,        
  paddingVertical: 8,           
  textAlign: "center",          
  alignSelf: "center",         
  backgroundColor: COLOURS.cardBackground,
  fontStyle: "italic"
},
  

  topIllustration: {
    alignItems: "center",
    width: "100%",
  },

 illustrationImage: {
  width: width * 0.6,
  height: width * 0.6,
  marginBottom: 12,
},


  card: {
    backgroundColor: COLOURS.cardBackground,
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: COLOURS.border,
    marginTop: -8,
    ...Platform.select({
      ios: {
        shadowColor: COLOURS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  
  formContainer: {
    marginBottom: 16,
  },

  inputGroup: {
    marginBottom: 20,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLOURS.border,
    paddingHorizontal: 12,
    height: 48,
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

  inputIcon: {
    marginRight: 10,
    color: COLOURS.textSecondary,
  },

  input: {
    flex: 1,
    height: 48,
    color: COLOURS.textDark,
    fontFamily: FONT,
  },

  eyeIcon: {
    padding: 8,
  },

  button: {
    backgroundColor: COLOURS.primary,
    borderRadius: 12,
    height: 50,
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

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  footerText: {
    color: COLOURS.textSecondary,
    marginRight: 5,
    fontFamily: FONT,
  },

  link: {
    color: COLOURS.primary,
    fontWeight: "600",
    fontFamily: FONT,
  },

});

export default styles;
