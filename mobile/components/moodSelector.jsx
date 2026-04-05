import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../assets/styles/create.styles"; // or a separate style if needed

const MoodSelector = ({ mood, setMood }) => {
  const moods = ["😞", "😕", "😐", "🙂", "😄"];

  return (
    <View style={styles.moodContainer}>
      {moods.map((m, i) => (
        <TouchableOpacity
          key={i}
          onPress={() =>
            setMood({
              emoji: m,
              value: i + 1,
            })
          }
          style={styles.moodButton}
        >
          <Text style={{ fontSize: 36, opacity: mood.value === i + 1 ? 1 : 0.4 }}>
            {m}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MoodSelector;
