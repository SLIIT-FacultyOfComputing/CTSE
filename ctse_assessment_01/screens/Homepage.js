import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function Homepage({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image source={require('../assets/mainlogo.png')} style={styles.logoimg} />
      </View>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Users List')}>
        <Text style={styles.cardText}>User Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Medicne Home')}>
        <Text style={styles.cardText}>Medicine Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ChannelCenters Home')}>
        <Text style={styles.cardText}>Channel Centers Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdverticingCardList Home')}>
        <Text style={styles.cardText}>Medicine Advertising Management</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoimg: {
    width:100,
    height:100
  },
  card: {
    width: '80%',
    height: 80,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
