import { StyleSheet, View, Text } from "react-native";

export default function AddSubjectScreen () {
    return  (
        <View style={styles.body}>
            <Text>
                Add subject screen 
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})