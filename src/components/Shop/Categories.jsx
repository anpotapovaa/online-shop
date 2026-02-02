export default function Categories({
  categories = ["All"],
  selectedCategory = "All",
  setSelectedCategory,
  listClass = "custom-list",
  itemClass = "item",
  activeClass = "active",
}) {
  return (
    <ul className={listClass}>
      {categories.map((cat) => (
        <li
          key={cat}
          className={`${itemClass} ${selectedCategory === cat ? activeClass : ""}`.trim()}
          onClick={() => setSelectedCategory(cat)}
          role="button"
        >
          {cat}
        </li>
      ))}
    </ul>
  );
}
