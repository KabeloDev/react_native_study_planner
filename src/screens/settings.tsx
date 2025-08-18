import { StyleSheet, Text, View } from "react-native"

export default function SettingsScreen () {
    return (
        <View style={styles.body}>
            <Text>Settings Screen</Text>
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