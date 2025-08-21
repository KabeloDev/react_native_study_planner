import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "../../../types/route.type";
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "UpdateSession"
>;

export default function UpdateSessionScreen({ route, navigation }: Props) {
    const { subject } = route.params;

    let [sessionTopic, setSessionTopic] = useState('');
    let [sessionDate, setSessionDate] = useState('');
    let [sessionTime, setSessionTime] = useState('');

    useEffect(() => {
        setSessionTopic(subject.sessionTopic ?? '');
        setSessionDate(subject.sessionDate ?? '');
        setSessionTime(subject.sessionTime ?? '');
    }, [subject]);


    const deleteSessiontByTopic = async (topic: string) => {
        try {
            const sessionSnapshot = await firestore()
                .collection('sessions')
                .where('sessionTopic', '==', topic)
                .get();

            if (sessionSnapshot.empty) {
                console.log('No subjection sessions found with that topic');
                return;
            }

            sessionSnapshot.forEach(async (doc) => {
                await firestore().collection('sessions').doc(doc.id).delete();
                navigation.goBack();
                Alert.alert(`Session deleted!`);
                console.log(`Deleted subject session with id: ${doc.id}`);
            });
        } catch (error) {
            console.error('Error deleting subject session:', error);
            Alert.alert('Something went wrong. Please try again.');
        }
    };

    const updateSessiontByTopic = async (topic: string) => {
        try {
            const sessionSnapshot = await firestore()
                .collection('sessions')
                .where('sessionTopic', '==', topic)
                .get();

            if (sessionSnapshot.empty) {
                console.log('No subjection sessions found with that topic');
                return;
            }

            if (sessionTopic == null || sessionDate == null || sessionTime == null) {
                sessionTopic = subject.sessionTopic;
                sessionDate = subject.sessionDate;
                sessionTime = subject.sessionTime;
            }

            sessionSnapshot.forEach(async (doc) => {
                await firestore().collection('sessions').doc(doc.id).update({
                    sessionTopic: sessionTopic,
                    sessionDate: sessionDate,
                    sessionTime: sessionTime
                });
                navigation.goBack();
                Alert.alert(`Session updated!`);
                console.log(`Updated subject session with id: ${doc.id}`);
            });
        } catch (error) {
            console.error('Error updating subject session:', error);
            Alert.alert('Something went wrong. Please try again.');
        }
    };

    return (
        <View style={styles.body}>
            <Text>Session</Text>

            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Topic"
                    defaultValue={subject.sessionTopic}
                    onChangeText={setSessionTopic}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date"
                    defaultValue={subject.sessionDate}
                    onChangeText={setSessionDate}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Session Time"
                    defaultValue={subject.sessionTime}
                    onChangeText={setSessionTime}
                />
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => updateSessiontByTopic(subject.sessionTopic)}
                >
                    <Text style={styles.buttonText}>Update Session</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.deleteButton}>
                <TouchableOpacity
                    onPress={() => deleteSessiontByTopic(subject.sessionTopic)}
                >
                    <Text style={styles.buttonText}>Delete Session</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        position: 'absolute',
        bottom: 120,
        right: 5,
        width: 200,
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    deleteButton: {
        position: 'absolute',
        bottom: 120,
        right: 220,
        width: 200,
        backgroundColor: '#ff0000ff',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 25
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        width: 400
    },
})