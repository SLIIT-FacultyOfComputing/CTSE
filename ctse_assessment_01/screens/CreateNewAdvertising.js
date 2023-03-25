import React from 'react'
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native"
import { ref, push } from "firebase/database";
import { db } from '../config';

const CreateAd = ({navigation}) => {

    const defaultURL = "https://i0.wp.com/artvoice.com/wp-content/uploads/2018/03/blank-profile-picture-973460_960_720.png?ssl=1"

    const [textName, onChangeNameText] = React.useState("");
    const [textURL, onChangeURLText] = React.useState(defaultURL);

    async function AddAD() {
        await push(ref(db, 'advertising'), {
            company: textName,
            thumbnail: textURL
          }).then(() => {
            navigation.navigate("AdverticingCardList Home")
        }).catch((error) => {
            alert(error.message)
        });
    }

    function ButtonSave() {
        if (   textName.length == 0 
            || textURL.length == 0) {
            alert('The fields Name, Mail and Phone are required')
            return
        }
        AddAD()
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeNameText}
                value={textName}
                placeholder="Name of Company"/>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeURLText}
                placeholder="Image Url"/>
            <Pressable 
                style={styles.buttonSave}
                onPress={() => ButtonSave()}>
                <Text style={styles.textButton}>Create Add</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 30
    },
    textfield: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: "#000000",
        backgroundColor: "#e0e0e0",
        borderRadius: 5
    },
    buttonSave: {
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#1ecfea',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
});

export default CreateAd