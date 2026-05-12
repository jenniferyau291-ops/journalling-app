import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../assets/styles/create.styles"; 

//mood selector - current mood and set mood
const MoodSelector = ({ mood, setMood }) => {
  //mood options
  const moods = ["😞", "😕", "😐", "🙂", "😄"];

  return (
    <View style={styles.moodContainer}>
      {moods.map((m, i) => ( //loop through mood and display 
        <TouchableOpacity // make each mood clickable
          key={i}
          onPress={() =>
            setMood({ //set mood to what was clicked and the value
              emoji: m,
              value: i + 1,
            })
          }
          //if clicked fully visible and others faded 
          style={styles.moodButton} >  
          <Text style={{ fontSize: 36, opacity: mood.value === i + 1 ? 1 : 0.4 }}> 
            {m}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
// make this compnent available 
export default MoodSelector;
