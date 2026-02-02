import CartStyles from "./Cart.module.css";
import CommonsStyles from "../../styles/Commons.module.css";

export default function CartItem({ product, incrementQty, decrementQty, removeFromCart }) {
  return (
    <div className={CartStyles.product} key={product.id}>
      <div className={CartStyles.photo}>
        <img src={product.image} alt={product.name} />
      </div>

      <div className={CartStyles.productInfo}>
        <div className={CartStyles.title}>{product.name}</div>

        <div className={CartStyles.priceWrapper}>
          <div className={CartStyles.priceAndQuantity}>
            <div className={CommonsStyles.currentPrice}>
              {product.oldPrice && (
                <div className={CommonsStyles.oldPrice}>${product.oldPrice}</div>
              )}
              <div>${product.price}</div>
            </div>

            <div className={CartStyles.quantity}>
              <div
                className={CartStyles.countButton}
                onClick={() => decrementQty(product.id)}
              >
                -
              </div>
              <div className={CartStyles.count}>{product.qty}</div>
              <div
                className={CartStyles.countButton}
                onClick={() => incrementQty(product.id)}
              >
                +
              </div>
            </div>

            <div className={CartStyles.totalPrice}>
              ${(product.price * product.qty).toFixed(2)}
            </div>
          </div>
        </div>

        <div
          className={CartStyles.close}
          onClick={() => removeFromCart(product.id)}
        >
          X
        </div>
      </div>
    </div>
  );
}
