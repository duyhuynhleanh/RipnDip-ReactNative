import React from 'react'
import { FlatList, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/UI/HeaderButton'

import ProductItem from '../components/ProductItem'

import * as cartActions from '../store/actions/cartActions'

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.productList.products)
  const dispatch = useDispatch()
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.image}
          name={itemData.item.name}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item._id,
              productTitle: itemData.item.name,
            })
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item))
          }}
        />
      )}
    />
  )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Tất cả sản phẩm',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Giỏ'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default ProductsOverviewScreen
