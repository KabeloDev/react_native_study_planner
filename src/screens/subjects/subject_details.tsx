import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native"
import { RootStackParamList } from "../../types/route.type";

type Props = {
  route: RouteProp<RootStackParamList, 'SubjectDetails'>;
};

export default function SubjectDetailsScreen ({ route }: Props) {
    const { subject } = route.params;

    return (
        <View style={styles.body}>
            <Text style={styles.text}>Subject Details Screen</Text>
            <Text>{subject.title}</Text>
            <Text>{subject.description}</Text>
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
        marginBottom: 10
    }
})