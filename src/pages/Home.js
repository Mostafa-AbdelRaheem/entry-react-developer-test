import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import {getProducts} from '../queries/queries'
import Product from '../components/Product';

class Home extends React.Component {
    
    // displayProduct=()=>{
    //     let data=this.props.data;
    //     if(data.loading){
    //         return(<h1>Loading Data ....</h1>)
    //     }else{
    //     //     return data.category.products.map(product=>{
    //     //      return (<li key={product.id}>{product.name}</li>);
    //     // })
    //     return data.category.products.map(product=>{
    //         return (<div className='productContainer' key={product.id}>
    //         <Product product={product}/>
    //         </div>);
    //    })
    //     }
    // }
    render() { 
        // console.log("Home props",this.props)
        // props.match.params.lenght===0?
        // const category=this.props.data.category.name
         return (
        <div>
            {/* <h1>{category.toUpperCase()}</h1> */}
            {/* {this.displayProduct()} */}
        </div>
        );
    }
}

export default Home;






// export default graphql(getProducts,
//       {
//     options:(props)=>({
//         variables:{
//             "title":"all"
//         },
      
// })}
// )(Home);