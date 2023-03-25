import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import {  ref, child, push, update, remove, onValue } from "firebase/database";
import { db } from '../config';

const CardItem = ({ item, onEdit, onDelete }) => {
    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to Delete this AD? This action cannot be undone!",
          [
            {
              text: "Yes",
              onPress: () => {
                  DeleteAD(item)
              },
            },
            {
              text: "No",
            },
          ]
        );
    };
    //Delete Advertisment
    async function DeleteAD(item) {
      console.log(item);
      const dbRef = ref(db, 'advertising/' + item.id);
      await remove(dbRef)
        .then(() => {
          
          alert("Deleted advertis Successfully!");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.company}>{item.company}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => {showConfirmDialog()}}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
//
const AdverticingCardList = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleADEdit = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
  };
//Update AD
  const handleUpdateAD = async() => {
    const dbRef = ref(db, 'advertising/' + selectedItem.id);
    await update(dbRef, {
        company: selectedItem.company,
        thumbnail: selectedItem.thumbnail
    }).then(() => {
        setModalVisible(false)
    }).catch((error) => {
      alert(error.message);
    });
  };
  //Get All AD
  useEffect(() => {
    const adRef = ref(db, "advertising");

    onValue(adRef, (snapshot) => {
        const ADs = [];
        snapshot.forEach((childSnapshot) => {
            const AD = {
                id: childSnapshot.key,
                ...childSnapshot.val(),
            };
            ADs.push(AD);
        });
        setItems(ADs);
    });
}, []);
  return (
    <View style={styles.container}>
              <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateAd')}>
        <Text style={styles.buttonText}>Add New AD</Text>
      </TouchableOpacity>
      {items.map((item) => (
        <CardItem
          key={item.id}
          item={item}
          onEdit={() => handleADEdit(item)}
          onDelete={() => handleDelete(item.id)}
        />
      ))}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit AD</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Company Name"
            value={selectedItem?.company}
            onChangeText={(text) =>
              setSelectedItem({ ...selectedItem, company: text })
            }
          />
                    <TextInput
            style={styles.textInput}
            placeholder="Image URL"
            value={selectedItem?.thumbnail}
            onChangeText={(text) =>
              setSelectedItem({ ...selectedItem, thumbnail: text })
            }
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleUpdateAD}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton} onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
//styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
    thumbnail: {
      width: 80,
      height: 80,
      borderRadius: 5,
      marginRight: 10,
    },
    details: {
      flex: 1,
      justifyContent: 'space-between',
    },
    company: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    buttons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editButton: {
      backgroundColor: '#2980b9',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginRight: 10,
    },
    deleteButton: {
      backgroundColor: '#e74c3c',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalContent: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },
    saveButton: {
      backgroundColor: '#2ecc71',
      paddingVertical: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    cancelButton: {
      backgroundColor: '#c0392b',
      paddingVertical: 10,
      borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
  });
  

export default AdverticingCardList;
