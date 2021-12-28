import React from 'react';
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import '../styles/product.css'

class Product extends React.Component {
    
    toProduct=(categoryid)=>{
        this.props.history.push(`/product/${categoryid}`);
    }

    render() { 
        // console.log("Product props",this.props)
        const {currencyState}=this.props;
      const { gallery,inStock,name,prices,id}=this.props.product;
        return (
        <div >
            <div className='imageContainer'>
                <img src={gallery[0]} alt='' />
            </div>
            <div className='shoppingCartImageContainer'>
                <img src='/images/product-shopping-cart.png' onClick={()=>this.toProduct(id)} className='faShoppingCart' />
            </div>
            <div className='prductInfo'>
                    <p className='productName'>{name}</p>
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