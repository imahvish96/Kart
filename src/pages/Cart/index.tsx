import "./style.css";
import { useStore } from "../../zustand/store";
import { useEffect, useState } from "react";
import SummaryCard from "../../components/SummaryCard";
import CouponCard from "../../components/CouponCard";

const Cart = () => {
  const {
    cartItems,
    subTotal,
    removeCartItem,
    increaseItemCount,
    decreaseItemCount,
    addSubTotal,
    addTotal,
    removeCoupon,
  } = useStore((state) => state);

  useEffect(() => {
    addTotal();
    addSubTotal();
  }, [cartItems, subTotal]);
  const [coupon, setCoupon] = useState<string>("");
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);

  function handleCouponChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCoupon(event.target.value);
  }

  function removeCouponCode() {
    removeCoupon();
    setIsCouponApplied(false);
    setCoupon("");
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <span>{cartItems.length} Items</span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div className="cart-item">
                  <img src={item.image} alt="Product" className="item-image" />
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-description">
                      {item.description.length > 50
                        ? item.description.slice(0, 50) + "..."
                        : item.description}
                    </p>
                    <div className="item-price">${item.price}</div>
                  </div>
                  <div className="item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => decreaseItemCount(item.id)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.itemCount}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => increaseItemCount(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeCartItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="empty-cart-message">Your cart is empty.</p>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <CouponCard
              couponCode={coupon ?? ""}
              isCouponApplied={isCouponApplied}
              setIsCouponApplied={setIsCouponApplied}
              handleCouponChange={handleCouponChange}
              handleRemoveCouponCode={removeCouponCode}
            />
            <SummaryCard
              couponCode={coupon}
              isCouponApplied={isCouponApplied}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
