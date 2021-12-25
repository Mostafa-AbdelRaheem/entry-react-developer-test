import React from 'react';
import { connect } from 'react-redux';
import '../styles/cartProduct.css'


class CartProduct extends React.Component {
    render() { 
        console.log("CartProduct Comp.",this.props)
        const {currencyState}=this.props
        const {attributes,brand,description,gallery,name,prices,id,selectedAttribute,quantity}=this.props.cartItemProps
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
                        <ul className='sizeList'>
                            {attributes[0].items.map((item)=>(<li className={`${selectedAttribute===item.id?'sizeListItem selected':'sizeListItem'}`} key={item.id}>{item.value}</li>))}
                        </ul>
                    </div>

                    </div>
                    {/* RightSide */}
                    <div className='visualContainer'>
                        <div className='counterContainer'>
                            <button className='counterBtn'>+</button>
                            <p className='quantity'>{quantity}</p>
                            <button className='counterBtn'>-</button>
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
// const mapStateToPtops=State=>({
//     return({

//         currencyState:State.currency.currencyState
//     })
// }
// )
 
export default connect(mapStateToPtops)(CartProduct);