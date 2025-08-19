import { StyleSheet, View, Text, Alert, TouchableOpacity, TextInput } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/route.type";

type Props = NativeStackScreenProps<RootStackParamList, 'AddSubjects'>;

export default function AddSubjectScreen({ navigation }: Props) {
    const [subjectTitle, setSubjectTitle] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');

    const handleSave = async () => {
        try {
            await firestore().collection('subjects').add({
                title: subjectTitle,
                description: subjectDescription,
                createdAt: firestore.FieldValue.serverTimestamp(),
            })
            Alert.alert("Subject added!");
            navigation.navigate('Subjects');
        } catch (error) {
            console.error("Error adding subject:", error);
        }
    };


    return (
        <View style={styles.body}>
            <Text>
                Add subject screen
            </Text>
            <TouchableOpacity
                onPress={() => handleSave()}
            >
                <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={subjectTitle}
                    onChangeText={setSubjectTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={subjectDescription}
                    onChangeText={setSubjectDescription}
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
        marginTop: 20
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