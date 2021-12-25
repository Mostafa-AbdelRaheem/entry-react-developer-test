import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items=[...state.items,action.payload]
    },
    removeFromCart: (state, action) => {
      const index=state.items.findIndex(item=>item.id===action.payload.id)
      let newCart=[...state.items];
      if(index>=0){
        newCart.splice(index,1)
      }else{
        console.warn("Can not remove unexisting item!!")
      }
      state.items = newCart;
      
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