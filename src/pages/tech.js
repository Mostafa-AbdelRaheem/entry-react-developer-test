import React from 'react';
import Header from '../components/Header';
import Products from '../components/Products';

class Tech extends React.Component {
    render() { 
        return (
        <div>
            {/* <StoreContext.Consumer>
            {StoreContext=><Products categoryProducts={StoreContext.techProducts} category={StoreContext.sotreCategories[2].toUpperCase()}/>}
            </StoreContext.Consumer> */}
        </div>
        );
    }
}
 
export default Tech;