import React from 'react';
import {withRouter} from 'react-router-dom'
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import {selectCurrency} from '../store/slices/currencySlice'
import {getCategories,getCurrency} from '../queries/queries'
import compose from 'recompose/compose';
import MyBag from './MyBag';
import '../styles/Header.css';
import Currency from './Currency';





class Header extends React.Component {
    state={
        displayCurrency:false,
        displayMyBag:false,
    }
    
    handleAllSelection=(categoryName)=>{
        this.props.history.push(`/categories/${categoryName}`)
    }

    handleClothesSelection=(categoryName)=>{
        this.props.history.push(`/categories/${categoryName}`);   
    }

    handleTechSelection=(categoryName)=>{
        this.props.history.push(`/categories/${categoryName}`);
    }

    
    handledisplayMyBag=()=>{
        this.state.displayMyBag?this.setState({displayMyBag:false}):this.setState({displayMyBag:true})
    }
    
    handleMyBagOutsideClick=()=>{
        this.setState({displayMyBag:false})
    }

    changeCurrency=()=>{
        this.state.displayCurrency?this.setState({displayCurrency:false}):this.setState({displayCurrency:true})
    }
    
    handleSelectCurrency=(currencyValue)=>{
            const {dispatch} =this.props
            dispatch(selectCurrency({currencyState:currencyValue}))
            this.setState({displayCurrency:false})
        }

    handleChangeCurrencyOutsideClick=()=>{
        this.setState({displayCurrency:false})
    }

    handleCartItem =()=>{
        if(this.props.cartItems.length){
            const {cartItems}=this.props
            const cartQuanitity = cartItems.map((item)=>(item.quantity))
            const totalCartQuanitity = cartQuanitity.reduce((prev, next) => prev+ next)
            return totalCartQuanitity
        }else{
            return 0
        }
    }
    
    render() { 
        const pathname=this.props.location.pathname
        const {currencies} = this.props.getCurrency
        const {currencyState}=this.props
        return (
        <div>
            <div className='navbarContainer'>
                <div className='LeftSideContainer'>
                    <div>
                        {
                        <ul className='categoryList'>
                            <li onClick={()=>this.handleAllSelection(this.props.getCategories.categories[0].name)} className={`navbarLink ${((pathname==="/categories/all")?true:false)&&"navbarActiveLink"}`} >All</li>
                            <li onClick={()=>this.handleClothesSelection(this.props.getCategories.categories[1].name)} className={`navbarLink ${(pathname==="/categories/clothes"?true:false)&&"navbarActiveLink"}`}>Clothes</li>
                            <li onClick={()=>this.handleTechSelection(this.props.getCategories.categories[2].name)} className={`navbarLink ${(pathname==="/categories/tech"?true:false)&&"navbarActiveLink"}`} >Tech</li>
                        </ul>
                        }
                        </div>
                </div>
                <div className='middleContainer'>
                    <img src='/images/shopping-bag.png'alt='shopping-bag '/>
                </div>
                <div className='rightSideContainer'>
                    <div onClick={this.changeCurrency} className='usdImageContainer'>
                        {currencies&&<div className='dollarSign'>{currencies[currencyState].symbol}</div>}                        
                        <div className='arrowImageContainer'>
                            <img  className={`faChevronDown ${this.state.displayCurrency&&"chevronDownActive"}`} src='/images/arrow.png' alt='arrow'/>
                        </div>
                    </div>
                    <div onClick={this.handledisplayMyBag} className='shoppingCartImageContainer'>
                        <div className='cartItemsNumber'> {this.handleCartItem()}</div>
                        <img src='/images/shopping-cart.png' alt='shopping-cart'/>
                    </div>
                </div>
                {this.state.displayCurrency&& 
                    <Currency   onOutsideClick={this.handleChangeCurrencyOutsideClick} className="currencyListContainer" onChangeCurrency={this.handleSelectCurrency} currencies={currencies}/>
                    }
                {this.state.displayMyBag&&
                <div className='myBagContent'>
                    <MyBag   onOutsideClick={this.handleMyBagOutsideClick}/>
                </div>}
            </div>
            {this.state.displayMyBag&&<div className='myBagOverLay'></div>}
        </div>
        );
    }
}

const mapStateToPtops=State=>({
    currencyState:State.currency.currencyState,
    cartItems:State.cart.items
})


export default withRouter(connect(mapStateToPtops)(compose(
    graphql(getCategories,{name:"getCategories"}),
    graphql(getCurrency,{name:"getCurrency"}))(Header)));

