import { useStore } from "../../zustand/store";

export default function CouponCard({
  couponCode = "",
  isCouponApplied,
  setIsCouponApplied,
  handleCouponChange,
  handleRemoveCouponCode,
}: {
  couponCode: string;
  isCouponApplied: boolean;
  setIsCouponApplied: (isApplied: boolean) => void;
  handleCouponChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveCouponCode: () => void;
}) {
  const { cartItems, applyCoupon } = useStore((state) => state);
  return (
    <>
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
                value={couponCode}
                onChange={handleCouponChange}
              />
              <button
                className="apply-coupon-btn"
                onClick={() => {
                  applyCoupon(couponCode);
                  setIsCouponApplied(true);
                }}
                disabled={!couponCode.trim()}
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
                  <span>{couponCode}</span>
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
                  onClick={() => handleRemoveCouponCode()}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
