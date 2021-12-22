import React from 'react';
import Product from './Product';
import '../styles/product.css';
import '../styles/products.css';

class Products extends React.Component {
    render() { 
        console.log("from products",this.props.categoryProducts)
        return (
            <div className='categoryContainer'>
                <div className='productsHeaderContainer'>
                <h1>{this.props.category}</h1>
                </div>
                <div className='productsContainer'>
                    {this.props.categoryProducts.map((product)=>(<div className='productContainer' key={product.id}>
                                <Product product={product}/>
                                </div>))}
                </div>
        </div>
        );
    }
}
 
export default Products;