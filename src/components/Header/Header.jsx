import styles from "./Header.module.css";

import logoIcon from "../../assets/icons/logo.svg";
import arrowIcon from "../../assets/icons/arrow.svg";
import arrowPinkIcon from "../../assets/icons/arrow-pink.svg";
import searchIcon from "../../assets/icons/search.svg";
import profileIcon from "../../assets/icons/profile.svg";
import heartIcon from "../../assets/icons/heart.svg";
import cartIcon from "../../assets/icons/cart.svg";

export default function Header({ favoritesCount, cartCount, onNavigate }) {
  return (
    <header className={styles.header}>
      <div className={styles["left-side"]}>
        <div className={styles["logo-container"]}>
          <div className={styles["burger-menu"]}>
            <input
              type="checkbox"
              id="burger-checkbox"
              className={styles["burger-checkbox"]}
            />
            <label className={styles.burger} htmlFor="burger-checkbox"></label>
          </div>
          <div className={styles.logo}>
            <img src={logoIcon} alt="logo" />
          </div>
        </div>

        <div className={styles.menu}>
          <div
            className={styles["menu-item"]}
            onClick={() => onNavigate("shop")}
          >
            <span>Home</span>
          </div>

          <div className={styles["menu-item"]}>
            <span>Pages</span>
            <img src={arrowIcon} alt="arrow" className={styles["arrow-default"]} />
            <img src={arrowPinkIcon} alt="arrow" className={styles["arrow-hover"]} />
          </div>

          <div
            className={styles["menu-item"]}
            onClick={() => onNavigate("shop")}
          >
            <span>Shop</span>
            <img src={arrowIcon} alt="arrow" className={styles["arrow-default"]} />
            <img src={arrowPinkIcon} alt="arrow" className={styles["arrow-hover"]} />
          </div>

          <div className={styles["menu-item"]}>
            <span>Blog</span>
          </div>

          <div className={styles["menu-item"]}>
            <span>Contact</span>
          </div>
        </div>
      </div>

      <div className={styles["right-side"]}>
        <div className={styles["header-icon"]}>
          <img src={searchIcon} alt="search" />
        </div>

        <div className={styles["header-icon"]}>
          <img src={profileIcon} alt="profile" />
        </div>

        <div className={styles["header-icon"]}>
          <img src={heartIcon} alt="heart" />
          <div className={styles.counter}>{favoritesCount}</div>
        </div>

        <div
          className={styles["header-icon"]}
          onClick={() => onNavigate("cart")}
          role="button"
          aria-label="Open cart"
        >
          <img src={cartIcon} alt="cart" />
          <div className={styles.counter}>{cartCount}</div>
        </div>
      </div>
    </header>
  );
}
