import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';
import { ref, push, onValue, update, remove } from "firebase/database";
import { db } from '../config';

export default function App() {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditModalVisible, setisEditModalVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [editRecord, setEditRecord] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const handleEdit = async (record) => {
    setEditRecord(record);
    setisEditModalVisible(true);
  };

  const getData = async () => {
    const usersRef = ref(db, "channel");

    onValue(usersRef, (snapshot) => {
        const users = [];
        snapshot.forEach((childSnapshot) => {
            const user = {
                id: childSnapshot.key,
                ...childSnapshot.val(),
            };
            users.push(user);
        });
        setData(users);
        // console.log(users)
    });
    
  };
  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to Delete this Chanell center? This action cannot be undone!",
      [
        {
          text: "Yes",
          onPress: () => {
            handleDelete(id)
          },
        },
        {
          text: "No",
        },
      ]
    );
};
  const handleDelete = async (id) => {
    const dbRef = ref(db, 'channel/' + id);
    await remove(dbRef)
      .then(() => {
        alert("Deleted User Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleAdd = async () => {
    await push(ref(db, 'channel'), {
        location,
        name
      }).then(() => {
        setModalVisible(false)
        setLocation('')
        setName('')
    }).catch((error) => {
        alert(error.message)
    });
  };

  const handleUpdateChannel = async () =>{
    const dbRef = ref(db, 'channel/' + editRecord.id);
    await update(dbRef, {
        location: editRecord.location,
        name: editRecord.name,
    }).then(() => {
        setisEditModalVisible(false)
        setEditRecord(null)
    }).catch((error) => {
      alert(error.message);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Location</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {data.map((record) => (
          <DataTable.Row key={record.id}>
            <DataTable.Cell>{record.location}</DataTable.Cell>
            <DataTable.Cell>{record.name}</DataTable.Cell>
            <DataTable.Cell>
              <TouchableOpacity style={styles.deleteButton} onPress={() => showConfirmDialog(record.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(record)}>
                <Text style={styles.deleteButtonText}>Edit</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Add Location</Text>

          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={isEditModalVisible} animationType="slide">
  <View style={styles.modal}>
    <Text style={styles.modalTitle}>
      {editRecord ? 'Edit Location' : 'Add Location'}
    </Text>

    <TextInput
      style={styles.input}
      placeholder="Location"
      value={editRecord ? editRecord.location : location}
      onChangeText={(text) =>
        editRecord
          ? setEditRecord({ ...editRecord, location: text })
          : setLocation(text)
      }
    />
        <TextInput
      style={styles.input}
      placeholder="name"
      value={editRecord ? editRecord.name : location}
      onChangeText={(text) =>
        editRecord
          ? setEditRecord({ ...editRecord, name: text })
          : setName(text)
      }
    />
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateChannel} >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton} onPress={() => setisEditModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
    </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20,
    },
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 10,
    },
    addButton: {
      backgroundColor: '#2196F3',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    deleteButton: {
      backgroundColor: '#F44336',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 3,
    },
    editButton: {
        backgroundColor: '#008000',
        paddingVertical: 5,
        marginLeft:2,
        paddingHorizontal: 10,
        borderRadius: 3,
      },
    deleteButtonText: {
      color: '#FFFFFF',
      fontSize: 12,
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      width: '100%',
    },
    cancelButton: {
      backgroundColor: '#CCCCCC',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    cancelButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
    },
    saveButton: {
        backgroundColor: '#2ecc71',
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 100,
      },
      cancelButton: {
        backgroundColor: '#c0392b',
        paddingVertical: 10,
        borderRadius: 5,
        width:100
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });
  
