import "./style.css";
import { useStore } from "../../zustand/store";
import { useEffect, useState } from "react";
import CartCalculation from "../../components/CartCalculation";

const Cart = () => {
  const {
    cartItems,
    subTotal,
    removeCartItem,
    increaseItemCount,
    decreaseItemCount,
    addSubTotal,
    addTotal,
    applyCoupon,
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
            {cartItems.length > 0 && (
              <div className="cart-summary" style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    shoppingmode
                  </span>
                  <h3 style={{ margin: "0px" }}>Copuon Code</h3>
                </div>
                {!isCouponApplied ? (
                  <div className="coupon-section">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="coupon-input"
                      value={coupon}
                      onChange={handleCouponChange}
                    />
                    <button
                      className="apply-coupon-btn"
                      onClick={() => {
                        applyCoupon(coupon);
                        setIsCouponApplied(true);
                      }}
                      disabled={!coupon.trim()}
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div
                    className="summary-row"
                    style={{
                      marginBottom: "0px",
                      border: "1px solid #28a745",
                      backgroundColor: "#d7f8dfff",
                      color: "#28a745",
                      padding: "14px",
                      borderRadius: "4px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "16px" }}
                      >
                        shoppingmode
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                          color: "#28a745",
                          fontWeight: "bolder",
                        }}
                      >
                        <span>{coupon}</span>
                      </span>
                    </span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        style={{
                          paddingLeft: "5px",
                          paddingRight: "0px",
                          backgroundColor: "transparent",
                          color: "#28a745",
                          border: "none",
                          borderRadius: "4px",
                          fontWeight: "bolder",
                        }}
                        onClick={() => {
                          removeCoupon();
                          setIsCouponApplied(false);
                          setCoupon("");
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <CartCalculation
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
