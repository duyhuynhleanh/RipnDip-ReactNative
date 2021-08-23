import React from 'react'
import { FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

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

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'Tất cả sản phẩm',
}

export default ProductsOverviewScreen
