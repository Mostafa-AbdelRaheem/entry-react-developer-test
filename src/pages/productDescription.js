import React from 'react';
import {getProduct} from '../queries/queries'
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import {addToCart} from '../store/slices/cartSlice'
import '../styles/productDescription.css';


class ProductDescription extends React.Component {
    state={
        attribute:'',
        galleryPicUrl:''
    }

    hadnleGalleryDisplay=(picUrl)=>{this.setState({galleryPicUrl:picUrl})}

    handleAttribute=(itemId)=>{this.setState({attribute:itemId})}

    handleAddToCart=(productProps,selectedAttribute)=>{
        if(!selectedAttribute){
            alert("Please select an attribute")
        }else{
            const dispatch = this.props.dispatch;
            const {id,name,description,prices,attributes,gallery,brand}=productProps;
            dispatch(addToCart({quantity:1,id,productId:`${id}-${selectedAttribute}`,name,description,prices,attributes,selectedAttribute,gallery,brand}))
            // console.log("Handle add to cart",productProps);
            // console.log("Handle add to cart name ",selectedAttribute);
        }
    }

    handleAttributeproblems=(attributes)=>{
        if(attributes.length!==0){
            for (let items of attributes){
                if(items.items[0].value.charAt(0)==="#"){
                    return(
                        <div className='sizeContainer'>
                            <p className='sizeHeader'>COLOR:</p>
                            <ul className='sizeList'>
                                {items.items.map((attribute)=>(<li  style={{backgroundColor:`${attribute.value}`}} className={`${'sizeListItem'}`} key={attribute.id}></li>))}
                                {/* {items.items.map((attribute)=>{<li className={`${'sizeListItem'}`} key={attribute.id}>{attribute.displayValue}</li>})} */}
                            </ul>
                        </div>
                    )
                }else{
                    return(                    
                    <div className='sizeContainer'>
                        <p className='sizeHeader'>SIZE:</p>
                        <ul className='sizeList'>                        
                            {items.items.map((attribute)=>(<li  style={{backgroundColor:`${attribute.value}`}} className={`${this.state.attribute===attribute.id?'sizeListItem selected':'sizeListItem'}`} key={attribute.id}>{attribute.displayValue}</li>))} 
                            {/* { attributes[0].items.map((item)=>(<li className={`${this.state.attribute===item.id?'sizeListItem selected':'sizeListItem'}`} onClick={()=>this.handleAttribute(item.id)} key={item.id}>{item.value}</li>))} */}
                        </ul>    
                    </div>
                    )
                }
            }
        }


            //     if(items.items[0].value.charAt(0)==="#"){
            //         console.log(items.items.map((attribute)=>{console.log("this is a color")}))
            //         // console.log("hello",items.items[0].value.charAt(0))
            //     }
            //     // sentence.charAt(index)
            //     console.log(items.items.map((attribute)=>{console.log( attribute.displayValue)}))
            // //    return <div>{item[0]}</div>
        // return console.log(item)
    }

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
                        {this.handleAttributeproblems(attributes)}
                        
                    <div className='priceContainer'>
                        <h3>PRICE</h3>
                        <p className='price'><span className='symbol'>{prices[0].currency.symbol}</span>{prices[0].amount}</p>
                    </div>
                    <button onClick={()=>{this.handleAddToCart(this.props.data.product,this.state.attribute)}} className='addToCartBtn'>ADD TO CART</button>
                    <p className='description'>{description}</p>
                </div>
            </div>
        )

        }
    }

    render() { 
        // console.log("Product Decription Page",this.props)
        // console.log("Product Decription State Page",this.state)
        // const {attributes,brand,description,gallery,name}=this.props.data.product
        // console.log("Product Decription ",brand)
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


