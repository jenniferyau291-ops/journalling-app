import { StyleSheet, Dimensions} from "react-native";
import COLOURS from "../../constants/colours";
import { FONT, FONT_TITLE } from "../../constants/typography";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.background,
    padding: 16,
    justifyContent: "center",
  },

  card: {
    backgroundColor: COLOURS.cardBackground,
    borderRadius: 12,
    padding: 20,
    elevation: 3, 
    borderWidth: 1,
    borderColor: COLOURS.border,
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
  

  formContainer: { marginBottom: 12 },

  inputGroup: { marginBottom: 16 },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: COLOURS.textPrimary,
    fontFamily:FONT,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOURS.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.border,
    paddingHorizontal: 12,
    height: 48,
  },

  inputIcon: { marginRight: 8 },

  input: {
    flex: 1,
    color: COLOURS.textDark,
   fontFamily:FONT,
    paddingVertical: 0,
  },

  eyeIcon: { padding: 6 },

  button: {
    backgroundColor: COLOURS.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    elevation: 2,
  },

  buttonText: {
    color: COLOURS.white,
    fontSize: 15,
    fontFamily:FONT,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  footerText: {
    color: COLOURS.textSecondary,
    marginRight: 4,
    fontFamily:FONT,
  },

  link: {
    color: COLOURS.primary,
    vfontFamily:FONT,
  },
});

export default styles;