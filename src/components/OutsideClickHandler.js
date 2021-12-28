import React, { createRef } from 'react';

class OutsideClickHandler extends React.Component {
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
        // Here, we'll write the same outside click
        // detection logic as we used before.
        if (this.wrapperRef.current &&!this.wrapperRef.current.contains(event.target)) {
            this.props.onOutsideClick();
          }else{

              console.log("hello from inside")
          }
      }




    render() { 
        console.log("Outside",this.props)
        return (
        <div ref={this.wrapperRef}>
            {this.props.children}
            <h1>Hello</h1>
        </div>
        );
    }
}
 
export default OutsideClickHandler;