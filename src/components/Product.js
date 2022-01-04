import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import '../styles/product.css'

class Product extends React.Component {
    
    toProduct=(categoryid)=>{
        this.props.history.push(`/product/${categoryid}`);
    }

    render() { 
        const {currencyState}=this.props;
        const { gallery,inStock,brand,name,prices,id}=this.props.product;
        return (
        <div >
            <div className='imageContainer'>
                <img src={gallery[0]} alt='' />
            </div>
            <div className='shoppingCartImageContainer'>
                <img src='/images/product-shopping-cart.png' alt='product-shopping-cart' onClick={()=>this.toProduct(id)} className='faShoppingCart' />
            </div>
            <div className='prductInfo'>
                    <p className='productName'>{name}</p>
                    <p className='productbrand'>{brand}</p>
                    <p className='price'><span>{prices[currencyState].currency.symbol}</span>{prices[currencyState].amount}</p>
            </div>
            {!inStock&&<div className='overlay'>
                <p className='outOfStockText'>OUT OF STOCK</p>
            </div>}
        </div>
        );
    }
}
 
const mapStateToPtops=State=>({
    currencyState:State.currency.currencyState
})


export default withRouter(connect(mapStateToPtops)(Product));