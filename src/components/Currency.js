import React,{ createRef } from 'react';

class Currency extends React.Component {
    wrapperRef = createRef();

    componentDidMount() {
        document
          .addEventListener('mousedown', this.handleClickOutside);
      }
    
      componentWillUnmount(){
        document
          .removeEventListener('mousedown', this.handleClickOutside);
      }

      handleClickOutside = (event) => {
        if (this.wrapperRef.current &&!this.wrapperRef.current.contains(event.target)) {
            this.props.onOutsideClick();
          }
      }

    handleToCartPage=()=>{
        this.props.onOutsideClick();
    }
    render() { 
        return (
            <ul ref={this.wrapperRef} className='currencyList'>
                {this.props.currencies.map((currency,index)=>(
                <li onClick={()=>this.props.onChangeCurrency(index)}  key={index}><span>{currency.symbol}{" "}</span>{currency.label}</li>
                ))}
            </ul>
        );
    }
}
 
export default Currency;