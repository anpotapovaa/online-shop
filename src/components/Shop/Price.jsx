export default function Price({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  classNameBar = "price-bar",
  classNameInput = "input",
  placeholderMin,
  placeholderMax,
}) {
  return (
    <div className={classNameBar}>
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder={placeholderMin ?? "0"}
        className={classNameInput}
        min="0"
      />
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder={placeholderMax ?? "200"}
        className={classNameInput}
        min="0"
      />
    </div>
  );
}
