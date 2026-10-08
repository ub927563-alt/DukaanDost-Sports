export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="category-scroll">
      {categories.map((category) => (
        <button
          key={category}
          className={selected === category ? "category-chip active" : "category-chip"}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}