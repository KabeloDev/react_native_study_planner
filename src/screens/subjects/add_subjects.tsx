import { StyleSheet, View, Text, Alert, TouchableOpacity, TextInput } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/route.type";

type Props = NativeStackScreenProps<RootStackParamList, 'AddSubjects'>;

export default function AddSubjectScreen({ navigation }: Props) {
    const [subjectTitle, setSubjectTitle] = useState('');
    const [sessionTopic, setSessionTopic] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [sessionTime, setSessionTime] = useState('');

    const handleSave = async () => {
        try {
            await firestore().collection('subjects').add({
                title: subjectTitle,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

            await firestore().collection('sessions').add({
                sessionSubject: subjectTitle,
                sessionTopic: sessionTopic,
                sessionDate: sessionDate,
                sessionTime: sessionTime
            });
            Alert.alert("Subject added!");
            navigation.navigate('Subjects');
        } catch (error) {
            console.error("Error adding subject:", error);
        }
    };


    return (
        <View style={styles.body}>
            <TouchableOpacity
                onPress={() => handleSave()}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <View>
                <Text>Subject</Text>
            </View>
            <View style={styles.inputTitle}>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={subjectTitle}
                    onChangeText={setSubjectTitle}
                />
            </View>
            <View>
                <Text>Session</Text>
            </View>
             <View>
                <TextInput
                    style={styles.input}
                    placeholder="Topic"
                    value={sessionTopic}
                    onChangeText={setSessionTopic}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date"
                    value={sessionDate}
                    onChangeText={setSessionDate}
                />
                 <TextInput
                    style={styles.input}
                    placeholder="Session Time"
                    value={sessionTime}
                    onChangeText={setSessionTime}
                />
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 20,
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        width: 400
    },
    inputTitle: {
        marginBottom: 20
    },
    button: {
        position: 'absolute',
        bottom: 120,
        right: 90,
        width: 250,
        backgroundColor: '#007AFF',
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
        fontSize: 16,
        paddingLeft: 90
    },
})