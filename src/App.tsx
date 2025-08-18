import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootTabParamList, RootStackParamList } from './types/route.type';
import Icon from 'react-native-vector-icons/Ionicons';
import SubjectsScreen from './screens/subjects/subjects';
import RemindersScreen from './screens/reminders/reminders';
import SettingsScreen from './screens/settings/settings';
import SubjectDetailsScreen from './screens/subjects/subject_details';


export default function App() {
  const Tabs = createBottomTabNavigator<RootTabParamList>();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  function SubjectStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Subjects" component={SubjectsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SubjectDetails" component={SubjectDetailsScreen} options={{ title: "Details" }} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tabs.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#fff",
              height: 60,
              borderRadius: 30,
              position: "absolute",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 5,
              margin: 30,
            },
          }}
        >
          <Tabs.Screen name="SubjectsTab"
            component={SubjectStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => <Icon size={28} name="book-outline" color={color} />,
              title:'Subjects'
            }} />

          <Tabs.Screen name="RemindersTab"
            component={RemindersScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => <Icon size={28} name="notifications-outline" color={color} />,
              title:'Reminders'
            }} />

          <Tabs.Screen name="SettingsTab"
            component={SettingsScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => <Icon size={28} name="settings-outline" color={color} />,
              title:'Settings'
            }} />
        </Tabs.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

