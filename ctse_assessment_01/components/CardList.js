import React, { useState } from 'react';
import { StyleSheet, View, Alert, Text, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { ref, child, push, update, remove } from "firebase/database";
import { db } from '../config';
//
const CardItem = ({ item, onPress, onEditPress, selectedItem }) => {
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to Delete this Medicine? This action cannot be undone!",
      [
        {
          text: "Yes",
          onPress: () => {
            DeleteMedicine(item)
          },
        },
        {
          text: "No",
        },
      ]
    );
  };
  //Delete medicine
  async function DeleteMedicine(item) {
    console.log(item);
    const dbRef = ref(db, 'medicines/' + item.id);
    await remove(dbRef)
      .then(() => {

        alert("Deleted Medicine Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  //
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardItemContainer}>
      <View style={styles.cardItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.cardItemImage} />
        <View style={styles.cardItemDetails}>
          <Text style={styles.cardItemName}>{item.name}</Text>
          <Text style={styles.cardItemPrice}>Price: ${item.price}</Text>
          <Text style={styles.cardItemQty}>Qty: {item.quantity}</Text>
        </View>
        <TouchableOpacity onPress={onEditPress} style={styles.editIconContainer}>
          <Image source={require('../assets/edit.png')} style={styles.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { showConfirmDialog() }} style={styles.deleteIconContainer}>
          <Image source={require('../assets/bin.png')} style={styles.editIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
//
const CardList = ({ data, onCardPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  //
  const handleEditPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  // Update the Medicine
  const handleUpdateMedicine = async () => {
    const dbRef = ref(db, 'medicines/' + selectedItem.id);
    await update(dbRef, {
      name: selectedItem.name,
      price: selectedItem.price,
      quantity: selectedItem.quantity,
      imageUrl: selectedItem.imageUrl
    }).then(() => {
      setModalVisible(false);
      setSelectedItem(null);
    }).catch((error) => {
      alert(error.message);
    });
  };
  //
  return (
    <View style={styles.cardList}>
      {data.map((item, index) => (
        <CardItem key={index} item={item} onPress={() => onCardPress(item)} onEditPress={() => handleEditPress(item)} selectedItem />
      ))}
      <Modal visible={modalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Medicine</Text>
          <TextInput value={selectedItem?.name} onChangeText={(text) => setSelectedItem({ ...selectedItem, name: text })} placeholder='Name' style={styles.modalInput} />
          <TextInput value={selectedItem?.price} onChangeText={(text) => setSelectedItem({ ...selectedItem, price: text })} placeholder='Price' style={styles.modalInput} />
          <TextInput value={selectedItem?.quantity} onChangeText={(text) => setSelectedItem({ ...selectedItem, qty: text })} placeholder='Qty' style={styles.modalInput} />
          <TextInput value={selectedItem?.imageUrl} onChangeText={(text) => setSelectedItem({ ...selectedItem, image: text })} placeholder='Image URL' style={styles.modalInput} />
          <TouchableOpacity onPress={handleUpdateMedicine} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}; export const styles = {
  cardList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardItemContainer: {
    marginBottom: 10,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  cardItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  cardItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cardItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardItemPrice: {
    fontSize: 16,
    color: '#999',
    marginBottom: 5,
  },
  cardItemQty: {
    fontSize: 16,
    color: '#999',
  },
  editFormContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  editForm: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  editFormItem: {
    marginBottom: 10,
  },
  editFormItemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editFormItemInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
  editFormButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editFormButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#007aff',
  },
  editFormButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  editFormError: {
    color: 'red',
    fontSize: 16,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  editIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  deleteIconContainer: {
    top: 20,
    right: 10,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
};
//
export default CardList