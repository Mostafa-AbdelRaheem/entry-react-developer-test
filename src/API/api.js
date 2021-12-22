import { gql } from "@apollo/client";

const categories = gql`
query{
categories{
  name
  }
}

`;

const products = gql`
query{
categories{
  products{
    id
    name
    inStock
    gallery
    description
    category
    prices{
      amount
      currency{
        label
        symbol
      }
    }
    brand
  }
}
}
`;  


export {categories,products};


// {
//   "id": "huarache-x-stussy-le"
// },
// {
//   "id": "jacket-canada-goosee"
// },
// {
//   "id": "ps-5"
// },
// {
//   "id": "xbox-series-s"
// },
// {
//   "id": "apple-imac-2021"
// },
// {
//   "id": "apple-iphone-12-pro"
// },
// {
//   "id": "apple-airpods-pro"
// },
// {
//   "id": "apple-airtag"
// }
// ]
// }
// }
// }