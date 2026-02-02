import React from "react";
import styles from "./Shop.module.css";
import CommonsStyles from "../../styles/Commons.module.css";

export default function Sort({ sortType, setSortType }) {
  return (
    <div className={styles.sort}>
      <select
        className={CommonsStyles.input}
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="RELEVANCE">Relevance</option>
        <option value="ASC">Price: Low to High</option>
        <option value="DESC">Price: High to Low</option>
        <option value="NAME">Name (A-Z)</option>
      </select>
    </div>
  );
}
