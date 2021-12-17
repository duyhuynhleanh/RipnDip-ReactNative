import React from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native'
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '../store/actions/cartActions'
import { SwipeListView } from 'react-native-swipe-list-view'
import CartItem from '../components/CartItem'
import Toast from 'react-native-toast-message'
import EasyButton from '../components/EasyButton'

var { height, width } = Dimensions.get('window')

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cartTotalAmount = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2)

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    props.navigation.navigate('Checkout')
  }

  return (
    <>
      {cartItems.length === 0 ? (
        <Container style={styles.emptyContainer}>
          <Text>Giỏ hàng của bạn đang trống</Text>
          <Text>Hãy thêm sản phẩm vào giỏ để mua hàng</Text>
        </Container>
      ) : (
        <Container>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 24,
              paddingVertical: 8,
            }}
          >
            Giỏ hàng
          </Text>
          <SwipeListView
            data={cartItems}
            keyExtractor={(data) => data.product}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => removeFromCartHandler(data.item.product)}
                >
                  <Ionicons name='trash' size={30} color='white' />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>${cartTotalAmount}</Text>
            </Left>
            <Right>
              <EasyButton danger medium onPress={() => dispatch(clearCart())}>
                <Text style={{ color: 'white' }}>Clear</Text>
              </EasyButton>
            </Right>
            <Right>
              {userInfo ? (
                <EasyButton primary medium onPress={checkoutHandler}>
                  <Text style={{ color: 'white' }}>Checkout</Text>
                </EasyButton>
              ) : (
                <EasyButton
                  secondary
                  medium
                  onPress={() => props.navigation.navigate('Login')}
                >
                  <Text style={{ color: 'white' }}>Login</Text>
                </EasyButton>
              )}
            </Right>
          </View>
        </Container>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default Cart
