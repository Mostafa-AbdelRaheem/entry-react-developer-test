import React from 'react';
import StoreContext from '../context/storeContext';
// import Products from '../components/Products';
// import Header from '../components/Header';
import '../styles/product.css'
// import {categories,products} from '../API/api'

import { gql } from "@apollo/client";

const categories = gql`
query{
categories{
  name
  }
}

`;

class All extends React.Component {
    render() { 
        return (
        <div>
            <StoreContext.Consumer>
                {StoreContext=>console.log(StoreContext.query({query: categories}).then(result => console.log(result.data)))}
            </StoreContext.Consumer>
            {/* <StoreContext.Consumer>
            {StoreContext=><Products categoryProducts={StoreContext.allProducts} category={StoreContext.sotreCategories[0].toUpperCase()}/>}
            </StoreContext.Consumer> */}
        </div>
        );
    }
}
 
All.contextType= StoreContext
export default All;