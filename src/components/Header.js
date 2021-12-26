import React from 'react';
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign,faShoppingCart,faChevronDown,faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css';
import {gql} from "@apollo/client";
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import {selectCurrency} from '../store/slices/currencySlice'
import {getCategories,getCurrency} from '../queries/queries'
import compose from 'recompose/compose';
import Cart from './../pages/cart';
import CartProduct from './CartProduct';
import MyBag from './MyBag';





class Header extends React.Component {
    state={
        allLink:true,
        clothesLink:false,
        techLink:false,
        displayCurrency:false,
        displayMyBag:false,
    }
    
    handleAllSelection=(categoryName)=>{
        this.props.history.push(`/category/${categoryName}`)
        this.setState({
            allLink:true,
            clothesLink:false,
            techLink:false
        })
    }
    handleClothesSelection=(categoryName)=>{
        this.props.history.push(`/category/${categoryName}`);
        this.setState({
            allLink:false,
            clothesLink:true,
            techLink:false
        })
    }
    handleTechSelection=(categoryName)=>{
        this.props.history.push(`/category/${categoryName}`);
        this.setState({
            allLink:false,
            clothesLink:false,
            techLink:true,
        })
    }

    changeCurrency=()=>{
        {this.state.displayCurrency?this.setState({displayCurrency:false}):this.setState({displayCurrency:true})}
    }
    handledisplayMyBag=()=>{
        {this.state.displayMyBag?this.setState({displayMyBag:false}):this.setState({displayMyBag:true})}
    }
    handleSelectCurrency=(currencyValue)=>{
        const {dispatch} =this.props
        console.log("Currency Value",currencyValue)
        this.setState({displayMyBag:false})
        dispatch(selectCurrency({currencyState:currencyValue}))

    }
    
    render() { 
        console.log("header Props",this.props)
        return (
            <div>

        <div className='navbarContainer'>
            <div className='LeftSideContainer'>
                    <div>
                        {
                        <ul className='categoryList'>
                            <li onClick={()=>this.handleAllSelection(this.props.getCategories.categories[0].name)} className={`navbarLink ${this.state.allLink&&"navbarActiveLink"}`} >All</li>
                            <li onClick={()=>this.handleClothesSelection(this.props.getCategories.categories[1].name)} className={`navbarLink ${this.state.clothesLink&&"navbarActiveLink"}`}>Clothes</li>
                            <li onClick={()=>this.handleTechSelection(this.props.getCategories.categories[2].name)} className={`navbarLink ${this.state.techLink&&"navbarActiveLink"}`} >Tech</li>
                        </ul>
                        }
                        </div>

            </div>
            <div className='middleContainer'>
                <FontAwesomeIcon className='faShoppingBag' icon={faShoppingBag} size='2x'/>
            </div>
            <div className='rightSideContainer'>
                <div onClick={this.changeCurrency} className='usdImageContainer'>
                    <FontAwesomeIcon className='faDollarSign' icon={faDollarSign} size="lg"/>
                    <FontAwesomeIcon className={`faChevronDown ${this.state.displayCurrency&&"chevronDownActive"}`} icon ={faChevronDown} size='xs'  />
                </div>
                <div onClick={this.handledisplayMyBag} className='shoppingCartImageContainer'>
                    <FontAwesomeIcon className='faShoppingCart' icon={faShoppingCart} size="lg"/>
                </div>
            </div>
            {this.state.displayCurrency&& 
                <ul className='currencyList'>
                    {this.props.getCurrency.currencies.map((currency,index)=>(
                    <li onClick={()=>this.handleSelectCurrency(index)} key={index}><span>{currency.symbol}</span>{currency.label}</li>
                    ))}
                </ul>
                 }
            {this.state.displayMyBag&&
            <div className='myBagContent'>
                <MyBag/>
                </div>}



            </div>
                {this.state.displayMyBag&&
                <div className='myBagOverLay'>
                    
                </div>}
        </div>
        );
    }
}

const mapStateToPtops=State=>({
    currencyState:State.currency.currencyState
})


export default withRouter(connect(mapStateToPtops)(compose(
    graphql(getCategories,{name:"getCategories"}),
    graphql(getCurrency,{name:"getCurrency"}))(Header)));

