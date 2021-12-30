import React from 'react';

class Attributes extends React.Component {
    render() {
        const attribute=this.props.attribute
        return (
                <ul className='sizeList'>
                    {attribute.map((item)=>(
                        <li  
                            style={{backgroundColor:`${item.value}`,display:`${(item.value==="Yes"||item.value==="No")&&"none"}`}} 
                            onClick={()=>this.props.handleAttributeSelection(item)}
                            className={`${((this.props.attribute1===item.id)||(this.props.attribute2===item.id))?'sizeListItem selected':'sizeListItem'}`}
                            key={item.id}>
                                {item.value.charAt(0)==="#"?"":item.value}
                        </li>
                    ))}
                </ul>
        );
    }
}
 
export default Attributes;