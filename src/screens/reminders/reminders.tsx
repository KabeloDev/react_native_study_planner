import { StyleSheet, Text, View } from "react-native"

export default function RemindersScreen () {
    return (
        <View style={styles.body}>
            <Text>Reminders Screen</Text>
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