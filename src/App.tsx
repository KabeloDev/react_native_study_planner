import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types/route.type';
import Icon from 'react-native-vector-icons/Ionicons';
import SubjectsScreen from './screens/subjects';
import RemindersScreen from './screens/reminders';
import SettingsScreen from './screens/settings';

export default function App() {
  const Tabs = createBottomTabNavigator<RootTabParamList>();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tabs.Navigator>
          <Tabs.Screen name="Subjects" 
            component={SubjectsScreen} 
            options={{ 
              headerShown: false, 
              tabBarIcon: ({ color }) => <Icon size={28} name="book-outline" color={color} /> 
          }} />
          
          <Tabs.Screen name="Reminders" 
            component={RemindersScreen} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color }) => <Icon size={28} name="notifications-outline" color={color} /> 
          }} />

          <Tabs.Screen name="Settings" 
            component={SettingsScreen} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color }) => <Icon size={28} name="settings-outline" color={color} /> 
          }} />
        </Tabs.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

