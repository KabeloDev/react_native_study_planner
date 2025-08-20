import { StyleSheet, Text, View } from "react-native"

export default function DocumentsScreen () {
    return (
        <View style={styles.body}>
            <Text>Documents Screen</Text>
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