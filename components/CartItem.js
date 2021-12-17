import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Left, Right, ListItem, Thumbnail, Body } from 'native-base'

const CartItem = (props) => {
  const data = props.item.item
  return (
    <ListItem style={styles.listItem} key={data.product} avatar>
      <Left>
        <Thumbnail source={{ uri: data.image }} />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text>{data.name}</Text>
        </Left>
        <Right>
          <Text>${data.price}</Text>
          <Text>*{data.qty}</Text>
        </Right>
      </Body>
    </ListItem>
  )
}

const styles = StyleSheet.create({
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

export default CartItem
