import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';


export default function RemindersScreen() {
    const [reminders, setReminders] = useState<any[]>([]);

    useEffect(() => {
        firestore()
            .collection('reminders')
            .orderBy('reminderTime', 'asc')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    const docData = doc.data();

                    return {
                        subject: docData.subject,
                        topic: docData.topic,
                        reminderTime: docData.reminderTime,
                    };
                });

                setReminders(data);
            });
    }, []);


    const deleteReminder = async (topic: string) => {
        try {
            const sessionSnapshot = await firestore()
                .collection('reminders')
                .where('topic', '==', topic)
                .get();

            if (sessionSnapshot.empty) {
                console.log('No session reminders found with that topic');
                return;
            }

            sessionSnapshot.forEach(async (doc) => {
                await firestore().collection('reminders').doc(doc.id).delete();
                console.log(`Deleted session reminder with id: ${doc.id}`);
            });
        } catch (error) {
            console.error('Error deleting session reminder:', error);
            Alert.alert('Something went wrong. Please try again.');
        }
    };


    return (
        <View style={styles.container}>
            {reminders.length === 0 ?
                <View style={styles.center}>
                    <Text>No reminders at the moment</Text>
                </View>

                :
                null
            }


            <FlatList
                style={styles.list}
                data={reminders}
                renderItem={({ item }) => (
                    <View style={styles.reminderItem}>
                        <View>
                            <Text style={styles.subject}>{item.subject}</Text>
                            <Text style={styles.topic}>{item.topic}</Text>
                            <Text style={styles.time}>
                                {new Date(item.reminderTime).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}{' '}
                                {new Date(item.reminderTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text>

                        </View>
                        <Button title="Delete" onPress={() => deleteReminder(item.topic)} />
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});