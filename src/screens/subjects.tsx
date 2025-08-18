import { StyleSheet, Text, View } from "react-native"

export default function SubjectsScreen () {
    return (
        <View style={styles.body}>
            <Text>Subjects Screen</Text>
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