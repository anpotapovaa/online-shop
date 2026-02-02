import CartStyles from "./Cart.module.css";
import CommonsStyles from "../../styles/Commons.module.css";

export default function OrderSummary({ orderPrice, discount, delivery, total }) {
  return (
    <div className={CartStyles.order}>
      <div className={CartStyles.orderTitle}>Your order</div>

      <div className={CartStyles.orderPriceWrapper}>
        <div className={CartStyles.priceRow}>
          <div>Order price</div>
          <div className={CartStyles.price}>${orderPrice.toFixed(2)}</div>
        </div>

        <div className={CartStyles.priceRow}>
          <div>Discount for promo code</div>
          <div>{discount > 0 ? `- $${discount.toFixed(2)}` : "No"}</div>
        </div>

        <div className={`${CartStyles.priceRow} ${CartStyles.delimiter}`}>
          <div>
            Delivery{" "}
            <span className={CartStyles.nameAddition}>(Aug 02 at 16:00)</span>
          </div>
          <div className={CartStyles.price}>${delivery}</div>
        </div>

        <div className={`${CartStyles.priceRow} ${CartStyles.priceRowTotal}`}>
          <div className={CartStyles.nameTotal}>Total</div>
          <div className={CartStyles.priceTotal}>${total.toFixed(2)}</div>
        </div>
      </div>

      <div className={CommonsStyles.buttonWrapper}>
        <button
          className={CommonsStyles.button}
          onClick={() =>
            console.log("✅ Заказ оформлен:", {
              orderPrice,
              discount,
              delivery,
              total,
            })
          }
        >
          Checkout
        </button>
        <div className={CommonsStyles.verticalLine}></div>
      </div>
    </div>
  );
}
