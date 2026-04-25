import { View, Text, TouchableOpacity } from "react-native";
import styles from "../assets/styles/graph.styles"; 
import COLOURS from "../constants/colours";

const MonthSelector = ({ month, setMonth }) => {
  //month options
  const months = ["Janurary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (
    <View style={styles.monthContainer}>
      {months.map((m, i) => ( //loop through each month and display 
        <TouchableOpacity // make each month clickable
          key={i}
          onPress={() =>
            setMonth(i + 1)
    
          }
          //if clicked fully visible and others faded 
          style={styles.monthButton} >  
          <Text style={{ colour: COLOURS.textPrimary, fontSize: 11, opacity: month.value === i + 1 ? 1 : 0.4 }}> 
            {m}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
// make this compnent available 
export default MonthSelector;
