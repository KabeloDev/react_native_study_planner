import { StyleSheet, View, Text, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useState } from "react";

export default function AddSubjectScreen() {
    const [subjectData, setSubjectData] = useState({
        title: "",
        description: "",
        createdAt: ""
    });
    
    const handleSave = async () => {
        try {
            await firestore().collection('subjects').add({
                title: 'My First Item',
                description: 'Hello Firestore!',
                createdAt: firestore.FieldValue.serverTimestamp(),
            })
            Alert.alert("Subject added!");
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
    }
})