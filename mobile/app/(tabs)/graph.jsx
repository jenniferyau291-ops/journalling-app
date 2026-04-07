import { View, Text } from 'react-native'
import React from 'react'
import { useJournalStore } from "../../store/journalStore"

export default function graph() {

  const { fetchMoods} = useJournalStore();
  
  useEffect(() => {
      fetchMoods(); //fetch Moods
    }, []);






  
  
  
  
  
  
  
  
  return (
    <View>
      <Text>my mood tracker</Text>
    </View>
  )
}