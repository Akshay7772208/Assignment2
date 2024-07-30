// components/FoodItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FoodItem = ({ item, deleteItem, toggleItemStatus }) => {
  return (
    <View style={[styles.itemContainer, { backgroundColor: item.active ? '#fff' : '#f8d7da' }]}>
      <Text style={styles.itemText}>{item.name}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => toggleItemStatus(item.id)}>
          <Icon name={item.active ? 'visibility' : 'visibility-off'} size={26} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <Icon name="delete" size={26} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
    fontFamily:'Lato-Bold'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FoodItem;
