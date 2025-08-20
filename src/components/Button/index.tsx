import React from "react";
import "./Button.css";

function Button({ onClick }: { onClick: () => void }) {
  return (
    <button className="add-to-cart-btn" onClick={() => onClick()}>
      Add to Cart
    </button>
  );
}

export default Button;
