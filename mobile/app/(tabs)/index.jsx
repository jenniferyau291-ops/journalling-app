import { useEffect } from "react";
import { View, Text, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../../components/loader";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/home.styles";
import COLOURS from "../../constants/colours";

import { useJournalStore } from "../../store/journalStore"; // access journal data 
import { useUserStore } from "../../store/userStore"; //access user data 

export default function Home() {
  const router = useRouter();
  const { journals, loading, refreshing, page, hasMore, fetchJournals } = useJournalStore();
 const streakCount = useUserStore((state) => state.streakCount);
const getStreaks = useUserStore((state) => state.getStreaks); 

  useEffect(() => {
  getStreaks(); // fetch streak from backend
  }, [getStreaks]);

  useEffect(() => {
    fetchJournals(); //fetch journals from backend
  }, []);

  //map mood to values and their colour 
  const getMoodDetails = (value) => {
    switch (value) {
      case 1: return { label: "Very Low", color: "#f28b82" };
      case 2: return { label: "Low", color: "#fbbc04" };
      case 3: return { label: "Neutral", color: "#e8eaed" };
      case 4: return { label: "Good", color: "#a7ffeb" };
      case 5: return { label: "Great", color: "#81c995" };
      default: return { label: "Mood", color: "#ddd" };
    }
  };

  //render each journal 

  const renderItem = ({ item }) => {
    const mood = getMoodDetails(item.mood?.value);

    return (
      <TouchableOpacity onPress={() => router.push(`/journal/${item._id}`)} activeOpacity={0.8}>
        <View style={styles.journalCard}>
          <View style={styles.journalHeader}>
            <Text style={styles.username}>{item.user.username}</Text>
          </View>

          <View style={styles.journalDetails}>
            <Text style={styles.journalTitle}>{item.title}</Text>

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: mood.color,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 20,
              alignSelf: "flex-start",
              marginVertical: 6,
            }}>
              <Text style={{ fontSize: 18, marginRight: 5 }}>{item.mood?.emoji}</Text>
              <Text style={{ fontSize: 12 }}>{mood.label}</Text>
            </View>

            <Text style={styles.caption} numberOfLines={3}>{item.content}</Text>
            <Text style={styles.date}>{item.createdAt}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) return <Loader />; // show loading if loading

  return (
    <View style={styles.container}>
      <FlatList
        data={journals}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          // pulls down to refres, get journals and load first page
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchJournals(1, true)}
            colors={[COLOURS.primary]}
            tintColor={COLOURS.primary}
          />
        }
        // if there is more to to scroll once hit 10% bottom to load 
        onEndReached={() => {
          if (hasMore && !loading && !refreshing) fetchJournals(page + 1);
        }}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Journal App</Text>
            <Text style={styles.headerSubtitle}>Reflect. Write. Grow</Text>
            <Text style={styles.headerSubtitle}>Streak: {streakCount} 🔥</Text>
       
          </View>
        }
        //show spinner at bottom if there is more journal to load 
        ListFooterComponent={
          hasMore && journals.length > 0 ? (
            <ActivityIndicator style={styles.footerLoader} size="small" color={COLOURS.primary} />
          ) : null
        }
        //for no journal 
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="journal-outline" size={60} color={COLOURS.textSecondary} />
            <Text style={styles.emptyText}>No journal entry yet</Text>
            <Text style={styles.emptySubtext}>Create your first journal entry!</Text>
          </View>
        }
      />
    </View>
  );
}
