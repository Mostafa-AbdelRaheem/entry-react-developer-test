import React from 'react';
import { connect } from 'react-redux';
import { addToCart,removeFromCart } from '../store/slices/cartSlice';
import Attributes from '../components/Attributes'
import '../styles/cartProduct.css'

class CartProduct extends React.Component {

    handleAddToCart=(productProps)=>{
        const dispatch = this.props.dispatch;
        const {id,name,description,prices,attributes,gallery,brand,selectedAttribute,productId}=productProps;
        dispatch(addToCart({quantity:1,id,name,description,prices,attributes,gallery,brand,selectedAttribute,productId}))
    }
    
    handleRemoveFromCart=(productProps)=>{
        const dispatch = this.props.dispatch;
        const {id,selectedAttribute,productId}=productProps;
        dispatch(removeFromCart({id,selectedAttribute,productId}))
    }

    render() { 
        const {currencyState}=this.props
        const {attributes,brand,gallery,name,prices,attribute1,attribute2,quantity}=this.props.cartItemProps
        return (
            <div className='cartProductContainer'>
                {/* leftSide */}
                <div className='infoContainer'>
                    <div className='brandName'>
                        <h3 className='brandNameHeader'>{brand}</h3>
                        <p className='brandNameText'>{name}</p>
                    </div>
                    <div className='priceContainer'>
                        <p className='price'><span className='symbol'>{prices[currencyState].currency.symbol}</span>{prices[currencyState].amount}</p>
                    </div>
                    <div className='sizeContainer'>
                        {attributes.length!==0?
                        attributes.map((attribute,index)=>(
                            <Attributes  
                            key={index}
                            attribute1={attribute1}
                            attribute2={attribute2}
                            attribute={attribute.items}/>))
                        :""}
                    </div>
                    </div>
                    {/* RightSide */}
                    <div className='visualContainer'>
                        <div className='counterContainer'>
                            <button onClick={()=>{this.handleAddToCart(this.props.cartItemProps)}}className='counterBtn'>+</button>
                            <p className='quantity'>{quantity}</p>
                            <button onClick={()=>{this.handleRemoveFromCart(this.props.cartItemProps)}} className='counterBtn'>-</button>
                        </div>
                        <div className='mainImageContainer'>
                            <img src={gallery[0]} alt='gallery'/>
                        </div>
                    </div>
            </div>
        );
    }
}
function mapStateToPtops(state){
    return{
        currencyState:state.currency.currencyState
    }
}
 
export default connect(mapStateToPtops)(CartProduct);