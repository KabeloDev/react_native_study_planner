import { RouteProp, useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "../../../types/route.type";
import { useState } from "react";
import firestore from '@react-native-firebase/firestore';

type Props = { route: RouteProp<RootStackParamList, 'AddSession'> };

export default function AddSessionsScreen({ route }: Props) {
    const { subject } = route.params;
    const navigation = useNavigation();

    const [sessionTopic, setSessionTopic] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [sessionTime, setSessionTime] = useState('');

    const handleSave = async () => {
        try {
            await firestore().collection('sessions').add({
                sessionSubject: subject.title,
                sessionTopic: sessionTopic,
                sessionDate: sessionDate,
                sessionTime: sessionTime
            });
            Alert.alert("Subject session added!");
            navigation.goBack();
        } catch (error) {
            console.error("Error adding subject session:", error);
        }
    };

    return (
        <View style={styles.body}>
            <View>
                <Text style={styles.inputTitle}>{subject.title}</Text>
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
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => handleSave()}
                >
                    <Text style={styles.buttonText}>Save</Text>
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