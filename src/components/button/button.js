import React from "react";

class Button extends React.Component {

  render() {
    const {
      onClick,
      className,
      dataType,
      children
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={'button ' + className}
        type='button'
        data-type={dataType}
      >
        {children}
      </button>
    )
  }
}

export default Button;