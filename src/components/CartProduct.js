import React from "react";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";
import Attributes from "../components/Attributes";
import "../styles/cartProduct.css";

class CartProduct extends React.Component {
  state = {
    imageSlider: 0,
  };

  handleImageSliderToRight = () => {
    const galleryLength = this.props.cartItemProps.gallery.length;
    this.setState({
      imageSlider: (this.state.imageSlider + 1) % galleryLength,
    });
  };

  handleImageSliderToLeft = () => {
    const galleryLength = this.props.cartItemProps.gallery.length;
    if (this.state.imageSlider <= 0) {
      this.setState({ imageSlider: galleryLength - 1 });
    } else {
      this.setState({ imageSlider: this.state.imageSlider - 1 });
    }
  };

  handleAddToCart = (productProps) => {
    const dispatch = this.props.dispatch;
    const {
      id,
      name,
      description,
      prices,
      attributes,
      gallery,
      brand,
      selectedAttribute,
      productId,
    } = productProps;
    dispatch(
      addToCart({
        quantity: 1,
        id,
        name,
        description,
        prices,
        attributes,
        gallery,
        brand,
        selectedAttribute,
        productId,
      })
    );
  };

  handleRemoveFromCart = (productProps) => {
    const dispatch = this.props.dispatch;
    const { id, selectedAttribute, productId } = productProps;
    dispatch(removeFromCart({ id, selectedAttribute, productId }));
  };

  render() {
    const { currencyState } = this.props;
    const {
      attributes,
      brand,
      gallery,
      name,
      prices,
      attributesSelected,
      quantity,
    } = this.props.cartItemProps;
    return (
      <div className="cartProductContainer">
        {/* leftSide */}
        <div className="infoContainer">
          <div className="brandName">
            <h3 className="brandNameHeader">{brand}</h3>
            <p className="brandNameText">{name}</p>
          </div>
          <div className="priceContainer">
            <p className="price">
              <span className="symbol">
                {prices[currencyState].currency.symbol}
              </span>
              {prices[currencyState].amount}
            </p>
          </div>
          {attributes.length !== 0
            ? attributes.map((attribute, index) => (
                <Attributes
                  key={index}
                  attributeSelection={attributesSelected}
                  attribute={attribute}
                />
              ))
            : ""}
        </div>
        {/* RightSide */}
        <div className="visualContainer">
          <div className="counterContainer">
            <button
              onClick={() => {
                this.handleAddToCart(this.props.cartItemProps);
              }}
              className="counterBtn"
            >
              +
            </button>
            <p className="quantity">{quantity}</p>
            <button
              onClick={() => {
                this.handleRemoveFromCart(this.props.cartItemProps);
              }}
              className="counterBtn"
            >
              -
            </button>
          </div>
          <div className="mainImageContainer">
            <img
              className="gallary"
              src={gallery[this.state.imageSlider]}
              alt="gallery"
            />
            <img
              onClick={this.handleImageSliderToRight}
              className="rightArrow"
              src="/images/right-arrow.png"
            />
            <img
              onClick={this.handleImageSliderToLeft}
              className="leftArrow"
              src="/images/left-arrow.png"
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToPtops(state) {
  return {
    currencyState: state.currency.currencyState,
  };
}

export default connect(mapStateToPtops)(CartProduct);
