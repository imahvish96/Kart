import { useStore } from "../../zustand/store";
import "./style.css";
export default function CartCalculation({
  couponCode,
  isCouponApplied,
}: {
  couponCode?: string;
  isCouponApplied?: boolean;
}) {
  const { cartItems, subTotal, total, shippingCost, discount } = useStore(
    (state) => state
  );

  return (
    <>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3 style={{ marginTop: "0px" }}>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subTotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shippingCost}</span>
          </div>

          {isCouponApplied && (
            <div className="summary-row">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#28a745",
                }}
              >
                Discount
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  <small>({couponCode})</small>
                </span>
              </span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "#28a745" }}>-${discount}</span>
              </div>
            </div>
          )}
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      )}
    </>
  );
}
