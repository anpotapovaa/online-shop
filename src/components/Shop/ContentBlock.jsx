import dots from "../../assets/icons/dots.svg";
import styles from "../../styles/Main.module.css";

export default function ContentBlock({ currentPage, onNavigate }) {
  const pageTitle = currentPage === "cart" ? "Cart" : "Shop";

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <div className={styles.wrapperTitle}>
          <div className={styles.mainBlock}>
            <div className={styles.imageDots}>
              <img src={dots} alt="dots" />
            </div>
            <div className={styles.logo}>
              <div className={styles.wrapperHeader}>
                <div className={styles.headerMain}>{pageTitle}</div>
                <div className={styles.menu}>
                  <div
                    className={`${styles.menuItem} ${
                      currentPage === "shop" ? styles.active : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onNavigate("shop")}
                      className={styles.asLink}
                    >
                      Shop
                    </button>
                  </div>
                  <div
                    className={`${styles.menuItem} ${
                      currentPage === "cart" ? styles.active : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onNavigate("cart")}
                      className={styles.asLink}
                    >
                      Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.mainBanner}></div>
        </div>
      </div>
    </div>
  );
}
