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
      
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;