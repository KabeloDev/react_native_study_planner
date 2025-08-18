import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/route.type";

type Props = NativeStackScreenProps<RootStackParamList, 'Subjects'>;

export default function SubjectsScreen ({ navigation }: Props) {
    return (
        <View style={styles.body}>
            <Text>Subjects Screen</Text>
            <TouchableOpacity
                onPress={() => navigation.push('SubjectDetails')}
            >
                <Text style={styles.text}>View Details</Text>
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
    text: {
        marginTop: 20
    }
})