import { View, Text, Switch} from 'react-native'
import { useUserStore } from "../../store/userStore"
import styles from "../../assets/styles/profile.style";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogOutButton";

export default function profile() {
 
  const { aiPreferences, updatePreferences } = useUserStore();
const { aiSummary, aiPrompts } = aiPreferences;

 return (
    <View style={styles.container}>

      <View style={styles.header}>
            <Text style={styles.headerTitle}>Journal App</Text>
            <Text style={styles.headerSubtitle}>Reflect. Write. Grow</Text>
            </View>
      <ProfileHeader />

      <View>

        {/* Title */}
        <Text style ={styles.titleSetting}>
          AI Settings
        </Text>

        {/* Warning AI text message */}
        <Text style={styles.warningText}>
           AI features may use your journal content to generate summaries and prompts.
          You can turn them off at any time.
        </Text>

        {/* AI summary*/}
        <View
          style={styles.toggle}
        >
          <Text style={styles.text}>AI Summary</Text>

         <Switch
  value={aiSummary}
  onValueChange={() =>
    updatePreferences({
      aiSummary: !aiSummary,
      aiPrompts,
    })
  }
/>
        </View>

        {/* AI prompts */}
        <View
          style={styles.toggle}
        >
          <Text style ={styles.text}>AI Prompts</Text>

          <Switch
  value={aiPrompts}
  onValueChange={() =>
    updatePreferences({
      aiPrompts: !aiPrompts,
      aiSummary,
    })
  }
/>
        </View>
      </View>

      <LogoutButton />

    
    </View>
  );
}