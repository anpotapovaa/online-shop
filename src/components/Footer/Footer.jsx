import styles from "./Footer.module.css";
import commons from "../../styles/Commons.module.css";

// импорт иконок
import dots from "../../assets/icons/dots.svg";
import logoIcon from "../../assets/icons/logo.svg";
import visa from "../../assets/icons/visa.svg";
import masterCard from "../../assets/icons/master-card.svg";
import paypal from "../../assets/icons/paypal.svg";
import payoneer from "../../assets/icons/payoneer.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={commons.container}>
        <div className={styles["footer-info"]}>
          <div className={styles["icon-dots"]}>
            <img src={dots} alt="icon-dots" />
          </div>

          <div className={`${styles.column} ${styles["column-1"]}`}>
            <div className={styles.logo}>
              <img src={logoIcon} alt="logo" />
            </div>
            <div className={styles["about-brand"]}>
              Cillum eu id enim aliquip aute ullamco anim. Culpa deserunt
              nostrud excepteur voluptate.
            </div>

            <div className={commons.findUs}>
              <div className={commons.findUsText}>Find us here:</div>
              <div className={commons.findUsLinks}>
                <div className={commons.findUsLink}>
                  <a href="#">FB</a>
                </div>
                <div className={commons.line}></div>
                <div className={commons.findUsLink}>
                  <a href="#">TW</a>
                </div>
                <div className={commons.line}></div>
                <div className={commons.findUsLink}>
                  <a href="#">INS</a>
                </div>
                <div className={commons.line}></div>
                <div className={commons.findUsLink}>
                  <a href="#">PT</a>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.column} ${styles["column-2"]}`}>
            <div className={styles.title}>About</div>
            <ul className={styles["custom-list"]}>
              <li className={styles.item}><a href="">About us</a></li>
              <li className={styles.item}><a href="">Collections</a></li>
              <li className={styles.item}><a href="">Shop</a></li>
              <li className={styles.item}><a href="">Blog</a></li>
              <li className={styles.item}><a href="">Contact us</a></li>
            </ul>
          </div>

          <div className={`${styles.column} ${styles["column-3"]}`}>
            <div className={styles.title}>Useful links</div>
            <ul className={styles["custom-list"]}>
              <li className={styles.item}><a href="">Privacy Policy</a></li>
              <li className={styles.item}><a href="">Terms of use</a></li>
              <li className={styles.item}><a href="">Support</a></li>
              <li className={styles.item}><a href="">Shipping details</a></li>
              <li className={styles.item}><a href="">FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <div>© All right reserved. Fashionee 2020</div>
          <div className={styles["payment-methods-container"]}>
            <div>Payment methods:</div>
            <div className={styles["payment-methods"]}>
              <div className={styles["payment-method"]}>
                <img src={visa} alt="Visa" />
              </div>
              <div className={styles["payment-method"]}>
                <img src={masterCard} alt="Master Card" />
              </div>
              <div className={styles["payment-method"]}>
                <img src={paypal} alt="Paypal" />
              </div>
              <div className={styles["payment-method"]}>
                <img src={payoneer} alt="payoneer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
