import React from 'react';
import Product from '../components/Product';
import { graphql } from '@apollo/client/react/hoc';
import {getProducts} from '../queries/queries'
import '../styles/category.css'


class Category extends React.Component {
    displayProducts=()=>{
        const data=this.props.data;//there is an issue you can use data use the main this.props
        // console.log("Display Productsssss",data)
        if(data.loading){
            return(<h1>Loading Data ....</h1>)
        }else{
            if(data.category!==null){
                return data.category.products.map(product=>{
                 return (<div className='productContainer' key={product.id}>
                 <Product product={product}/>
                 </div>);
            })
            }
        }
    }

    componentDidUpdate=()=>{
        const {refetch}=this.props.data
        refetch({
            categoriesInput: { title: this.props.match.params.category },
          })
    }


    render() { 
        console.log("Category page",this.props)
        const {category}=this.props.match.params;
        return (
        <div className='categoryContainer'>
            <div className='categoryHeaderContainer'>
                <h1 className='categoryHeader'>{category.toUpperCase()}</h1>
            </div>
            <div className='productsContainer'>
                {this.displayProducts()}
            </div>
        </div>
        );
    }
}
 
export default graphql(getProducts,
    {
    options:(props)=>({
        variables:{
            "title":props.match.params.category
        },
        
})}
)(Category);