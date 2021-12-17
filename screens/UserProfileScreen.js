import React, { useEffect } from 'react'
import {
  Text,
  ScrollView,
  StyleSheet,
  Button,
  View,
  FlatList,
} from 'react-native'
import { Container } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, logout } from '../store/actions/userActions'
import { listMyOrders } from '../store/actions/orderActions'
import OrderCard from '../components/OrderCard'
import EasyButton from '../components/EasyButton'

const UserProfileScreen = (props) => {
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (!userInfo) {
      props.navigation.navigate('Login')
    } else {
      if (!user || !user.name) {
        //dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        // setName(user.name)
        // setEmail(user.email)
      }
    }
  }, [dispatch, userInfo, user])

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>{user ? user.name : ''}</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>Email: {user ? user.email : ''}</Text>
        </View>
        <View style={{ marginTop: 60 }}>
          <EasyButton danger medium onPress={logoutHandler}>
            <Text style={{ color: 'white' }}>Đăng xuất</Text>
          </EasyButton>
        </View>
        <View style={styles.order}>
          <Text style={{ fontSize: 20 }}>Đơn hàng của tôi</Text>
        </View>
        {orders ? (
          orders.map((x) => {
            return <OrderCard key={x._id} {...x} />
          })
        ) : (
          // <FlatList
          //   data={orders}
          //   keyExtractor={(item) => item._id}
          //   renderItem={(itemData) => <OrderCard {...itemData.item} />}
          // />
          <View style={styles.order}>
            <Text>Bạn chưa có đơn hàng</Text>
          </View>
        )}
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
})

export default UserProfileScreen
