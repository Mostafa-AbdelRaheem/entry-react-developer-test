import React from 'react';
import Header from './../components/Header';
import {getProduct} from '../queries/queries'
import { graphql } from '@apollo/client/react/hoc';
import '../styles/productDescription.css'


class ProductDescription extends React.Component {
    state={
        attribute:'',
        galleryPicUrl:''
    }
    hadnleGalleryDisplay=(picUrl)=>{this.setState({galleryPicUrl:picUrl})}
    handleAttribute=(itemId)=>{this.setState({attribute:itemId})}

    diplayProduct=()=>{
        const {data} =this.props
        if(data.loading){
            return(<h1>Product is loading</h1>)
        }else{
        const {attributes,brand,description,gallery,name,prices}=this.props.data.product
        return(
            <div className='productDecriptionContainer'>
                {/* leftSide */}
                <div className='galleryContainer'>
                    {gallery.map((pic,index)=>(<div onClick={()=>this.hadnleGalleryDisplay(pic)} key={index} className='imageContainer'>
                        <img src={`${pic}`}/>
                    </div>))}
                </div>
                {/* Middle */}
                <div className='mainImageContainer'><img src={`${this.state.galleryPicUrl===''?gallery[0]:this.state.galleryPicUrl}`} alt='pic'></img></div>
                {/* rightSide */}
                <div className='info'>
                    <div className='brandName'>
                        <h3>{brand}</h3>
                        <p>{name}</p>
                    </div>
                    <div className='sizeContainer'>
                        <p className='sizeHeader'>SIZE:</p>
                        <ul className='sizeList'>
                            {attributes[0].items.map((item)=>(<li className={`${this.state.attribute===item.id?'sizeListItem selected':'sizeListItem'}`} onClick={()=>this.handleAttribute(item.id)} key={item.id}>{item.value}</li>))}
                        </ul>
                    </div>
                    <div className='priceContainer'>
                        <h3>PRICE</h3>
                        <p className='price'><span className='symbol'>{prices[0].currency.symbol}</span>{prices[0].amount}</p>
                    </div>
                    <button className='addToCartBtn'>ADD TO CART</button>
                    <p className='description'>{description}</p>
                </div>
            </div>
        )

        }
    }
    render() { 
        console.log("Product Decription Page",this.props)
        console.log("Product Decription State Page",this.state)
        // const {attributes,brand,description,gallery,name}=this.props.data.product
        // console.log("Product Decription ",brand)
        return (
        <div className='ProductDescriptionContainer'>
            <Header/>
            {this.diplayProduct()}

        </div>
        );
    }
}
 
export default graphql(getProduct,{
    options:(props)=>({
     variables:{
         "id":props.match.params.id
     }   
    })
})(ProductDescription);



// products: Array(8)
// 0:
// brand: "Nike x Stussy"
// description: "<p>Great sneakers for everyday use!</p>"
// gallery: Array(5)
// 0: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
// 1: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087"
// 2: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087"
// 3: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087"
// 4: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087"
// length: 5
// [[Prototype]]: Array(0)
// id: "huarache-x-stussy-le"
// inStock: true
// name: "Nike Air Huarache 