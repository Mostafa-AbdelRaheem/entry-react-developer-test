import React from 'react';
import { connect } from 'react-redux';
import { addToCart,removeFromCart } from '../store/slices/cartSlice';
import '../styles/cartProduct.css'
import Attributes from '../components/Attributes'

class CartProduct extends React.Component {

    handleAddToCart=(productProps)=>{

            const dispatch = this.props.dispatch;
            // const {id,selectedAttribute}=this.props.cartItemProps;
            const {id,name,description,prices,attributes,gallery,brand,selectedAttribute,productId}=productProps;
            dispatch(addToCart({quantity:1,id,name,description,prices,attributes,gallery,brand,selectedAttribute,productId}))
            // console.log("Handle add to cart",productProps);
            // console.log("Handle add to cart name ",selectedAttribute);
    }
    
    handleRemoveFromCart=(productProps)=>{
        const dispatch = this.props.dispatch;
        const {id,selectedAttribute,productId}=productProps;
        dispatch(removeFromCart({id,selectedAttribute,productId}))
    }
    // displayAttributes=(attributes,attribute1,attribute2)=>{
    //     // for (let items of attributes){
    //         return(
    //         <ul className='sizeList'>    
    //         {attributes.items.map((attribute)=>(
    //         <li className={`${((attribute.id === attribute1)||(attribute.id===attribute2))?'sizeListItem selected':'sizeListItem'}`}   
    //             key={attribute.id}>{attribute.displayValue}
    //         </li>))}
    //     </ul>)
    //     // }
    // }

    render() { 
        console.log("CartProduct Comp.",this.props)
        const {currencyState}=this.props
        const {attributes,brand,description,gallery,name,prices,id,attribute1,attribute2,quantity}=this.props.cartItemProps
        return (
            <div className='cartProductContainer'>
                {/* leftSide */}
                <div className='infoContainer'>
                    <div className='brandName'>
                        <h3>{brand}</h3>
                        <p>{name}</p>
                    </div>
                    <div className='priceContainer'>
                        <p className='price'><span className='symbol'>{prices[currencyState].currency.symbol}</span>{prices[currencyState].amount}</p>
                    </div>
                    <div className='sizeContainer'>
                        {/* <ul className='sizeList'> */}
                            {/* {attributes.map((attribute)=>(this.displayAttributes(attribute,attribute1,attribute2)))} */}
                            {/* {attributes[0].items.map((item)=>(<li className={`${selectedAttribute===item.id?'sizeListItem selected':'sizeListItem'}`} key={item.id}>{item.value}</li>))} */}
                            {/* {this.displayAttributes(attributes,attribute1,attribute2)} */}
                            {attributes.length!==0?
                            attributes.map((attribute,index)=>(
                                <Attributes  
                                key={index}
                                attribute1={attribute1}
                                attribute2={attribute2}
                                attribute={attribute.items}/>))
                            :""}
                        {/* </ul> */}
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
                            <img src={gallery[0]}/>
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