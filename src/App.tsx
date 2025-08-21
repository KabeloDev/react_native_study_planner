import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootTabParamList, RootStackParamList } from './types/route.type';
import Icon from 'react-native-vector-icons/Ionicons';
import SubjectsScreen from './screens/subjects/subjects';
import RemindersScreen from './screens/reminders/reminders';
import SubjectDetailsScreen from './screens/subjects/subject_details';
import { Alert, PermissionsAndroid, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging'
import AddSubjectScreen from './screens/subjects/add_subjects';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AddSessionsScreen from './screens/subjects/sessions/add_session';
import UpdateSessionScreen from './screens/subjects/sessions/update_session';
import DocumentsScreen from './screens/documents/documents';


const Tabs = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const requestPermission = async () => {
    try {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      console.log('Permission: ', result);
      if (result == PermissionsAndroid.RESULTS.GRANTED) {
        requestToken();
      } else {
        Alert.alert("Permission denied")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const requestToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('Token: ', token);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    requestPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        `${remoteMessage.notification?.title}`,
        `${remoteMessage.notification?.body}`
      );
    });

    return unsubscribe;
  }, []);


  function SubjectStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Subjects" component={SubjectsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddSubjects" component={AddSubjectScreen} options={{ title: "Add Subject" }} />
        <Stack.Screen name="SubjectDetails" component={SubjectDetailsScreen} options={{ title: "Sessions" }} />
        <Stack.Screen name="AddSession" component={AddSessionsScreen} options={{ title: "Add Session" }} />
        <Stack.Screen name="UpdateSession" component={UpdateSessionScreen} options={{ title: "Update Session" }} />
      </Stack.Navigator>
    );
  }

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
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
                title: 'Subjects'
              }} />

            <Tabs.Screen name="RemindersTab"
              component={RemindersScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Icon size={28} name="notifications-outline" color={color} />,
                title: 'Reminders'
              }} />

            <Tabs.Screen name="DocumentsTab"
              component={DocumentsScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Icon size={28} name="file-tray-full-outline" color={color} />,
                title: 'Documents'
              }} />
          </Tabs.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  }
})
