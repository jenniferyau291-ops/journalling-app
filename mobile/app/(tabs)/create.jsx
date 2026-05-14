import { useState, useEffect} from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList
} from "react-native";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import COLOURS from "../../constants/colours";
import MoodSelector from "../../components/moodSelector"; //access to the mood selector 
import { useJournalStore } from "../../store/journalStore"; //creating journal and accessing state 
import { useUserStore } from "../../store/userStore";



export default function Create() {
  const [aiPrompts, setAiPrompts] = useState([]);
const [loadingAI, setLoadingAI] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState({
  emoji: "😐",
  value: 3
});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { createJournal } = useJournalStore(); 
  const { generateAIPrompts } = useUserStore();

  const loadPrompts = async () => {
  try {
    setLoadingAI(true);

    const result = await generateAIPrompts();

    setAiPrompts(result);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingAI(false);
  }
};

useEffect(() => {
  loadPrompts();
}, []);


  const handleSubmit = async () => {
  if (!title || !content) {
    Alert.alert("Error", "Please fill in all fields");
    return;
  }

  try {
    setLoading(true); // loading 

    const result = await createJournal({ title, content, mood }); //calls the create journal from the store

    if (!result.success) {
      throw new Error(result.message);
    }

    Alert.alert("Success", "Your journal entry has been posted!");

    setTitle("");
    setContent("");
    setMood({ emoji: "😐", value: 3 }); // set this as default 

    router.push("/");
  } catch (error) {
    console.error("Error creating post:", error);
    Alert.alert("Error", error.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

 
  return (
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : undefined}
>
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}> Add Your Journal Entry</Text>
            <Text style={styles.subtitle}>Share your thoughts</Text>
          </View>
          {/* Prompts */}
          <View style={styles.formContainer}>
              {loadingAI && <Text>Loading AI prompts...</Text>}

{!loadingAI && aiPrompts.length > 0 (
  <View style={styles.formGroup}>
    <Text style={styles.label}>
      AI journalling ideas
    </Text>

    {aiPrompts.map((prompt, i) => (
  <Text key={i}>{prompt}</Text>
))}

  </View>
)}
            {/* Journal TITLE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Journal Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLOURS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter journal title"
                  placeholderTextColor={COLOURS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>
             

           {/* MOOD  calls mood selector */}
<View style={styles.formGroup}>
  <Text style={styles.label}>How are you feeling?</Text>
  
  <MoodSelector mood={mood} setMood={setMood} />
</View>


            {/* Content*/}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Content</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your journal..."
                placeholderTextColor={COLOURS.placeholderText}
                value={content}
                onChangeText={setContent}
                multiline
              />
            </View>
            

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}> 
              {loading ? (
                <ActivityIndicator color={COLOURS.white} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLOURS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text> 
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}