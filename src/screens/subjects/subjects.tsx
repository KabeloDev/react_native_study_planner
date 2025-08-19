import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/route.type";
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { FlatList, ScrollView } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, 'Subjects'>;

export default function SubjectsScreen({ navigation }: Props) {
    const [subjectData, setSubjectData] = useState<any[]>([]);

    useEffect(() => {
        const fecthSubjects = async () => {
            try {
                const snapshot = await firestore().collection('subjects').get();

                const data = snapshot.docs.map(doc => ({
                    title: doc.data().title,
                    description: doc.data().description
                }));

                setSubjectData(data);
            } catch (error) {
                console.log('Error fetching subjects: ', error)
            }
        }

        fecthSubjects();
    }, []);

    return (
        <View style={styles.body}>
            <FlatList
                data={subjectData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                       onPress={() => navigation.push('SubjectDetails', { subject: item })}
                    >
                        <Text>
                            {item.title}
                        </Text>
                        <Text>
                            {item.description}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.divider}></View>
             <View style={styles.body}>
                <Text>Subjects Screen</Text>
                <TouchableOpacity
                    onPress={() => navigation.push('AddSubjects')}
                >
                    <Text style={styles.text}>Add subject</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250
    },
    text: {
        marginTop: 20
    },
    divider: {
        backgroundColor: 'grey',
        height: 1,
        width: 300
    }
})