import React,{ createRef } from 'react';
import CartProduct from './CartProduct';
import { withRouter } from 'react-router-dom';
import '../styles/myBag.css'
import { connect } from 'react-redux';

class MyBag extends React.Component {
    wrapperRef = createRef();
    componentDidMount() {
        document
          .addEventListener('mousedown', this.handleClickOutside);
      }
    
      componentWillUnmount(){
        document
          .removeEventListener('mousedown', this.handleClickOutside);
      }
      handleClickOutside = (event) => {
        if (this.wrapperRef.current &&!this.wrapperRef.current.contains(event.target)) {
            this.props.onOutsideClick();
          }
      }

    handleToCartPage=()=>{
        this.props.history.push(`/cart`);
        this.props.onOutsideClick();
    }
    displayCart=()=>{
        if(this.props.cartItems.length){
            return (<div className='productContainer'>
                {this.props.cartItems.map((cartItem,index)=>(<CartProduct key={index}  cartItemProps={cartItem}/>))}
            </div>        
            )
        }else{
            return(
            <div className='imageContainer'>
                <img src='/images/empty-bag.png'/>
            </div>)
        }
    }

    handleTotalCost=()=>{
        if(this.props.cartItems.length){
            const currencyState =this.props.currencyState
            const cartItems=this.props.cartItems
            const costList = cartItems.map((item)=>(item.prices[currencyState].amount*item.quantity))
            const total = costList.reduce((prev, next) => prev+ next)
            return <p><span>{cartItems[0].prices[currencyState].currency.symbol}</span>{total.toFixed(2)}</p>
        }else{
            return<p>{0}</p>
        }
    }
    render() { 
        // console.log("MyBag",this.props)
        return (
        <div ref={this.wrapperRef} className='myBagContainer'>
            <h3 className='myBagHeader'>My Bag, <span className='myBagItemHeader'>{this.props.cartItems.length}{" "}items</span></h3>
            <div className='productsListContainer'>
            {this.displayCart()}
            </div>
            <div className='totalCost'>
                <p>Total</p>
                {this.handleTotalCost()}
            </div>
            {/* <CartProduct/> */}
            <div className='buttonsContainer'>
                <button onClick={this.handleToCartPage} className='viewBagBtn'>VIEW BAG</button>
                <button className='checkOutBtn'>CHECK OUT</button>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state){
    return{
        cartItems:state.cart.items,
        currencyState:state.currency.currencyState,
    }
    }
 
export default withRouter(connect(mapStateToProps)(MyBag));