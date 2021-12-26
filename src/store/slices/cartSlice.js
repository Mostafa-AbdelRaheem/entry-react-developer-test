import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index=state.items.findIndex(item=>item.productId===action.payload.productId)
      const indexAttr=state.items.findIndex(item=>item.selectedAttribute===action.payload.selectedAttribute)
      console.log("form the actions index = ",index)
      console.log("form the actions index = ",indexAttr)

      if(index===-1){
        // add new product to the cart
        state.items=[...state.items,action.payload]
      }else{
        // adding to the already existing product
        state.items[index].quantity =state.items[index].quantity+1;
      }
    },
    removeFromCart: (state, action) => {
      const index=state.items.findIndex(item=>(item.productId===action.payload.productId))
      if(index !==-1){

          if(state.items[index].quantity>1){
            state.items[index].quantity=state.items[index].quantity-1;
          }else{
            state.items=state.items.filter(item=>item.productId!==action.payload.productId)
          }
      }
      
      // else{
      //   console.warn("Can not remove unexisting item!!")
      // }
      
      // we didn't use the code below fliter because if there is more than 1 quantity from an item it will remove it all
      // state.items=state.items.filter(item=>item.id!==action.payload.id)
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total,item)=>total+item.price,0);

export default cartSlice.reducer;