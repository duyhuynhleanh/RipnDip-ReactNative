class CartItem {
  //   constructor(quantity, productPrice, productName, sum) {
  //     this.quantity = quantity
  //     this.productPrice = productPrice
  //     this.productName = productName
  //     this.sum = sum
  //   }
  // }

  constructor(product, name, image, price, qty, sum) {
    this.product = product
    this.name = name
    this.image = image
    this.price = price
    this.qty = qty
    this.sum = sum
  }
}
export default CartItem
