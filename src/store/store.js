import { reactive } from 'vue'

export const store = reactive({
  drinkList: [
    { id: 1, img: 'src/assets/images/Product-1.png' , name: 'Nutriboost Apple', weight: '270Ml', price: 10000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, img: 'src/assets/images/Product-2.png' , name: 'GoodDay Avocado', weight: '270Ml', price: 10000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 3, img: 'src/assets/images/Product-3.png' , name: 'Floridina', weight: '240Ml', price: 8000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 4, img: 'src/assets/images/Product-4.png' , name: 'Cimory Blueberry', weight: '300Ml', price: 10000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 5, img: 'src/assets/images/Product-5.png' , name: 'Crystaline', weight: '350Ml', price: 10000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 6, img: 'src/assets/images/Product-6.png' , name: 'GoodDay Capp', weight: '270Ml', price: 8000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 7, img: 'src/assets/images/Product-7.png' , name: 'Orange Water', weight: '500Ml', price: 10000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 8, img: 'src/assets/images/Product-8.png' , name: 'Cimory Red Grape', weight: '300Ml', price: 8000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 9, img: 'src/assets/images/Product-9.png' , name: 'ABC Choco Malt', weight: '270Ml', price: 10000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 10, img: 'src/assets/images/Product-10.png' , name: 'Nutriboost Straw..', weight: '270Ml', price: 8000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 11, img: 'src/assets/images/Product-11.png' , name: 'Nutriboost Coffee', weight: '270Ml', price: 8000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 12, img: 'src/assets/images/Product-12.png' , name: 'Frestea Apple', weight: '300Ml', price: 10000, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  ],
  cart: [],

  getTotalPrice(){
    const sum = this.cart.reduce((prev, curr) => {
        return prev + (curr.price * curr.amount)
    }, 0)

    return this.parseRupiah(sum)
  },
  parseRupiah(value){
    return 'Rp ' + value.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  },

  incrementCartAmount(index){
    this.cart[index].amount++
  },
  decrementCartAmount(index){
    if(this.cart[index].amount > 1){
        this.cart[index].amount--
    }else{
        this.cart.splice(index, 1)
    }
  },
  resetCart(){
    this.cart = []
  },

  addToCart(drink){
    let index  = this.cart.findIndex(el => el.drinkId === drink.id)

    if(index !== -1){
        this.cart[index].amount++
    } else{
        this.cart.push({
            drinkId: drink.id,
            img: drink.img,
            name: drink.name,
            price: drink.price,
            weight: drink.weight,
            desc: drink.desc,
            amount: 1,
        })
    }
  },
  updateCart(drink,amount){
    let index  = this.cart.findIndex(el => el.drinkId === drink.id)

    if(index !== -1){
        this.cart[index].amount = amount
    } else{
        this.cart.push({
            drinkId: drink.id,
            img: drink.img,
            name: drink.name,
            price: drink.price,
            weight: drink.weight,
            desc: drink.desc,
            amount: amount,
        })
    }
  }

//   updateMultipleItem(selectedItem,status) {
//     this.feeTypeList = this.feeTypeList.map(item => {
//         let found = selectedItem.find(({code}) => code === item.code)
//         item.status = found ? status : item.status

//         return item
//     })
//   },
//   deleteMultipleItem(selectedItem) {
//     this.feeTypeList = this.feeTypeList.filter(item => !selectedItem.some(selItem => selItem.code === item.code))
//   },
//   createItem(item) {
//     this.feeTypeList.push({
//         code: parseInt(item.code),
//         name: item.name,
//         description: item.description,
//         status: item.status,
//     })
//   },
//   updateItem(item) {
//     this.feeTypeList.forEach(el => {
//         if(el.code === parseInt(item.code)){
//             el.code = item.code
//             el.name = item.name
//             el.description = item.description
//         }
//     })
//   },
//   deleteItem(index) {
//     this.feeTypeList.splice(index,1)
//   },
})