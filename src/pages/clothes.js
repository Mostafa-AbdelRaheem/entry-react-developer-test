import React from 'react';
import StoreContext from '../context/storeContext';
import Products from '../components/Products';
import Header from '../components/Header';
import '../styles/product.css'

class Clothes extends React.Component {
    render() { 
        return (
            <div>    
            <StoreContext.Consumer>
                {StoreContext=><Products categoryProducts={StoreContext.clothProducts} category={StoreContext.sotreCategories[1].toUpperCase()}/>}
            </StoreContext.Consumer>
        </div>
        );
    }
}

Clothes.contextType=StoreContext 
export default Clothes;