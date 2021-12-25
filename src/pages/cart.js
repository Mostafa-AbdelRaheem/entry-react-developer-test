import React from 'react';
import { connect } from 'react-redux';
import CartProduct from './../components/CartProduct';
import Header from '../components/Header';

class Cart extends React.Component {
    render() { 
        console.log("Cart Page",this.props)
        return (<div className='cartContainer'>
            <Header/>
            <h1>Cart</h1>
            {
                this.props.cartItems.map((cartItem,index)=>(<div key={index}><CartProduct  cartItemProps={cartItem}/></div>))
            }

        </div>
        );
    }
}

const mapStateToPtops=State=>({
    cartItems:State.cart.items
})
 
export default connect(mapStateToPtops)(Cart);