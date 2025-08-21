import { StyleSheet, Button, View, TouchableOpacity, Text } from "react-native"
import { pick, types } from '@react-native-documents/picker';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

export default function DocumentsScreen() {
    const pickAndUploadFile = async () => {
        try {
            const res = await pick({ type: [types.allFiles], allowMultiSelection: false });
            const file = res[0];

            const destPath = `${RNFS.CachesDirectoryPath}/${file.name}`;
            await RNFS.copyFile(file.uri, destPath);

            const reference = storage().ref(`uploads/${file.name}`);
            await reference.putFile(destPath);

            const downloadURL = await reference.getDownloadURL();
            console.log('File available at:', downloadURL);
        } catch (err: any) {
            if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
                console.log('User cancelled the picker');
            } else {
                console.error('Upload failed:', err);
            }
        }
    };

    return (
        <View style={styles.body}>
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => pickAndUploadFile()}
                >
                    <Text style={styles.buttonText}>Upload File</Text>
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
        bottom: 120,
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 60
    },
})