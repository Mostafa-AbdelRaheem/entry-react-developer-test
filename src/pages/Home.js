import React from 'react';
import Header from '../components/Header';
import All from './all';
import {gql} from "@apollo/client";
import { graphql } from '@apollo/client/react/hoc';
import {getProducts} from '../queries/queries'

class Home extends React.Component {
    
    displayProduct=()=>{
        let data=this.props.data;
        if(data.loading){
            return(<h1>Loading Data ....</h1>)
        }else{
            return data.category.products.map(product=>{
             return (<li key={product.id}>{product.name}</li>);
        })
        }
    }
    render() { 
         return (
        <div>
            <Header/>
            <h1>All</h1>
            {this.displayProduct()}
        </div>
        );
    }
}

export default graphql(getProducts,
      {
    options:(props)=>({
        variables:{
            "title":"all"
        },
      
})}
)(Home);