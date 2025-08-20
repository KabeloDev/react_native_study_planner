import { StyleSheet, Button, View } from "react-native"
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
            <Button title="Upload" onPress={() => pickAndUploadFile()} />
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