import React from 'react';
import CartProduct from './CartProduct';
import { withRouter } from 'react-router-dom';
import '../styles/myBag.css'

class MyBag extends React.Component {
    handleToCartPage=()=>{
        this.props.history.push(`/cart`);
    }
    render() { 
        console.log("MyBag",this.props)
        return (
        <div className='myBagContainer'>
            <h1>My Bag</h1>
            {/* <CartProduct/> */}
            <div className='buttonsContainer'>
                <button onClick={this.handleToCartPage} className='viewBagBtn'>VIEW BAG</button>
                <button className='checkOutBtn'>CHECK OUT</button>
            </div>
        </div>
        );
    }
}
 
export default withRouter(MyBag);