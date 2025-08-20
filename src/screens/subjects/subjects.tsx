import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/route.type";
import { useCallback, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { LoadingComponent } from "../../components/loading";

type Props = NativeStackScreenProps<RootStackParamList, 'Subjects'>;

export default function SubjectsScreen({ navigation }: Props) {
    const [subjectData, setSubjectData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const fecthSubjects = async () => {
                setLoading(true);
                try {
                    const snapshot = await firestore().collection('subjects').get();

                    const data = snapshot.docs.map(doc => ({
                        title: doc.data().title,
                    }));

                    setSubjectData(data);
                    setLoading(false);
                } catch (error) {
                    console.log('Error fetching subjects: ', error);
                    Alert.alert('Something went wrong. Please try again.');
                }
            }

            fecthSubjects();
        }, [])
    );

    if (loading) {
        return (
            <LoadingComponent />
        )
    }


    return (
        <View style={styles.body}>
            {subjectData.length === 0 ?
                <View style={{ flex: 1 }}>
                    <View>
                        <Text style={styles.message}>No subjects at the moment.</Text>
                        <Text style={styles.message}>Add subjects and start planning your studies.</Text>
                        <Image
                            source={require('../../images/add_subject.png')}
                            style={styles.image}
                        />
                    </View>
                </View>
                :
                null
            }
            <View>
                <FlatList
                    data={subjectData}
                    numColumns={3}
                    contentContainerStyle={{ padding: 8 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.push('SubjectDetails', { subject: item })}
                        >

                            <Text style={styles.text}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => navigation.push('AddSubjects')}
                >
                    <Text style={styles.buttonText}>Add subject</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        padding: 10
    },
    text: {
        margin: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: '#222a31ff',
        borderRadius: 10,
        padding: 20
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
        paddingLeft: 60
    },
    image: {
        width: 500,
        height: 200,
        resizeMode: 'contain',
        top: 300
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        color: '#242424ff',
        top: 250,
        marginBottom: 10,
        fontStyle: 'italic'
    },
})