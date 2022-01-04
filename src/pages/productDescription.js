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
        }
    }
    handleEmptyAttribute=()=>{
        this.setState({attribute1:"Not Attribute"})
    }


    diplayProduct=()=>{
        const {data,currencyState} =this.props
        if(data.loading){
            return(<div className='loader'></div>)
        }else{
        const {attributes,brand,description,gallery,name,prices}=this.props.data.product
        return(
            <div className='productDecriptionContainer'>
                {/* leftSide */}
                <div className='galleryContainer'>
                    {gallery.map((pic,index)=>(<div onClick={()=>this.hadnleGalleryDisplay(pic)} key={index} className='imageContainer'>
                        <img src={`${pic}`} alt='gallery'/>
                    </div>))}
                </div>
                {/* Middle */}
                <div className='mainImageContainer'><img src={`${this.state.galleryPicUrl===''?gallery[0]:this.state.galleryPicUrl}`} alt='pic'></img></div>
                {/* rightSide */}
                <div className='info'>
                    <div className='brandName'>
                        <h3 className='brandNameHeader'>{brand}</h3>
                        <p className='brandNameText'>{name}</p>
                    </div>
                        {attributes.length!==0 ?<div className='sizeContainer'>
                        <p className='sizeHeader'>SIZE:</p>
                        {
                        attributes.map((attribute,index)=>(
                            <Attributes  
                            handleAttributeSelection={this.handleAttribute} 
                            key={index} 
                            attribute1={this.state.attribute1}
                            attribute2={this.state.attribute2}
                            attribute={attribute.items}/>))
                            }
                    </div>:""}        
                    <div className='priceContainer'>
                        <h3 className='priceHeader'>PRICE</h3>
                        <p className='price'><span className='symbol'>{prices[currencyState].currency.symbol}</span>{prices[currencyState].amount}</p>
                    </div>
                    <button onClick={()=>{this.handleAddToCart(this.props.data.product,this.state.attribute1,this.state.attribute2)}} className='addToCartBtn'>ADD TO CART</button>
                    <div className='description' dangerouslySetInnerHTML={{ __html: `${description}` }}/>
                </div>
            </div>
        )

        }
    }

    render() {
        return (
        <div className='ProductDescriptionContainer'>
            {this.diplayProduct()}

        </div>
        );
    }
}


const mapStateToPtops=State=>({
    currencyState:State.currency.currencyState,
})
 
export default connect(mapStateToPtops)(graphql(getProduct,{
    options:(props)=>({
     variables:{
         "id":props.match.params.id
     }   
    })
})(ProductDescription));


