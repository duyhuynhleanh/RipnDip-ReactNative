import React from 'react'
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../constants/Colors'
import * as cartActions from '../store/actions/cartActions'
import Toast from 'react-native-toast-message'

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam('productId')
  const productDetails = useSelector((state) =>
    state.productList.products.find((prod) => prod._id === productId)
  )
  const dispatch = useDispatch()
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: productDetails.image }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title='Thêm vào giỏ'
          onPress={() => {
            dispatch(cartActions.addToCart(productDetails)),
              Toast.show({
                topOffset: 60,
                type: 'success',
                text1: `${name} added to Cart`,
                text2: 'Go to your cart to complete order',
              })
          }}
        />
      </View>
      <Text style={styles.price}>${productDetails.price.toFixed(2)}</Text>
      <View style={styles.category_brand}>
        <Text style={styles.description}>
          Loại hàng:{productDetails.category}
        </Text>
        <Text style={styles.description}>Nhãn hiệu:{productDetails.brand}</Text>
      </View>
      <Text style={styles.description}>{productDetails.description}</Text>
    </ScrollView>
  )
}

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  }
}

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  category_brand: {
    fontSize: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
})

export default ProductDetailScreen
