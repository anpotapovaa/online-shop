import CartStyles from "./Cart.module.css";
import CommonsStyles from "../../styles/Commons.module.css";
import "../../index.css";

import { useState } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import PromoCode from "./PromoCode";

export default function Cart({
  products,
  cart,
  removeFromCart,
  incrementQty,
  decrementQty,
}) {
  const [promoApplied, setPromoApplied] = useState(false);

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, qty: item.qty } : null;
    })
    .filter(Boolean);

  const orderPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discount = promoApplied ? orderPrice * 0.1 : 0;
  const delivery = 15;
  const total = orderPrice - discount + delivery;

  const applyPromo = (code) => {
    if (code.toLowerCase() === "ilovereact") {
      setPromoApplied(true);
      alert("🎉 Промокод применён! Скидка 10%");
    } else {
      setPromoApplied(false);
      alert("❌ Неверный промокод");
    }
  };

  return (
    <div className={CommonsStyles.container}>
      <div className={CartStyles.cart}>
        <div className={CartStyles.orderWrapper}>
          <div className={CartStyles.productList}>
            {cartItems.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              cartItems.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  incrementQty={incrementQty}
                  decrementQty={decrementQty}
                  removeFromCart={removeFromCart}
                />
              ))
            )}
          </div>

          <OrderSummary
            orderPrice={orderPrice}
            discount={discount}
            delivery={delivery}
            total={total}
          />
        </div>

        <PromoCode applyPromo={applyPromo} />
      </div>
    </div>
  );
}
