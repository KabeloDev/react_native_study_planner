import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "../../../types/route.type";

type Props = { route: RouteProp<RootStackParamList, 'UpdateSession'> };

export default function UpdateSessionScreen({ route }: Props) {
    const { subject } = route.params;

    return (
        <View style={styles.body}>
            <Text>Update Session Screen</Text>
            <Text>{subject.sessionSubject}</Text>

            <View style={styles.button}>
                <TouchableOpacity
                // onPress={}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.deleteButton}>
                <TouchableOpacity
                // onPress={}
                >
                    <Text style={styles.buttonText}>Delete</Text>
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
        bottom: 180,
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
    deleteButton: {
        position: 'absolute',
        bottom: 120,
        right: 90,
        width: 250,
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
        paddingLeft: 85
    },
})