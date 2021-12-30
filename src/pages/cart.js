import React from 'react';
import { connect } from 'react-redux';
import CartProduct from './../components/CartProduct';
import '../styles/cartProduct.css'

class Cart extends React.Component {
    
    render() { 
        return (
        <div className='cartContainer'>
            <h1 className='cartHeader'>Cart</h1>
            {this.props.cartItems.length===0?<div  className='imageContainer'><img src='/images/empty-bag.png'/></div>:
                this.props.cartItems.map((cartItem,index)=>(<CartProduct key={index} cartItemProps={cartItem}/>))
            }

        </div>
        );
    }
}

const mapStateToPtops=State=>({
    cartItems:State.cart.items
})
 
export default connect(mapStateToPtops)(Cart);