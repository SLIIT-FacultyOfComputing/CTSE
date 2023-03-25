import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, TextInput } from 'react-native';
import CardList from '../components/CardList';
import { ref, push, onValue } from "firebase/database";
import { db } from '../config';
const MyScreen = () => {
 const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleCardPress = (item) => {
    // Do something when a card is pressed
  };

  const handleAddMedicine = () => {
    setShowModal(true);
  };

  const handleModalSubmit = async() => {
    await push(ref(db, 'medicines'), {
      name,
      price,
      quantity,
      imageUrl
    }).then(() => {
      setShowModal(false);
  }).catch((error) => {
      alert(error.message)
  });
  };

  useEffect(() => {
    const usersRef = ref(db, "medicines");

    onValue(usersRef, (snapshot) => {
        const medicines = [];
        snapshot.forEach((childSnapshot) => {
            const medicine = {
                id: childSnapshot.key,
                ...childSnapshot.val(),
            };
            medicines.push(medicine);
        });
        setData(medicines);
    });
}, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Medicine</Text>
        <TouchableOpacity style={styles.addItemButton} onPress={handleAddMedicine}>
          <Text style={styles.addItemButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <CardList data={data} onCardPress={handleCardPress} />
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={(text) => setPrice(text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Quantity"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Image URL"
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleModalSubmit}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    addItemButton: {
      backgroundColor: 'blue',
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
    },
    addItemButtonText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      marginBottom: 20,
      width: '80%',
    },
    addButton: {
      backgroundColor: 'blue',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 10,
    },
    addButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: 'gray',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 10,
    },
    cancelButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  };
  
export default MyScreen;
