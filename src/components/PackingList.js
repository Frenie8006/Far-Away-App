import { useState } from "react";

export function PackingList({
  items,
  onClearList,
  onDeleteItems,
  onToggleItem,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems; // Derive state

  // Sorted by default
  if (sortBy === "input") sortedItems = items;

  // Sorted by alphabetically
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  // Sorted by packed lists
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item, index) => (
          <Item
            item={item}
            removeItem={onDeleteItems}
            onToggleItem={onToggleItem}
            key={item.id || index}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by input description</option>
          <option value="packed">Sort by input packed status</option>
        </select>

        <button onClick={onClearList}>CLear list</button>
      </div>
    </div>
  );
}

function Item({ item, removeItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => removeItem(item.id)}>❌</button>
    </li>
  );
}
