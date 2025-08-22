import { StyleSheet, View, TouchableOpacity, Text, FlatList, Image } from "react-native"
import { pick, types } from '@react-native-documents/picker';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import { useCallback, useState } from 'react';
import { Linking } from 'react-native';
import { LoadingComponent } from "../../components/loading";
import { useFocusEffect } from "@react-navigation/native";


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

    const useFiles = (folder: string) => {
        const [files, setFiles] = useState<FileItem[]>([]);
        const [loading, setLoading] = useState(true);

        useFocusEffect(
            useCallback(() => {
                const fetchFiles = async () => {
                    try {
                        const listResult = await storage().ref(folder).listAll();
                        const urls = await Promise.all(
                            listResult.items.map(async ref => {
                                const url = await ref.getDownloadURL();
                                return { name: ref.name, url };
                            })
                        );
                        setFiles(urls);
                    } catch (error) {
                        console.error('Failed to fetch files:', error);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchFiles();
            }, [folder])
        )

        return { files, loading };
    };


    const { files, loading } = useFiles('uploads');

    const openInBrowser = async (url: string) => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.error('Failed to open URL:', error);
        }
    };

    if (loading) {
        return (
            <LoadingComponent />
        )
    }

    return (
        <View style={styles.body}>
            {files.length === 0 ?
                <View style={styles.center}>
                    <Text>No files at the moment</Text>
                </View>
                :
                null
            }
            <FlatList
                style={styles.flatlist}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={files}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            openInBrowser(item.url);
                            console.log(item.url)
                        }}
                    >
                        <Image
                            source={require('../../images/files.png')}
                            style={styles.image}
                        />
                        <Text style={{ marginLeft: 30 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
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
        alignItems: 'center',
        padding: 10
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    flatlist: {
        marginBottom: 200,
        marginTop: 50
    },
    image: {
        height: 150,
        width: 180,
        margin: 15
    }
})