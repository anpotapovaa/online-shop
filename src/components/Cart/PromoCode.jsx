import { useState } from "react";

import CartStyles from "./Cart.module.css";
import CommonsStyles from "../../styles/Commons.module.css";

import arrow from "../../assets/icons/button-arrow.svg";

export default function PromoCode({ applyPromo }) {
  const [code, setCode] = useState("");

  const handleApply = () => {
    applyPromo(code);
    setCode("");
  };

  return (
    <div className={CartStyles.promoCodeWrapper}>
      <div className={CartStyles.info}>
        <div className={CartStyles.promoTitle}>You have a promo code?</div>
        <div className={CartStyles.description}>
          To receive up-to-date promotional codes, subscribe to us on social networks.
        </div>
      </div>

      <div className={CartStyles.promoCode}>
        <input
          type="text"
          name="promo-code"
          className={CommonsStyles.input}
          placeholder="Enter promo code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className={CommonsStyles.buttonWrapper}>
          <button className={CommonsStyles.button} onClick={handleApply}>
            <img src={arrow} alt="Arrow Icon" />
          </button>
          <div className={CommonsStyles.verticalLine}></div>
        </div>
      </div>

      <div className={CommonsStyles.findUs}>
        <div className={CommonsStyles.findUsText}>Find us here:</div>
        <div className={CommonsStyles.findUsLinks}>
          <div className={CommonsStyles.findUsLink}><a href="#">FB</a></div>
          <div className={CommonsStyles.line}></div>
          <div className={CommonsStyles.findUsLink}><a href="#">TW</a></div>
          <div className={CommonsStyles.line}></div>
          <div className={CommonsStyles.findUsLink}><a href="#">INS</a></div>
          <div className={CommonsStyles.line}></div>
          <div className={CommonsStyles.findUsLink}><a href="#">PT</a></div>
        </div>
      </div>
    </div>
  );
}
