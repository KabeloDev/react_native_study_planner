import { StyleSheet, Text, View } from "react-native"

export default function SubjectDetailsScreen () {
    return (
        <View style={styles.body}>
            <Text>Subject Details Screen</Text>
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