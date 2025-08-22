import { useFocusEffect } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "../../types/route.type";
import { useCallback, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "SubjectDetails"
>;


export default function SubjectDetailsScreen({ route, navigation }: Props) {
    const { subject } = route.params;

    const [sessionData, setSessionData] = useState<any[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fecthSessions = async () => {
                try {
                    const snapshot = await firestore().collection('sessions').get();

                    const data = snapshot.docs.map(doc => ({
                        sessionSubject: doc.data().sessionSubject,
                        sessionTopic: doc.data().sessionTopic,
                        sessionDate: doc.data().sessionDate,
                        sessionTime: doc.data().sessionTime,
                    }));

                    const filtered = data.filter(
                        (s) => s.sessionSubject === subject.title
                    );

                    setSessionData(filtered);
                } catch (error) {
                    console.log('Error fetching subject sessions: ', error);
                    ToastAndroid.show('Something went wrong. Please try again.', ToastAndroid.SHORT);
                }
            }

            fecthSessions();
        }, [])
    );

    const deleteSubjectByTitle = async (title: string) => {
        try {
            const subjectSnapshot = await firestore()
                .collection('subjects')
                .where('title', '==', title)
                .get();
            
            const sessionSnapshot = await  firestore()
                .collection('sessions')
                .where('sessionSubject', '==', title)
                .get();

            if (subjectSnapshot.empty) {
                console.log('No subject found with that title');
                return;
            }

            if (sessionSnapshot.empty) {
                console.log('No subjection sessions found with that title');
                return;
            }

            subjectSnapshot.forEach(async (doc) => {
                await firestore().collection('subjects').doc(doc.id).delete();
                navigation.goBack();
                ToastAndroid.show(`${subject.title} deleted!`, ToastAndroid.SHORT);
                console.log(`Deleted subject with id: ${doc.id}`);
            });

            sessionSnapshot.forEach(async (doc) => {
                await firestore().collection('sessions').doc(doc.id).delete();
            });
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    return (
        <View style={styles.body}>
            <View style={{marginBottom: 200}}>
                <FlatList
                    data={sessionData}
                    numColumns={1}
                    contentContainerStyle={{ padding: 8 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('UpdateSession', { subject: item })}
                        >

                            <Text style={styles.text}>
                                {item.sessionTopic} {'\n'}
                                {item.sessionDate} {'\n'}
                                {item.sessionTime}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddSession', { subject: subject })}
                >
                    <Text style={styles.buttonText}>Add Session</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.deleteButton}>
                <TouchableOpacity
                    onPress={() => deleteSubjectByTitle(subject.title)}
                >
                    <Text style={styles.buttonText}>Delete Subject</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    text: {
        margin: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: '#222a31ff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        width: 400
    },
    button: {
        position: 'absolute',
        bottom: 120,
        right: 5,
        width: 200,
        backgroundColor: '#007AFF',
        paddingVertical: 14,
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
        fontSize: 16,
        paddingLeft: 25
    },
})