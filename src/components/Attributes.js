import React from "react";

class Attributes extends React.Component {
  render() {
    const { attribute, index, attributeSelection } = this.props;
    console.log("Attributies props", this.props);
    return (
      <div className="sizeContainer">
        {attribute && (
          <>
            <p className="sizeHeader">{attribute.name.toUpperCase()}</p>
            <ul className="sizeList">
              {attribute.items.map((item) => (
                <li
                  style={{ backgroundColor: `${item.value}` }}
                  onClick={() =>
                    this.props.handleAttributeSelection(
                      item,
                      attribute.id,
                      index
                    )
                  }
                  className={`${
                    attributeSelection[`${attribute.id}`] === item.id
                      ? "sizeListItem selected"
                      : "sizeListItem"
                  }`}
                  key={item.id}
                >
                  {item.value.charAt(0) === "#" ? "" : item.value}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

export default Attributes;
