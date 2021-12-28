import React from 'react';
import {getProduct} from '../queries/queries'
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import {addToCart} from '../store/slices/cartSlice'
import '../styles/productDescription.css';
import Attributes from '../components/Attributes';


class ProductDescription extends React.Component {
    state={
        attribute1:'',
        attribute2:'',
        galleryPicUrl:''
    }

    hadnleGalleryDisplay=(picUrl)=>{this.setState({galleryPicUrl:picUrl})}

    handleAttribute=(item)=>{
        // this.setState({attribute:itemId})
        console.log("handle attribute1",item);
        if(item.value.charAt(0)==="#"){
            this.setState({attribute2:item.id})
        }else{
            this.setState({attribute1:item.id})
        }
    }

    handleAddToCart=(productProps,attribute1,attribute2)=>{
        const {id,name,description,prices,attributes,gallery,brand}=productProps;
        const dispatch = this.props.dispatch;
        if((!attribute1)){
            if(attributes.length===0){
                dispatch(addToCart({quantity:1,id,productId:`${id}-${attribute1}-${attribute2}`,name,description,prices,attributes,attribute1,attribute2,gallery,brand}))                
            }else{
                alert("Please select an attribute")
            }
        }else{
            if(attributes.length===2){
                if(attribute1&&attribute2){
                    dispatch(addToCart({quantity:1,id,productId:`${id}-${attribute1}-${attribute2}`,name,description,prices,attributes,attribute1,attribute2,gallery,brand}))
                }else{
                    alert("Please select the second attribute")
                }
            }else{
                dispatch(addToCart({quantity:1,id,productId:`${id}-${attribute1}-${attribute2}`,name,description,prices,attributes,attribute1,attribute2,gallery,brand}))

            }
            // console.log("Handle add to cart",productProps);
            // console.log("Handle add to cart name ",selectedAttribute);
        }
    }
    handleEmptyAttribute=()=>{
        this.setState({attribute1:"Not Attribute"})
    }

    // handleDescription=(str)=>{
    //     return (str.replace( /(<([^>]+)>)/ig, ''))
    // }

    diplayProduct=()=>{
        const {data} =this.props
        if(data.loading){
            return(<h1>Product is loading</h1>)
        }else{
        const {attributes,brand,description,gallery,name,prices,id}=this.props.data.product
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
                        <p className='sizeHeader'>{attributes.length!==0&&"SIZE:"}</p>
                        {attributes.length!==0?
                        attributes.map((attribute,index)=>(
                            <Attributes  
                            handleAttributeSelection={this.handleAttribute} 
                            key={index} 
                            attribute1={this.state.attribute1}
                            attribute2={this.state.attribute2}
                            attribute={attribute.items}/>))
                            :""}
                    </div>
                        
                        
                    <div className='priceContainer'>
                        <h3>PRICE</h3>
                        <p className='price'><span className='symbol'>{prices[0].currency.symbol}</span>{prices[0].amount}</p>
                    </div>
                    <button onClick={()=>{this.handleAddToCart(this.props.data.product,this.state.attribute1,this.state.attribute2)}} className='addToCartBtn'>ADD TO CART</button>
                    <p className='description'>
                        {/* {this.handleDescription(description)} */}
                        {description.replace( /(<([^>]+)>)/ig, '')}
                    </p>
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
        // {!this.props.data.loading&&console.log("HElloooooo")}
        return (
        <div className='ProductDescriptionContainer'>

            {this.diplayProduct()}

        </div>
        );
    }
}
 
export default connect()(graphql(getProduct,{
    options:(props)=>({
     variables:{
         "id":props.match.params.id
     }   
    })
})(ProductDescription));


