import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../assets/styles/create.styles";
import COLOURS from "../../../constants/colours";
import MoodSelector from "../../../components/moodSelector";
import { useJournalStore } from "../../../store/journalStore";

export default function EditJournal() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { journals, getJournalById, updateJournal, deleteJournal } = useJournalStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState({ emoji: "😐", value: 3 });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Load existing journal
  useEffect(() => {
    const loadJournal = async () => {
      try {
        let found = journals.find((j) => j._id === id);
        if (!found) {
          found = await getJournalById(id);
        }
        if (!found) throw new Error("Journal not found");

        setTitle(found.title);
        setContent(found.content);
        setMood(found.mood || { emoji: "😐", value: 3 });
      } catch (error) {
        Alert.alert("Error", error.message || "Failed to load journal");
      } finally {
        setLoadingData(false);
      }
    };
    loadJournal();
  }, [id]);

  // Update handler with confirmation
  const handleUpdate = () => {
    if (!title || !content) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    Alert.alert(
      "Update Journal",
      "Are you sure you want to update this journal?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Update",
          onPress: async () => {
            try {
              setLoading(true);
              const result = await updateJournal(id, { title, content, mood });
              if (!result.success) throw new Error(result.message);

              Alert.alert("Success", "Journal updated successfully!");
              router.push(`/journal/${id}`);
            } catch (error) {
              Alert.alert("Error", error.message || "Failed to update journal");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // Delete handler with confirmation
  const handleDelete = () => {
    Alert.alert("Delete Journal", "Are you sure you want to delete this journal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await deleteJournal(id);
            router.push("/");
          } catch (error) {
            Alert.alert("Error", error.message || "Failed to delete journal");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  if (loadingData) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color={COLOURS.primary} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
          <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.title}>Edit Journal Entry</Text>
              <Text style={styles.subtitle}>Update or delete your entry</Text>
            </View>

            {/* FORM */}
            <View style={styles.form}>
              {/* Title */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Journal Title</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="book-outline" size={20} color={COLOURS.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter journal title"
                    placeholderTextColor={COLOURS.placeholderText}
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>
              </View>

              {/* Mood */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>How are you feeling?</Text>
                <MoodSelector mood={mood} setMood={setMood} />
              </View>

              {/* Content */}
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

              {/* Buttons */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                {/* Update */}
                <TouchableOpacity
                  style={[styles.button, { flex: 1, backgroundColor: COLOURS.primary }]}
                  onPress={handleUpdate}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={COLOURS.white} />
                  ) : (
                    <>
                      <Ionicons name="cloud-upload-outline" size={20} color={COLOURS.white} style={styles.buttonIcon} />
                      <Text style={styles.buttonText}>Update</Text>
                    </>
                  )}
                </TouchableOpacity>

                {/* Delete */}
                <TouchableOpacity
                  style={[styles.button, { flex: 1, backgroundColor: "red" }]}
                  onPress={handleDelete}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={COLOURS.white} />
                  ) : (
                    <>
                      <Ionicons name="trash-outline" size={20} color={COLOURS.white} style={styles.buttonIcon} />
                      <Text style={styles.buttonText}>Delete</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
