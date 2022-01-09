import { gql } from "@apollo/client";

const getCategories=gql`
query {
    categories{
      name
    }
  }

`


const getProducts=gql`
query Products($categoriesInput:CategoryInput){
  category(input: $categoriesInput){
      name
    products{
      id
      name
      inStock
      gallery
      description
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`
const getProduct=gql`
query Product($id:String!){
  product(id:$id){
    id
    name
    inStock
    gallery
    description
    category
    attributes{
      id
      name
      items{
        displayValue
        value
        id
      }
    }
    prices{
      currency{
        label
        symbol
      }
      amount
      
    }
    brand
  }
  
}
`

const getCurrency=gql`
query {
  currencies{
    label
    symbol
  }  
  }

`


export {getCategories,getProducts,getProduct,getCurrency};