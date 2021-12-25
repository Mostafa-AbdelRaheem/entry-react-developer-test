import React from 'react';
import Header from '../components/Header';
import '../styles/product.css'
import {gql} from "@apollo/client";
import { graphql } from '@apollo/client/react/hoc';
import Products from '../components/Products';

// query Categories($categoriesInput:CategoryInput){
//   category(input: $categoriesInput){
//     name
//     products{
//       name
//     }
//   }
// }
const allCategory=gql`
query {
  category{
    name
    products{
      id
      name
    }
  }
}
`


class All extends React.Component {
    render() { 
        return (
        <div>
            <Header/>
            <h1>Hello from all category</h1>
        </div>
        );
    }
}
 
export default graphql(allCategory)(All);