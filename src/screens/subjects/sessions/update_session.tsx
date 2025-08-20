import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "../../../types/route.type";
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "UpdateSession"
>;

export default function UpdateSessionScreen({ route, navigation }: Props) {
    const { subject } = route.params;

     const deleteSessiontByTopic = async (topic: string) => {
        try {
            const sessionSnapshot = await  firestore()
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
        }
    };

    return (
        <View style={styles.body}>
            <Text>Update Session Screen</Text>
            <Text>{subject.sessionTopic}</Text>

            <View style={styles.button}>
                <TouchableOpacity
                // onPress={}
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
})