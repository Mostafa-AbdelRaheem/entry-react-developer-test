import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

class Product extends React.Component {
    render() { 
        // console.log("Product props",this.props)
      const { gallery,inStock,name,prices}=this.props.product;
        return (
        <div >
            <div className='imageContainer'>
                <img src={gallery[0]} alt='' />
            </div>
            <div className='shoppingCartImageContainer'>
                <FontAwesomeIcon className='faShoppingCart' icon={faShoppingCart} size="lg"/>
            </div>
            <div className='prductInfo'>
                    <p className='productName'>{name}</p>
                    <p className='price'><span>{prices[0].currency.symbol}</span>{prices[0].amount}</p>
            </div>
            {!inStock&&<div className='overlay'>
                <p className='outOfStockText'>OUT OF STOCK</p>
            </div>}
        </div>
        );
    }
}
 
export default Product;