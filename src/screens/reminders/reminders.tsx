import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';


export default function RemindersScreen() {
    const [reminders, setReminders] = useState<any[]>([]);
    const [deviceToken, setDeviceToken] = useState<string>('');

    useEffect(() => {
        const getToken = async () => {
            const token = await messaging().getToken();
            setDeviceToken(token);
            console.log('FCM Token:', token);
        };
        getToken();
    }, []);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('reminders')
            .orderBy('reminderTime', 'asc')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReminders(data);
            });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const generateTestReminders = async () => {
            if (!deviceToken) return;

            const now = new Date();
            for (let i = 1; i <= 5; i++) {
                const reminderTime = new Date(now.getTime() + i * 60 * 1000); // every i minutes
                await firestore().collection('reminders').add({
                    topic: `Test Reminder #${i}`,
                    subject: 'Testing',
                    reminderTime: reminderTime.toISOString(),
                    status: 'pending',
                    fcmToken: deviceToken,
                });
            }
            console.log('Test reminders generated automatically!');
        };

        generateTestReminders();
    }, [deviceToken]);


    const deleteReminder = async (id: string) => {
        await firestore().collection('reminders').doc(id).delete();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Study Reminders</Text>

            <FlatList
                style={styles.list}
                data={reminders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reminderItem}>
                        <View>
                            <Text style={styles.subject}>{item.subject}</Text>
                            <Text style={styles.topic}>{item.topic}</Text>
                            <Text style={styles.time}>
                                {new Date(item.reminderTime).toLocaleTimeString()}
                            </Text>
                            <Text>Status: {item.status}</Text>
                        </View>
                        <Button title="Delete" onPress={() => deleteReminder(item.id)} />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, marginTop: 50 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    list: { marginTop: 16 },
    reminderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    subject: { fontSize: 16, fontWeight: 'bold' },
    topic: { fontSize: 14, color: '#555' },
    time: { fontSize: 12, color: '#888' },
});