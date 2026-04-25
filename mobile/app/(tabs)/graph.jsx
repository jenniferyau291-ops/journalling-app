import React, { useEffect } from "react";
import { View, Text,  ScrollView, useWindowDimensions} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { LineChart } from "react-native-chart-kit";
import { useJournalStore } from "../../store/journalStore";
import Loader from "../../components/loader";
import MonthSelector from "../../components/monthSelector";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/graph.styles";
import COLOURS from "../../constants/colours";
import dataForChart from "../../components/getChartData"; 

export default function Graph() {
  const { moods, loading, fetchMoods, selectedMonth, setSelectedMonth } =
    useJournalStore();

    const {width}= useWindowDimensions();

    //only call the mothod once when opening the graph so does not update

  //useEffect(() => {
   //fetchMoods();
  //}, []);

  //only call the mothod once when opening the graph so does not update. had to usefocusEffect better when opening app runs the method again as update mood didnt show like on graph 
  useFocusEffect(
  useCallback(() => {
    fetchMoods();
  }, [])
);
//debug
useEffect(() => {
  console.log("MOODS UPDATED:", moods);
}, [moods]);


 
const chartData = dataForChart(moods, selectedMonth);
const noData = chartData.datasets[0].data.length === 0;

//debug to see what logged out 
console.log("chartData:", chartData);

  if (loading) return <Loader />;

return (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Journal App</Text>
      <Text style={styles.headerSubtitle}>My Mood Tracker</Text>
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Pick a month</Text>
      <MonthSelector
        month={selectedMonth}
        setMonth={setSelectedMonth}
      />
    </View>
  
    <LineChart
      data={chartData}
      width={width}
      height={220}
      yAxisInterval={1}
      chartConfig={{
        backgroundGradientFrom: COLOURS.white,
        backgroundGradientTo: COLOURS.white,
        decimalPlaces: 0,
        color: () => COLOURS.primary,
      }}
      bezier
      withShadow = {false}
    />
     {noData &&(
          <View style={styles.emptyContainer}>
            <Ionicons name="journal-outline" size={60} color={COLOURS.textSecondary} />
            <Text style={styles.emptyText}>No mood data to track yet</Text>
            <Text style={styles.emptySubtext}>Create your first journal entry to track mood!</Text>
    </View>
)}

    <View>

    <Text>
      1 = 😞, 2 = 😕, 3 = 😐, 4 = 🙂, 5 = 😄
    </Text>
    </View>
  </ScrollView>

)};