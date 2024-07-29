import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import ProductDetailsModal from './ProductDetailsModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ id: product.id, product }));
  };

  const renderRating = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.rating}>{renderRating(item.rating.rate)} ({item.rating.count})</Text>
                  <Text style={styles.priceBold}>Rs. {item.price}</Text>
                  <Text style={styles.category}>Category: {item.category}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <ProductDetailsModal 
        product={selectedProduct} 
        isVisible={!!selectedProduct} 
        onClose={closeModal} 
        onAddToCart={handleAddToCart} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 70,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  rating: {
    fontSize: 20,
    color: '#FFD700',
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    marginTop: 5,
  },
  priceBold: {
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default ProductList;
