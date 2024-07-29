import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity, removeFromCart } from '../store/cartSlice';

const ProductDetailsModal = ({ product, isVisible, onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const [localQuantity, setLocalQuantity] = useState(0);

  const cartItem = cart.find(item => item.id === product?.id);

  useEffect(() => {
    if (cartItem) {
      setLocalQuantity(cartItem.quantity);
    } else {
      setLocalQuantity(0);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    if (localQuantity > 0) {
      dispatch(addToCart({ id: product.id, product }));
      setLocalQuantity(0); // Reset local quantity after adding to cart
    }
  };

  const handleIncrement = () => {
    if (cartItem) {
      dispatch(incrementQuantity({ id: product.id }));
    } else {
      dispatch(addToCart({ id: product.id, product }));
    }
  };

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 0) {
      dispatch(decrementQuantity({ id: product.id }));
    }
  };

  const handleRemoveFromCart = () => {
    if (cartItem && cartItem.quantity > 0) {
      dispatch(decrementQuantity({ id: product.id }));
    }
  };

  if (!product) return null;

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{cartItem ? cartItem.quantity : localQuantity}</Text>
          <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
            <Text style={styles.buttonText}>Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemoveFromCart} style={styles.removeButton}>
            <Text style={styles.buttonText}>Remove From Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 150,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProductDetailsModal;
