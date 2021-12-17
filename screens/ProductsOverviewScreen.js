import React, { useState, useCallback } from 'react'
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { Container, Header, Icon, Item, Input } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import baseURL from '../assets/common/baseUrl'
import axios from 'axios'
import Toast from 'react-native-toast-message'

import ProductItem from '../components/ProductItem'

import { addToCart } from '../store/actions/cartActions'
import ProductSearch from './ProductSearch'

const ProductsOverviewScreen = (props) => {
  const [products, setProducts] = useState([])
  const [productsFiltered, setProductsFiltered] = useState([])
  const dispatch = useDispatch()
  const [focus, setFocus] = useState()
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      setFocus(false)

      axios.get(`${baseURL}products`).then((res) => {
        setProducts(res.data.products)
        setProductsFiltered(res.data.products)
        setLoading(false)
      })
      return () => {
        setProductsFiltered([])
        setFocus()
      }
    }, [])
  )

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    )
  }

  const openList = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
  }

  return (
    <>
      {loading == false ? (
        <Container>
          <Header style={{ backgroundColor: 'white' }} searchBar rounded>
            <Item>
              <Icon name='ios-search' />
              <Input
                placeholder='Search'
                onFocus={openList}
                onChangeText={(text) => searchProduct(text)}
              />
              {focus == true ? (
                <Icon onPress={onBlur} name='ios-close' />
              ) : null}
            </Item>
          </Header>

          {focus == true ? (
            <ProductSearch productsFiltered={productsFiltered} />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item._id}
              renderItem={(itemData) => (
                <ProductItem
                  image={itemData.item.image}
                  name={itemData.item.name}
                  price={itemData.item.price}
                  onViewDetail={() => {
                    props.navigation.navigate('Product Detail', {
                      item: itemData.item,
                    })
                  }}
                  onAddToCart={() => {
                    dispatch(addToCart(itemData.item)),
                      Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: `${itemData.item.name} added to Cart`,
                        text2: 'Go to your cart to complete order',
                      })
                  }}
                />
              )}
            />
          )}
        </Container>
      ) : (
        // Loading
        <Container style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
          <ActivityIndicator size='large' color='red' />
        </Container>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProductsOverviewScreen
