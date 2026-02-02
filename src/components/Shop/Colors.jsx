export default function Colors({
  colors = [],
  selectedColors = [],
  setSelectedColors,
  wrapperClass = "colors",
  checkboxClass = "color-checkboxs",
  colorItemClass = "color",
  colorNameClass = "color-name",
}) {
  const toggle = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className={wrapperClass}>
      {colors.map((color) => (
        <label className={colorItemClass} key={color}>
          <input
            type="checkbox"
            className={checkboxClass}
            checked={selectedColors.includes(color)}
            onChange={() => toggle(color)}
          />
          <span className={colorNameClass}>{color}</span>
        </label>
      ))}
    </div>
  );
}
