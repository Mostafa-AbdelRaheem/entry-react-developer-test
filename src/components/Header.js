import React from 'react';
import {NavLink,Redirect} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign,faShoppingCart,faChevronDown,faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css';
import StoreContext from '../context/storeContext';

class Header extends React.Component {
    state={
        allLink:true,
        clothesLink:false,
        techLink:false,
        displayCurrency:false,
        displayMyBag:false,
    }
    
    handleAllSelection=()=>{
        this.setState({
            allLink:true,
            clothesLink:false,
            techLink:false
        })
    }
    handleClothesSelection=()=>{
        this.setState({
            allLink:false,
            clothesLink:true,
            techLink:false
        })
    }
    handleTechSelection=()=>{
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
        console.log("hello from the bag")
        {this.state.displayMyBag?this.setState({displayMyBag:false}):this.setState({displayMyBag:true})}
    }

    render() { 
        return (
        <div className='navbarContainer'>
            <div className='LeftSideContainer'>
                    <StoreContext.Consumer>
                    {StoreContext=>
                    <div>
                        {
                        <ul className='categoryList'>
                            <li onClick={this.handleAllSelection} className={`navbarLink ${this.state.allLink&&"navbarActiveLink"}`} ><NavLink className="link" to='/all'>{StoreContext.sotreCategories[0].toUpperCase()}</NavLink></li>
                            <li onClick={this.handleClothesSelection} className={`navbarLink ${this.state.clothesLink&&"navbarActiveLink"}`}><NavLink className="link" to='/clothes'>{StoreContext.sotreCategories[1].toUpperCase()}</NavLink></li>
                            <li onClick={this.handleTechSelection} className={`navbarLink ${this.state.techLink&&"navbarActiveLink"}`} ><NavLink className="link" to='/tech'>{StoreContext.sotreCategories[2].toUpperCase()}</NavLink></li>
                        </ul>
                        }
                        </div>
                    }
                    </StoreContext.Consumer>

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
                    <li><span>$</span>USD</li>
                    <li><span>£</span>GBP</li>
                    <li><span>A$</span>AUD</li>
                    <li><span>¥</span>JPY</li>
                    <li><span>₽</span>RUB</li>
                </ul>
                 }
                 {this.state.displayMyBag&&
                    <div className='myBagContent'>
                     </div>}
                {this.state.displayMyBag&&
                    <div className='myBagOverLay'>
                        
                    </div>}

        </div>
        );
    }
}

Header.contextType= StoreContext
export default Header;

