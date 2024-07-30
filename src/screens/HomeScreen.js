// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Button, ScrollView } from 'react-native';
import { Input, ListItem, Icon } from 'react-native-elements';
import FoodItem from '../components/FoodItem';

const HomeScreen = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() === '') return;
    setFoodItems([...foodItems, { id: Date.now(), name: newItem, active: true }]);
    setNewItem('');
  };

  const deleteItem = (id) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const toggleItemStatus = (id) => {
    setFoodItems(foodItems.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Add new food item"
        style={{fontFamily:'Lato-Bold'}}
        value={newItem}
        onChangeText={setNewItem}
        rightIcon={{ type: 'material', name: 'add', onPress: addItem }}
      />
      <FlatList
        data={foodItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FoodItem
            item={item}
            deleteItem={deleteItem}
            toggleItemStatus={toggleItemStatus}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;
