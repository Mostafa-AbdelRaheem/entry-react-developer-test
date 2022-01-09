import React from 'react';
import {getProduct} from '../queries/queries'
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import {addToCart} from '../store/slices/cartSlice'
import '../styles/productDescription.css';
import Attributes from '../components/Attributes';


class ProductDescription extends React.Component {
    state={
        attribute:{},
        galleryPicUrl:''
    }

    hadnleGalleryDisplay=(picUrl)=>{this.setState({galleryPicUrl:picUrl})}

    handleAttribute=(selectedValue,id,index)=>{
        let element= this.state.attribute
        element={...element,[id]:selectedValue.id}

        console.log("attribute element",element)
        this.setState({attribute:element})
    }

    handleAddToCart=(productProps,attributesSelected)=>{
        const {id,name,description,prices,attributes,gallery,brand}=productProps;
        const dispatch = this.props.dispatch;
        if((!Object.keys(attributesSelected).length)){
            if(attributes.length===0){
                dispatch(addToCart({quantity:1,id,productId:`${id}-${Object.values(attributesSelected).toString()}`,name, description, prices,attributes,attributesSelected,gallery,brand}))                
            }else{
                alert("Please select an attribute")
            }
        }else{
            dispatch(addToCart({quantity:1,id,productId:`${id}-${Object.values(attributesSelected).toString()}`,name, description, prices,attributes,attributesSelected,gallery,brand}))                

            // if(attributes.length===2){
            //     if(attribute1&&attribute2){
            //         dispatch(addToCart({quantity:1,id,productId:`${id}-${attribute1}-${attribute2}`,name,description,prices,attributes,attribute1,attribute2,gallery,brand}))
            //     }else{
            //         alert("Please select the second attribute")
            //     }
            // }else{
            //     dispatch(addToCart({quantity:1,id,productId:`${id}-${attribute1}-${attribute2}`,name,description,prices,attributes,attribute1,attribute2,gallery,brand}))

            // }
        }
    }
    handleEmptyAttribute=()=>{
        this.setState({attribute:"Not Attribute"})
    }


    diplayProduct=()=>{
        const {data,currencyState} =this.props
        if(data.loading){
            return(<div className='loader'></div>)
        }else{
        const {attributes,brand,description,gallery,name,prices,inStock}=this.props.data.product

        console.log("Pdescription props",this.props)
        console.log("Pdescription state",this.state)
        return(
            <div className='productDecriptionContainer'>
                {/* leftSide */}
                <div className='galleryContainer'>
                    {gallery.map((pic,index)=>(<div onClick={()=>this.hadnleGalleryDisplay(pic)} key={index} className='imageContainer'>
                        <img src={`${pic}`} alt='gallery'/>
                    </div>))}
                </div>
                {/* Middle */}
                <div className='mainImageContainer'>
                    <img src={`${this.state.galleryPicUrl===''?gallery[0]:this.state.galleryPicUrl}`} alt='pic'></img>
                    
                {!inStock&&<div className='overlay'>
                <p className='outOfStockText'>OUT OF STOCK</p>
                </div>}
                    </div>
                {/* rightSide */}
                <div className='info'>
                    <div className='brandName'>
                        <h3 className='brandNameHeader'>{brand}</h3>
                        <p className='brandNameText'>{name}</p>
                    </div>
                        {attributes.length!==0 ?
                        attributes.map((attribute,index)=>(
                            <Attributes  
                            handleAttributeSelection={this.handleAttribute} 
                            key={index} 
                            index={index}
                            attributeSelection={this.state.attribute}
                            // attribute2={this.state.attribute2}
                            attribute={attribute}/>))
                    :""}        
                    <div className='priceContainer'>
                        <h3 className='priceHeader'>PRICE</h3>
                        <p className='price'><span className='symbol'>{prices[currencyState].currency.symbol}</span>{prices[currencyState].amount}</p>
                    </div>
                    <button disabled={!inStock} className={`${!inStock?'addToCartBtn disabled':'addToCartBtn'}`}  onClick={()=>{this.handleAddToCart(this.props.data.product,this.state.attribute)}} >ADD TO CART</button>
                    <div className='description' dangerouslySetInnerHTML={{ __html: `${description}` }}/>
                </div>
            </div>
        )

        }
    }

    render() {
        console.log("PDP props",this.props)
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


